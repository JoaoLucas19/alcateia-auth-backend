"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = loginService;
exports.logoutService = logoutService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../../prisma/client"));
const AppError_1 = require("../../utils/AppError");
const logger_1 = require("../../utils/logger");
const env_1 = require("../../config/env");
const ip_block_service_1 = require("../security/ip-block.service");
const log_alerts_service_1 = require("../logs/log-alerts.service");
const log_repository_1 = require("../logs/log.repository");
/** Hash fictício para equalizar tempo quando usuário não existe (anti enumeração). */
const DUMMY_PASSWORD_HASH = "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW";
async function afterAdminLoginFailure(ip, username, reason) {
    await (0, ip_block_service_1.evaluateAutoBlock)(ip, "ADMIN_LOGIN");
    const since = new Date(Date.now() - 15 * 60 * 1000);
    const attemptsFromIp = await log_repository_1.logRepository.countRecentFailuresByIp(ip, since, "admin");
    void (0, log_alerts_service_1.notifyAdminLoginFailed)({ username, ip, reason, attemptsFromIp });
}
async function loginService({ username, password, ip }) {
    const admin = await client_1.default.admin.findUnique({ where: { username } });
    if (!admin) {
        await bcrypt_1.default.compare(password, DUMMY_PASSWORD_HASH);
        await client_1.default.accessLog.create({
            data: { usernameAttempted: username, ipAddress: ip, success: false, reason: "USER_NOT_FOUND" },
        });
        logger_1.logger.warn("Login falhou: usuário não encontrado", { username, ip });
        await afterAdminLoginFailure(ip, username, "USER_NOT_FOUND");
        throw new AppError_1.AppError("Credenciais inválidas", 401, "INVALID_CREDENTIALS");
    }
    const passwordMatch = await bcrypt_1.default.compare(password, admin.passwordHash);
    if (!passwordMatch) {
        await client_1.default.accessLog.create({
            data: { adminId: admin.id, usernameAttempted: username, ipAddress: ip, success: false, reason: "WRONG_PASSWORD" },
        });
        logger_1.logger.warn("Login falhou: senha incorreta", { username, ip });
        await afterAdminLoginFailure(ip, username, "WRONG_PASSWORD");
        throw new AppError_1.AppError("Credenciais inválidas", 401, "INVALID_CREDENTIALS");
    }
    // Login bem-sucedido: atualiza lastLoginAt e registra log
    await client_1.default.admin.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });
    await client_1.default.accessLog.create({
        data: { adminId: admin.id, usernameAttempted: username, ipAddress: ip, success: true },
    });
    logger_1.logger.info("Login bem-sucedido", { adminId: admin.id, ip });
    void (0, log_alerts_service_1.notifyAdminLoginSuccess)({ username: admin.username, ip });
    const token = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_EXPIRES_IN });
    return { token, expiresIn: env_1.env.JWT_EXPIRES_IN, admin: { id: admin.id, username: admin.username } };
}
async function logoutService(params) {
    await client_1.default.accessLog.create({
        data: {
            adminId: params.adminId,
            usernameAttempted: params.username,
            ipAddress: params.ip,
            success: true,
            reason: "LOGOUT",
        },
    });
    logger_1.logger.info("Logout registrado", { adminId: params.adminId, ip: params.ip });
}
//# sourceMappingURL=auth.service.js.map