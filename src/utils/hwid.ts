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

export function normalizeHwid(raw: string | null | undefined): string | null {
  const v = (raw ?? "").trim();
  if (!v) return null;
  const lower = v.toLowerCase();
  if (PLACEHOLDER_HWIDS.has(lower)) return null;
  if (/^0+(-0+)*$/.test(v.replace(/:/g, ""))) return null;
  return v;
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

/** HWID vinculado ao cliente (bloqueia login em outra máquina). */
export function isHwidBound(stored: string | null | undefined): boolean {
  return normalizeHwid(stored) !== null;
}

export function maskHwid(hwid: string): string {
  const v = hwid.trim();
  if (v.length <= 14) return v;
  return `${v.slice(0, 8)}...${v.slice(-4)}`;
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
