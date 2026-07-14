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
const enums_1 = require("../../prisma/enums");
const log_alerts_service_1 = require("../logs/log-alerts.service");
const log_repository_1 = require("../logs/log.repository");
const ip_block_service_1 = require("../security/ip-block.service");
const banned_hwid_service_1 = require("../banned-hwid/banned-hwid.service");
const hwid_1 = require("../../utils/hwid");
const DEFAULT_SUBSCRIPTION_DAYS = 30;
const BCRYPT_ROUNDS = 12;
/** Data sentinela para keys permanentes (expiresAt null no painel). */
const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");
const LIFETIME_DAYS_REMAINING = 99999;
function isLifetimeExpiry(expiresAt) {
    return expiresAt.getTime() >= LIFETIME_EXPIRY.getTime();
}
/** Key permanente = flag isPermanent ou expiresAt null / sentinela 2099. */
function isLifetimeKey(key) {
    return key.isPermanent || key.expiresAt === null || isLifetimeExpiry(key.expiresAt);
}
function computeClientExpiry(key) {
    if (isLifetimeKey(key)) {
        return LIFETIME_EXPIRY;
    }
    if (key.expiresAt && key.expiresAt > new Date()) {
        return key.expiresAt;
    }
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + DEFAULT_SUBSCRIPTION_DAYS);
    return expiry;
}
function daysRemaining(expiresAt) {
    if (isLifetimeExpiry(expiresAt)) {
        return LIFETIME_DAYS_REMAINING;
    }
    const diff = expiresAt.getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}
