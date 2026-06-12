"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGlobalRateLimiter = createGlobalRateLimiter;
exports.createAdminLoginLimiter = createAdminLoginLimiter;
exports.createClientAuthLimiter = createClientAuthLimiter;
exports.createAuthenticatedApiLimiter = createAuthenticatedApiLimiter;
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("../config/env");
const client_ip_1 = require("../utils/client-ip");
function rateLimitHandler(_req, res) {
    res.status(429).json({
        success: false,
        code: "RATE_LIMIT",
        message: "Muitas requisições. Aguarde e tente novamente.",
    });
}
function ipKeyGenerator(req) {
    return (0, client_ip_1.getClientIp)(req);
}
/** Rate limit global da API */
function createGlobalRateLimiter() {
    return (0, express_rate_limit_1.default)({
        windowMs: env_1.env.RATE_LIMIT_WINDOW_MS,
        max: env_1.env.RATE_LIMIT_MAX,
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: ipKeyGenerator,
        handler: rateLimitHandler,
    });
}
/** Login admin — máximo de tentativas por IP */
function createAdminLoginLimiter() {
    return (0, express_rate_limit_1.default)({
        windowMs: env_1.env.ADMIN_LOGIN_RATE_WINDOW_MS,
        max: env_1.env.ADMIN_LOGIN_RATE_MAX,
        standardHeaders: true,
        legacyHeaders: false,
        skipSuccessfulRequests: true,
        keyGenerator: ipKeyGenerator,
        handler: (_req, res) => {
            res.status(429).json({
                success: false,
                code: "RATE_LIMIT",
                message: "Muitas tentativas de login. Tente novamente em 15 minutos.",
            });
        },
    });
}
/** Login/cadastro cliente (cheat) */
function createClientAuthLimiter() {
    return (0, express_rate_limit_1.default)({
        windowMs: env_1.env.CLIENT_AUTH_RATE_WINDOW_MS,
        max: env_1.env.CLIENT_AUTH_RATE_MAX,
        standardHeaders: true,
        legacyHeaders: false,
        skipSuccessfulRequests: true,
        keyGenerator: ipKeyGenerator,
        handler: (_req, res) => {
            res.status(429).json({
                success: false,
                code: "RATE_LIMIT",
                message: "Muitas tentativas. Aguarde 15 minutos.",
            });
        },
    });
}
/** Rotas autenticadas do painel — evita abuso de token roubado */
function createAuthenticatedApiLimiter() {
    return (0, express_rate_limit_1.default)({
        windowMs: env_1.env.AUTH_API_RATE_WINDOW_MS,
        max: env_1.env.AUTH_API_RATE_MAX,
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: (req) => {
            const adminId = req.admin?.id;
            return adminId ? `admin:${adminId}` : ipKeyGenerator(req);
        },
        handler: rateLimitHandler,
    });
}
//# sourceMappingURL=rate-limit.js.map