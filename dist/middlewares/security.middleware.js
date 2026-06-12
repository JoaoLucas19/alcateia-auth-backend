"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ipBlockMiddleware = ipBlockMiddleware;
exports.rejectSuspiciousInput = rejectSuspiciousInput;
exports.requireJsonContentType = requireJsonContentType;
exports.rejectSuspiciousUserAgent = rejectSuspiciousUserAgent;
exports.applyAuthFailureDelay = applyAuthFailureDelay;
const client_ip_1 = require("../utils/client-ip");
const input_safety_1 = require("../utils/input-safety");
const ip_block_service_1 = require("../modules/security/ip-block.service");
const logger_1 = require("../utils/logger");
/** Bloqueia IPs com bloqueio ativo no banco antes de processar auth */
async function ipBlockMiddleware(req, res, next) {
    try {
        const ip = (0, client_ip_1.getClientIp)(req);
        await (0, ip_block_service_1.assertIpNotBlocked)(ip);
        next();
    }
    catch (err) {
        next(err);
    }
}
/** Rejeita payloads JSON suspeitos (injection, honeypot, profundidade excessiva) */
function rejectSuspiciousInput(req, res, next) {
    if ((0, input_safety_1.containsSuspiciousInput)(req.body)) {
        logger_1.logger.warn("Payload suspeito bloqueado", { ip: (0, client_ip_1.getClientIp)(req), path: req.path });
        res.status(400).json({
            success: false,
            code: "INVALID_INPUT",
            message: "Requisição inválida",
        });
        return;
    }
    next();
}
/** Exige Content-Type application/json em POST/PUT/PATCH */
function requireJsonContentType(req, res, next) {
    if (!["POST", "PUT", "PATCH"].includes(req.method)) {
        next();
        return;
    }
    const contentType = req.headers["content-type"] ?? "";
    if (!contentType.toLowerCase().includes("application/json")) {
        res.status(415).json({
            success: false,
            code: "UNSUPPORTED_MEDIA_TYPE",
            message: "Content-Type application/json obrigatório",
        });
        return;
    }
    next();
}
/** Bloqueia user-agents vazios ou claramente automatizados em rotas de auth */
function rejectSuspiciousUserAgent(req, res, next) {
    const ua = (req.headers["user-agent"] ?? "").trim();
    if (!ua || ua.length < 3) {
        res.status(403).json({
            success: false,
            code: "FORBIDDEN",
            message: "Requisição não permitida",
        });
        return;
    }
    const botPatterns = [/sqlmap/i, /nikto/i, /nmap/i, /masscan/i, /dirbuster/i, /gobuster/i];
    if (botPatterns.some((pattern) => pattern.test(ua))) {
        logger_1.logger.warn("User-Agent de scanner bloqueado", { ip: (0, client_ip_1.getClientIp)(req), ua });
        res.status(403).json({
            success: false,
            code: "FORBIDDEN",
            message: "Requisição não permitida",
        });
        return;
    }
    next();
}
/** Delay artificial em falhas para dificultar brute-force (aplicado no controller) */
async function applyAuthFailureDelay() {
    const baseMs = 350;
    const jitterMs = Math.floor(Math.random() * 250);
    await new Promise((resolve) => setTimeout(resolve, baseMs + jitterMs));
}
//# sourceMappingURL=security.middleware.js.map