function formatUserPayload(client) {
    const lifetime = isLifetimeKey(client.key) || isLifetimeExpiry(client.expiresAt);
    return {
        username: client.username,
        productName: client.key.product.name,
        daysRemaining: lifetime ? LIFETIME_DAYS_REMAINING : daysRemaining(client.expiresAt),
        expirationDate: lifetime ? "Lifetime" : client.expiresAt.toISOString().split("T")[0],
        isLifetime: lifetime,
        timesUsed: client.loginCount,
        maxUsers: 1,
        isBanned: client.isBanned,
    };
}
async function afterClientFailure(params) {
    await (0, ip_block_service_1.evaluateAutoBlock)(params.ipAddress, params.action === "REGISTER" && params.reason === "INVALID_KEY" ? "KEY_SCANNING" : "CLIENT_LOGIN");
    const since = new Date(Date.now() - 15 * 60 * 1000);
    const attemptsFromIp = await log_repository_1.logRepository.countRecentFailuresByIp(params.ipAddress, since, "client");
    if (params.reason === "INVALID_KEY") {
        const invalidKeys = await log_repository_1.logRepository.countRecentInvalidKeysByIp(params.ipAddress, since);
        void (0, log_alerts_service_1.notifyKeyScanning)({ ip: params.ipAddress, invalidAttempts: invalidKeys });
    }
    void (0, log_alerts_service_1.notifyClientLoginFailed)({
        username: params.username,
        ip: params.ipAddress,
        reason: params.reason,
        action: params.action,
        hwid: params.hwid,
        attemptsFromIp,
    });
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
async function assertHwidNotBanned(hwid, ctx) {
    if (!hwid?.trim())
        return;
    if (await (0, banned_hwid_service_1.isHwidBanned)(hwid)) {
        await logClientAccess({
            username: ctx.username,
            ipAddress: ctx.ipAddress,
            hwid,
            action: ctx.action,
            success: false,
            reason: "HWID_BANNED",
        });
        await afterClientFailure({
            ipAddress: ctx.ipAddress,
            username: ctx.username,
            reason: "HWID_BANNED",
            action: ctx.action,
            hwid,
        });
        throw new AppError_1.AppError("HWID banido", 403, "HWID_BANNED");
    }
}
async function logClientAccess(data) {
    await client_1.default.clientAccessLog.create({
        data: {
            clientId: data.clientId ?? null,
            usernameAttempted: data.username,
            ipAddress: data.ipAddress,
            hwid: (0, hwid_1.normalizeHwid)(data.hwid) ?? null,
            action: data.action,
            success: data.success,
            reason: data.reason ?? null,
        },
    });
}
async function registerClientService(input) {
    const { username, password, license, hwid, ipAddress } = input;
    const canonicalHwid = hwid.trim() ? (0, hwid_1.resolveHwidForBinding)(hwid) : null;
    await assertHwidNotBanned(canonicalHwid ?? "", { username, ipAddress, action: "REGISTER" });
    const key = await client_1.default.key.findUnique({
        where: { value: license.trim() },
        include: { product: true, client: true },
    });
    if (!key) {
        await logClientAccess({
            username,
            ipAddress,
            hwid,
            action: "REGISTER",
            success: false,
            reason: "INVALID_KEY",
        });
        await afterClientFailure({ ipAddress, username, reason: "INVALID_KEY", action: "REGISTER", hwid });
        throw new AppError_1.AppError("Key invalida", 400, "INVALID_KEY");
    }
    if (key.status === enums_1.KeyStatus.REVOKED) {
        await logKeyAttempt(key.id, ipAddress, enums_1.ValidationResult.REVOKED);
        await logClientAccess({
            username,
            ipAddress,
            hwid,
            action: "REGISTER",
            success: false,
            reason: "KEY_REVOKED",
        });
        throw new AppError_1.AppError("Key revogada", 403, "KEY_REVOKED");
    }
    if (key.status === enums_1.KeyStatus.PAUSED) {
        await logClientAccess({
            username,
            ipAddress,
            hwid,
            action: "REGISTER",
            success: false,
            reason: "KEY_PAUSED",
        });
        throw new AppError_1.AppError("Key pausada", 403, "KEY_PAUSED");
    }
    if (key.status === enums_1.KeyStatus.USED || key.client) {
        await logKeyAttempt(key.id, ipAddress, enums_1.ValidationResult.ALREADY_USED);
        await logClientAccess({
            username,
            ipAddress,
            hwid,
            action: "REGISTER",
            success: false,
            reason: "KEY_ALREADY_USED",
        });
        throw new AppError_1.AppError("Key ja utilizada", 409, "KEY_ALREADY_USED");
    }
    if (key.status === enums_1.KeyStatus.EXPIRED) {
        await logKeyAttempt(key.id, ipAddress, enums_1.ValidationResult.EXPIRED);
        await logClientAccess({
            username,
            ipAddress,
            hwid,
            action: "REGISTER",
            success: false,
            reason: "KEY_EXPIRED",
        });
        throw new AppError_1.AppError("Key expirada", 403, "KEY_EXPIRED");
    }
    if (key.expiresAt && key.expiresAt < new Date()) {
        await client_1.default.key.update({ where: { id: key.id }, data: { status: enums_1.KeyStatus.EXPIRED } });
        await logKeyAttempt(key.id, ipAddress, enums_1.ValidationResult.EXPIRED);
        await logClientAccess({
            username,
            ipAddress,
            hwid,
            action: "REGISTER",
            success: false,
            reason: "KEY_EXPIRED",
        });
        throw new AppError_1.AppError("Key expirada", 403, "KEY_EXPIRED");
    }
    if (!key.product.isActive) {
        await logClientAccess({
            username,
            ipAddress,
            hwid,
            action: "REGISTER",
            success: false,
            reason: "PRODUCT_INACTIVE",
        });
        throw new AppError_1.AppError("Produto inativo", 400, "PRODUCT_INACTIVE");
    }
    const existingUser = await client_1.default.client.findUnique({ where: { username } });
    if (existingUser) {
        await logClientAccess({
            clientId: existingUser.id,
            username,
            ipAddress,
            hwid,
            action: "REGISTER",
            success: false,
            reason: "USERNAME_TAKEN",
        });
        throw new AppError_1.AppError("Usuario ja cadastrado", 409, "USERNAME_TAKEN");
    }
    const passwordHash = await bcrypt_1.default.hash(password, BCRYPT_ROUNDS);
    const expiresAt = computeClientExpiry(key);
    const client = await client_1.default.$transaction(async (tx) => {
        const created = await tx.client.create({
            data: {
                username,
                passwordHash,
                hwid: canonicalHwid,
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
                status: enums_1.KeyStatus.USED,
                activatedAt: new Date(),
                expiresAt,
                isPermanent: key.isPermanent,
                // Vincula o nome do cliente que registrou a key (visível na listagem de usuários)
                customerName: key.customerName ?? username,
            },
        });
        await tx.keyUsageLog.create({
            data: {
                keyId: key.id,
                ipAddress,
                userAgent: "NeverClient/1.0",
                result: enums_1.ValidationResult.SUCCESS,
            },
        });
        return created;
    });
    await logClientAccess({
        clientId: client.id,
        username,
        ipAddress,
        hwid,
        action: "REGISTER",
        success: true,
    });
    logger_1.logger.info("Cliente cadastrado", { clientId: client.id, username, keyId: key.id });
    return {
        message: "Conta criada com sucesso",
        user: formatUserPayload(client),
    };
}
async function loginClientService(input) {
    const { username, password, hwid, ipAddress } = input;
    const incomingHwid = hwid.trim() ? (0, hwid_1.resolveHwidForBinding)(hwid) : null;
    await assertHwidNotBanned(incomingHwid ?? "", { username, ipAddress, action: "LOGIN" });
    const client = await client_1.default.client.findUnique({
        where: { username },
        include: { key: { include: { product: true } } },
    });
    if (!client) {
        await logClientAccess({
            username,
            ipAddress,
            hwid,
            action: "LOGIN",
            success: false,
            reason: "USER_NOT_FOUND",
        });
        await afterClientFailure({ ipAddress, username, reason: "USER_NOT_FOUND", action: "LOGIN", hwid });
        throw new AppError_1.AppError("Credenciais invalidas", 401, "INVALID_CREDENTIALS");
    }
    if (client.isBanned) {
        await logClientAccess({
            clientId: client.id,
            username,
            ipAddress,
            hwid,
            action: "LOGIN",
            success: false,
            reason: "USER_BANNED",
        });
        await afterClientFailure({ ipAddress, username, reason: "USER_BANNED", action: "LOGIN", hwid });
        throw new AppError_1.AppError("Conta banida", 403, "USER_BANNED");
    }
    const passwordMatch = await bcrypt_1.default.compare(password, client.passwordHash);
    if (!passwordMatch) {
        await logClientAccess({
            clientId: client.id,
            username,
            ipAddress,
            hwid,
            action: "LOGIN",
            success: false,
            reason: "WRONG_PASSWORD",
        });
        await afterClientFailure({ ipAddress, username, reason: "WRONG_PASSWORD", action: "LOGIN", hwid });
        throw new AppError_1.AppError("Credenciais invalidas", 401, "INVALID_CREDENTIALS");
    }
    const lifetime = isLifetimeKey(client.key) || isLifetimeExpiry(client.expiresAt);
    if (!lifetime && client.expiresAt < new Date()) {
        await logClientAccess({
            clientId: client.id,
            username,
            ipAddress,
            hwid,
            action: "LOGIN",
            success: false,
            reason: "SUBSCRIPTION_EXPIRED",
        });
        throw new AppError_1.AppError("Assinatura expirada", 403, "SUBSCRIPTION_EXPIRED");
    }
    if (client.key.status === enums_1.KeyStatus.REVOKED) {
        await logClientAccess({
            clientId: client.id,
            username,
            ipAddress,
            hwid,
            action: "LOGIN",
            success: false,
            reason: "KEY_REVOKED",
        });
        throw new AppError_1.AppError("Licenca revogada", 403, "KEY_REVOKED");
    }
    if (client.key.status === enums_1.KeyStatus.PAUSED) {
        await logClientAccess({
            clientId: client.id,
            username,
            ipAddress,
            hwid,
            action: "LOGIN",
            success: false,
            reason: "KEY_PAUSED",
        });
        throw new AppError_1.AppError("Licenca pausada", 403, "KEY_PAUSED");
    }
    const storedHwid = (0, hwid_1.normalizeHwid)(client.hwid);
    if ((0, hwid_1.isHwidBound)(storedHwid) && incomingHwid && !(0, hwid_1.hwidsEqual)(storedHwid, incomingHwid)) {
        await logKeyAttempt(client.keyId, ipAddress, enums_1.ValidationResult.INVALID_KEY);
        await logClientAccess({
            clientId: client.id,
            username,
            ipAddress,
            hwid: incomingHwid,
            action: "LOGIN",
            success: false,
            reason: "HWID_MISMATCH",
        });
        await afterClientFailure({ ipAddress, username, reason: "HWID_MISMATCH", action: "LOGIN", hwid: incomingHwid });
        throw new AppError_1.AppError("HWID nao autorizado", 403, "HWID_MISMATCH");
    }
    if ((0, hwid_1.isHwidBound)(storedHwid) && !incomingHwid) {
        await logClientAccess({
            clientId: client.id,
            username,
            ipAddress,
            hwid: null,
            action: "LOGIN",
            success: false,
            reason: "HWID_MISSING",
        });
        throw new AppError_1.AppError("HWID nao enviado pelo cliente. Atualize o loader ou reinstale o cheat.", 403, "HWID_MISSING");
    }
    const clientUpdate = {
        hwid: storedHwid ?? incomingHwid,
        lastLoginAt: new Date(),
        loginCount: { increment: 1 },
    };
    if (lifetime && !isLifetimeExpiry(client.expiresAt)) {
        clientUpdate.expiresAt = LIFETIME_EXPIRY;
    }
    const updated = await client_1.default.client.update({
        where: { id: client.id },
        data: clientUpdate,
        include: { key: { include: { product: true } } },
    });
    await logClientAccess({
        clientId: client.id,
        username,
        ipAddress,
        hwid,
        action: "LOGIN",
        success: true,
    });
    logger_1.logger.info("Login cliente", { clientId: client.id, username, ipAddress });
    return {
        message: "Login bem-sucedido",
        user: formatUserPayload(updated),
    };
}
//# sourceMappingURL=client-auth.service.js.map