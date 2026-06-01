"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeHwid = normalizeHwid;
exports.hwidsEqual = hwidsEqual;
exports.isHwidBound = isHwidBound;
exports.maskHwid = maskHwid;
exports.extractHwidFromBody = extractHwidFromBody;
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
function normalizeHwid(raw) {
    const v = (raw ?? "").trim();
    if (!v)
        return null;
    const lower = v.toLowerCase();
    if (PLACEHOLDER_HWIDS.has(lower))
        return null;
    if (/^0+(-0+)*$/.test(v.replace(/:/g, "")))
        return null;
    return v;
}
function hwidsEqual(a, b) {
    const na = normalizeHwid(a);
    const nb = normalizeHwid(b);
    if (!na || !nb)
        return false;
    return na.toLowerCase() === nb.toLowerCase();
}
/** HWID vinculado ao cliente (bloqueia login em outra máquina). */
function isHwidBound(stored) {
    return normalizeHwid(stored) !== null;
}
function maskHwid(hwid) {
    const v = hwid.trim();
    if (v.length <= 14)
        return v;
    return `${v.slice(0, 8)}...${v.slice(-4)}`;
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