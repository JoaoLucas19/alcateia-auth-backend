import { AppError } from "./AppError";

/** Valores enviados por loaders quebrados ou placeholders — tratados como “sem HWID”. */
const PLACEHOLDER_HWIDS = new Set([
  "",
  "-",
  "null",
  "undefined",
  "unknown",
  "n/a",
  "na",
  "none",
  "00000000",
  "000000000000",
]);

export type HwidKind = "machine" | "mac" | "invalid";

export interface ParsedHwid {
  kind: HwidKind;
  /** Valor gravado no banco (formato canônico). */
  canonical: string | null;
  /** Texto mascarado para o painel. */
  display: string | null;
}

function isPlaceholder(lower: string): boolean {
  return PLACEHOLDER_HWIDS.has(lower);
}

/** Normaliza corpo de MAC (com ou sem separadores) para MAC:AA:BB:CC:DD:EE:FF */
function canonicalMacFromBody(body: string): string | null {
  const hex = body.replace(/[^a-fA-F0-9]/g, "");
  if (hex.length !== 12 || !/^[a-fA-F0-9]{12}$/.test(hex)) return null;
  const pairs = hex.match(/.{2}/g);
  if (!pairs) return null;
  return `MAC:${pairs.join(":").toUpperCase()}`;
}

function maskMachineDisplay(body: string): string {
  if (body.length <= 12) return `machine:${body}`;
  return `machine:${body.slice(0, 4)}…${body.slice(-4)}`;
}

function maskMacDisplay(canonical: string): string {
  const body = canonical.slice(4);
  if (body.length <= 14) return canonical;
  return `MAC:${body.slice(0, 3)}…${body.slice(-4)}`;
}

export function maskHwid(hwid: string): string {
  const parsed = parseHwid(hwid);
  if (parsed.display) return parsed.display;
  const v = hwid.trim();
  if (v.length <= 14) return v;
  return `${v.slice(0, 8)}…${v.slice(-4)}`;
}

/**
 * Aceita apenas formatos de hardware reais usados pelo cheat:
 * - machine:<id>  (padrão NeverApi / loader atual do white)
 * - MAC:<endereço> (12 hex, com ou sem : ou -)
 *
 * Rejeita hash cru (32+ hex sem prefixo), UUIDs e lixo genérico.
 */
export function parseHwid(raw: string | null | undefined): ParsedHwid {
  const v = (raw ?? "").trim();
  if (!v) {
    return { kind: "invalid", canonical: null, display: null };
  }

  const lower = v.toLowerCase();
  if (isPlaceholder(lower)) {
    return { kind: "invalid", canonical: null, display: null };
  }

  if (/^0+(-0+)*$/.test(v.replace(/:/g, ""))) {
    return { kind: "invalid", canonical: null, display: null };
  }

  const machineMatch = /^machine:\s*(.+)$/i.exec(v);
  if (machineMatch) {
    const id = machineMatch[1].trim();
    if (id.length < 4 || id.length > 128) {
      return { kind: "invalid", canonical: null, display: null };
    }
    if (/^[a-fA-F0-9]{32,64}$/.test(id)) {
      return { kind: "invalid", canonical: null, display: null };
    }
    const canonical = `machine:${id}`;
    return { kind: "machine", canonical, display: maskMachineDisplay(id) };
  }

  const macPrefixed = /^mac:\s*(.+)$/i.exec(v);
  if (macPrefixed) {
    const mac = canonicalMacFromBody(macPrefixed[1]);
    if (mac) {
      return { kind: "mac", canonical: mac, display: maskMacDisplay(mac) };
    }
    return { kind: "invalid", canonical: null, display: null };
  }

  const bareMac = canonicalMacFromBody(v);
  if (bareMac) {
    return { kind: "mac", canonical: bareMac, display: maskMacDisplay(bareMac) };
  }

  if (/^[a-fA-F0-9]{32,64}$/.test(v)) {
    return { kind: "invalid", canonical: null, display: null };
  }

  if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)) {
    return { kind: "invalid", canonical: null, display: null };
  }

  return { kind: "invalid", canonical: null, display: null };
}

export function normalizeHwid(raw: string | null | undefined): string | null {
  return parseHwid(raw).canonical;
}

export function formatHwidDisplay(raw: string | null | undefined): string | null {
  return parseHwid(raw).display;
}

export function hwidsEqual(
  a: string | null | undefined,
  b: string | null | undefined
): boolean {
  const na = normalizeHwid(a);
  const nb = normalizeHwid(b);
  if (!na || !nb) return false;
  return na.toLowerCase() === nb.toLowerCase();
}

export function isHwidBound(stored: string | null | undefined): boolean {
  return normalizeHwid(stored) !== null;
}

/** Exige formato válido quando o loader envia HWID (cadastro ou vínculo). */
export function resolveHwidForBinding(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  const parsed = parseHwid(trimmed);
  if (!parsed.canonical) {
    throw new AppError(
      "HWID invalido. O loader deve enviar machine:<id> ou MAC:<endereco>.",
      403,
      "HWID_INVALID"
    );
  }
  return parsed.canonical;
}

/** NeverApi / loaders podem enviar nomes de campo diferentes. */
export function extractHwidFromBody(body: Record<string, unknown>): string {
  const keys = [
    "hwid",
    "HWID",
    "Hwid",
    "hardwareId",
    "hardware_id",
    "machineId",
    "machine_id",
    "deviceId",
    "device_id",
  ];
  for (const key of keys) {
    const val = body[key];
    if (typeof val === "string" && val.trim()) {
      return val.trim();
    }
  }
  return "";
}
