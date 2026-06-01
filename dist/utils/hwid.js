"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskHwid = maskHwid;
exports.parseHwid = parseHwid;
exports.normalizeHwid = normalizeHwid;
exports.formatHwidDisplay = formatHwidDisplay;
exports.hwidsEqual = hwidsEqual;
exports.isHwidBound = isHwidBound;
exports.resolveHwidForBinding = resolveHwidForBinding;
exports.extractHwidFromBody = extractHwidFromBody;
const AppError_1 = require("./AppError");
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
function isPlaceholder(lower) {
    return PLACEHOLDER_HWIDS.has(lower);
}
/** Normaliza corpo de MAC (com ou sem separadores) para MAC:AA:BB:CC:DD:EE:FF */
function canonicalMacFromBody(body) {
    const hex = body.replace(/[^a-fA-F0-9]/g, "");
    if (hex.length !== 12 || !/^[a-fA-F0-9]{12}$/.test(hex))
        return null;
    const pairs = hex.match(/.{2}/g);
    if (!pairs)
        return null;
    return `MAC:${pairs.join(":").toUpperCase()}`;
}
function maskMachineDisplay(body) {
    if (body.length <= 12)
        return `machine:${body}`;
    return `machine:${body.slice(0, 4)}…${body.slice(-4)}`;
}
function maskMacDisplay(canonical) {
    const body = canonical.slice(4);
    if (body.length <= 14)
        return canonical;
    return `MAC:${body.slice(0, 3)}…${body.slice(-4)}`;
}
function maskHwid(hwid) {
    const parsed = parseHwid(hwid);
    if (parsed.display)
        return parsed.display;
    const v = hwid.trim();
    if (v.length <= 14)
        return v;
    return `${v.slice(0, 8)}…${v.slice(-4)}`;
}
/**
 * Normaliza HWID para formato canônico no banco e no painel:
 * - machine:<id>  (explícito ou hash hex legado do loader)
 * - MAC:<endereço>
 */
function parseHwid(raw) {
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
        if (id.length >= 4 && id.length <= 128) {
            const canonical = `machine:${id}`;
            return { kind: "machine", canonical, display: maskMachineDisplay(id) };
        }
        return { kind: "invalid", canonical: null, display: null };
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
    /** Loader Alcateia / NeverApi: fingerprint hex sem prefixo → machine:<hex> */
    if (/^[a-fA-F0-9]{16,64}$/.test(v)) {
        const id = v.toLowerCase();
        return { kind: "machine", canonical: `machine:${id}`, display: maskMachineDisplay(id) };
    }
    /** Identificador alfanumérico legado sem prefixo */
    if (/^[a-zA-Z0-9_.-]{4,128}$/.test(v)) {
        return { kind: "machine", canonical: `machine:${v}`, display: maskMachineDisplay(v) };
    }
    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)) {
        return { kind: "invalid", canonical: null, display: null };
    }
    return { kind: "invalid", canonical: null, display: null };
}
function normalizeHwid(raw) {
    return parseHwid(raw).canonical;
}
function formatHwidDisplay(raw) {
    return parseHwid(raw).display;
}
function hwidsEqual(a, b) {
    const na = normalizeHwid(a);
    const nb = normalizeHwid(b);
    if (!na || !nb)
        return false;
    return na.toLowerCase() === nb.toLowerCase();
}
function isHwidBound(stored) {
    return normalizeHwid(stored) !== null;
}
/**
 * Converte o HWID do loader para formato canônico.
 * Hash hex legado vira machine:<hex> — compatível com logins antigos.
 */
function resolveHwidForBinding(raw) {
    const trimmed = raw.trim();
    if (!trimmed)
        return null;
    const canonical = normalizeHwid(trimmed);
    if (!canonical) {
        throw new AppError_1.AppError("HWID invalido ou nao reconhecido.", 403, "HWID_INVALID");
    }
    return canonical;
}
/** NeverApi / loaders podem enviar nomes de campo diferentes. */
function extractHwidFromBody(body) {
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
//# sourceMappingURL=hwid.js.map