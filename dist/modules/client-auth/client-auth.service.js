"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerClientService = registerClientService;
exports.loginClientService = loginClientService;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../../prisma/client"));
const AppError_1 = require("../../utils/AppError");
const logger_1 = require("../../utils/logger");
const client_2 = require("@prisma/client");
const DEFAULT_SUBSCRIPTION_DAYS = 30;
const BCRYPT_ROUNDS = 12;
function computeClientExpiry(keyExpiresAt) {
    if (keyExpiresAt && keyExpiresAt > new Date()) {
        return keyExpiresAt;
    }
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + DEFAULT_SUBSCRIPTION_DAYS);
    return expiry;
}
function daysRemaining(expiresAt) {
    const diff = expiresAt.getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
function formatUserPayload(client) {
    return {
        username: client.username,
        productName: client.key.product.name,
        daysRemaining: daysRemaining(client.expiresAt),
        expirationDate: client.expiresAt.toISOString().split("T")[0],
        timesUsed: client.loginCount,
        maxUsers: 1,
        isBanned: client.isBanned,
    };
}
async function logKeyAttempt(keyId, ipAddress, result, userAgent) {
    if (!keyId)
        return;
    await client_1.default.keyUsageLog.create({
        data: {
            keyId,
            ipAddress,
            userAgent: userAgent ?? "NeverClient/1.0",
            result,
        },
    });
}
async function registerClientService(input) {
    const { username, password, license, hwid, ipAddress } = input;
    const key = await client_1.default.key.findUnique({
        where: { value: license.trim() },
        include: { product: true, client: true },
    });
    if (!key) {
        throw new AppError_1.AppError("Key invalida", 400, "INVALID_KEY");
    }
    if (key.status === client_2.KeyStatus.REVOKED) {
        await logKeyAttempt(key.id, ipAddress, client_2.ValidationResult.REVOKED);
        throw new AppError_1.AppError("Key revogada", 403, "KEY_REVOKED");
    }
    if (key.status === client_2.KeyStatus.USED || key.client) {
        await logKeyAttempt(key.id, ipAddress, client_2.ValidationResult.ALREADY_USED);
        throw new AppError_1.AppError("Key ja utilizada", 409, "KEY_ALREADY_USED");
    }
    if (key.status === client_2.KeyStatus.EXPIRED) {
        await logKeyAttempt(key.id, ipAddress, client_2.ValidationResult.EXPIRED);
        throw new AppError_1.AppError("Key expirada", 403, "KEY_EXPIRED");
    }
    if (key.expiresAt && key.expiresAt < new Date()) {
        await client_1.default.key.update({ where: { id: key.id }, data: { status: client_2.KeyStatus.EXPIRED } });
        await logKeyAttempt(key.id, ipAddress, client_2.ValidationResult.EXPIRED);
        throw new AppError_1.AppError("Key expirada", 403, "KEY_EXPIRED");
    }
    if (!key.product.isActive) {
        throw new AppError_1.AppError("Produto inativo", 400, "PRODUCT_INACTIVE");
    }
    const existingUser = await client_1.default.client.findUnique({ where: { username } });
    if (existingUser) {
        throw new AppError_1.AppError("Usuario ja cadastrado", 409, "USERNAME_TAKEN");
    }
    const passwordHash = await bcrypt_1.default.hash(password, BCRYPT_ROUNDS);
    const expiresAt = computeClientExpiry(key.expiresAt);
    const client = await client_1.default.$transaction(async (tx) => {
        const created = await tx.client.create({
            data: {
                username,
                passwordHash,
                hwid,
                expiresAt,
                keyId: key.id,
                loginCount: 1,
                lastLoginAt: new Date(),
            },
            include: { key: { include: { product: true } } },
        });
        await tx.key.update({
            where: { id: key.id },
            data: {
                status: client_2.KeyStatus.USED,
                activatedAt: new Date(),
                expiresAt: expiresAt,
            },
        });
        await tx.keyUsageLog.create({
            data: {
                keyId: key.id,
                ipAddress,
                userAgent: "NeverClient/1.0",
                result: client_2.ValidationResult.SUCCESS,
            },
        });
        return created;
    });
    logger_1.logger.info("Cliente cadastrado", { clientId: client.id, username, keyId: key.id });
    return {
        message: "Conta criada com sucesso",
        user: formatUserPayload(client),
    };
}
async function loginClientService(input) {
    const { username, password, hwid, ipAddress } = input;
    const client = await client_1.default.client.findUnique({
        where: { username },
        include: { key: { include: { product: true } } },
    });
    if (!client) {
        throw new AppError_1.AppError("Credenciais invalidas", 401, "INVALID_CREDENTIALS");
    }
    if (client.isBanned) {
        throw new AppError_1.AppError("Conta banida", 403, "USER_BANNED");
    }
    const passwordMatch = await bcrypt_1.default.compare(password, client.passwordHash);
    if (!passwordMatch) {
        throw new AppError_1.AppError("Credenciais invalidas", 401, "INVALID_CREDENTIALS");
    }
    if (client.expiresAt < new Date()) {
        throw new AppError_1.AppError("Assinatura expirada", 403, "SUBSCRIPTION_EXPIRED");
    }
    if (client.key.status === client_2.KeyStatus.REVOKED) {
        throw new AppError_1.AppError("Licenca revogada", 403, "KEY_REVOKED");
    }
    if (client.hwid && client.hwid !== hwid) {
        await logKeyAttempt(client.keyId, ipAddress, client_2.ValidationResult.INVALID_KEY);
        throw new AppError_1.AppError("HWID nao autorizado", 403, "HWID_MISMATCH");
    }
    const updated = await client_1.default.client.update({
        where: { id: client.id },
        data: {
            hwid: client.hwid ?? hwid,
            lastLoginAt: new Date(),
            loginCount: { increment: 1 },
        },
        include: { key: { include: { product: true } } },
    });
    logger_1.logger.info("Login cliente", { clientId: client.id, username, ipAddress });
    return {
        message: "Login bem-sucedido",
        user: formatUserPayload(updated),
    };
}
//# sourceMappingURL=client-auth.service.js.map