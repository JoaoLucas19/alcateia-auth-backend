"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginService = loginService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../../prisma/client"));
const AppError_1 = require("../../utils/AppError");
const logger_1 = require("../../utils/logger");
const env_1 = require("../../config/env");
const ip_block_service_1 = require("../security/ip-block.service");
/** Hash fictício para equalizar tempo quando usuário não existe (anti enumeração). */
const DUMMY_PASSWORD_HASH = "$2b$12$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW";
async function loginService({ username, password, ip }) {
    const admin = await client_1.default.admin.findUnique({ where: { username } });
    if (!admin) {
        await bcrypt_1.default.compare(password, DUMMY_PASSWORD_HASH);
        await client_1.default.accessLog.create({
            data: { usernameAttempted: username, ipAddress: ip, success: false, reason: "USER_NOT_FOUND" },
        });
        logger_1.logger.warn("Login falhou: usuário não encontrado", { username, ip });
        await (0, ip_block_service_1.evaluateAutoBlock)(ip, "ADMIN_LOGIN");
        throw new AppError_1.AppError("Credenciais inválidas", 401, "INVALID_CREDENTIALS");
    }
    const passwordMatch = await bcrypt_1.default.compare(password, admin.passwordHash);
    if (!passwordMatch) {
        await client_1.default.accessLog.create({
            data: { adminId: admin.id, usernameAttempted: username, ipAddress: ip, success: false, reason: "WRONG_PASSWORD" },
        });
        logger_1.logger.warn("Login falhou: senha incorreta", { username, ip });
        await (0, ip_block_service_1.evaluateAutoBlock)(ip, "ADMIN_LOGIN");
        throw new AppError_1.AppError("Credenciais inválidas", 401, "INVALID_CREDENTIALS");
    }
    // Login bem-sucedido: atualiza lastLoginAt e registra log
    await client_1.default.admin.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });
    await client_1.default.accessLog.create({
        data: { adminId: admin.id, usernameAttempted: username, ipAddress: ip, success: true },
    });
    logger_1.logger.info("Login bem-sucedido", { adminId: admin.id, ip });
    const token = jsonwebtoken_1.default.sign({ id: admin.id, username: admin.username }, env_1.env.JWT_SECRET, { expiresIn: env_1.env.JWT_EXPIRES_IN });
    return { token, expiresIn: env_1.env.JWT_EXPIRES_IN, admin: { id: admin.id, username: admin.username } };
}
//# sourceMappingURL=auth.service.js.map