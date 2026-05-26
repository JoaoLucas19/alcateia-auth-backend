"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllowedOriginList = getAllowedOriginList;
exports.isOriginAllowed = isOriginAllowed;
const env_1 = require("./env");
/** Origens fixas do painel e desenvolvimento local */
const DEFAULT_ORIGINS = [
    "https://whitexcorporation.com.br",
    "https://www.whitexcorporation.com.br",
    // Painel pode abrir em HTTP se o SSL/redirect do Hostinger estiver desativado
    "http://whitexcorporation.com.br",
    "http://www.whitexcorporation.com.br",
    "http://localhost:3000",
    "http://localhost:5173",
    "http://localhost:4173",
];
/** Horizons / Hostinger / preview do editor */
const ORIGIN_PATTERNS = [
    /^https?:\/\/(www\.)?whitexcorporation\.com\.br$/i,
    /^https:\/\/[\w-]+\.hostingersite\.com$/i,
    /^https:\/\/[\w-]+\.horizons\.hostinger\.(com|dev)$/i,
    /^https:\/\/[\w-]+\.app-preview\.(io|com)$/i,
    /^https:\/\/[\w-]+(\.[\w-]+)*\.hostinger\.(com|dev)$/i,
];
function parseEnvOrigins() {
    const raw = env_1.env.ALLOWED_ORIGINS?.trim();
    if (!raw || raw === "*")
        return [];
    return raw.split(",").map((o) => o.trim()).filter(Boolean);
}
function getAllowedOriginList() {
    return [...new Set([...DEFAULT_ORIGINS, ...parseEnvOrigins()])];
}
function isOriginAllowed(origin) {
    const list = getAllowedOriginList();
    if (list.includes(origin))
        return true;
    return ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}
//# sourceMappingURL=cors.js.map