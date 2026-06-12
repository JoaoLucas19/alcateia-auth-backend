"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIpBlocked = isIpBlocked;
exports.assertIpNotBlocked = assertIpNotBlocked;
exports.evaluateAutoBlock = evaluateAutoBlock;
exports.cleanupExpiredIpBlocks = cleanupExpiredIpBlocks;
const client_1 = __importDefault(require("../../prisma/client"));
const env_1 = require("../../config/env");
const AppError_1 = require("../../utils/AppError");
const logger_1 = require("../../utils/logger");
const client_ip_1 = require("../../utils/client-ip");
const log_alerts_service_1 = require("../logs/log-alerts.service");
const blockCache = new Map();
const CACHE_TTL_MS = 30000;
function cacheKey(ip) {
    return (0, client_ip_1.normalizeIp)(ip);
}
function readCache(ip) {
    const entry = blockCache.get(cacheKey(ip));
    if (!entry)
        return null;
    if (Date.now() > entry.expiresAt) {
        blockCache.delete(cacheKey(ip));
        return null;
    }
    return entry.blocked;
}
function writeCache(ip, blocked) {
    blockCache.set(cacheKey(ip), { blocked, expiresAt: Date.now() + CACHE_TTL_MS });
}
function invalidateCache(ip) {
    blockCache.delete(cacheKey(ip));
}
async function findActiveBlock(ip) {
    const normalized = (0, client_ip_1.normalizeIp)(ip);
    if (normalized === "unknown")
        return null;
    const now = new Date();
    return client_1.default.blockedIp.findFirst({
        where: {
            ipAddress: normalized,
            OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
        },
    });
}
async function isIpBlocked(ip) {
    const cached = readCache(ip);
    if (cached !== null)
        return cached;
    const row = await findActiveBlock(ip);
    const blocked = Boolean(row);
    writeCache(ip, blocked);
    return blocked;
}
async function assertIpNotBlocked(ip) {
    if (await isIpBlocked(ip)) {
        throw new AppError_1.AppError("Acesso temporariamente bloqueado por atividade suspeita", 403, "IP_BLOCKED");
    }
}
async function upsertBlock(ip, reason, durationMs, source) {
    const normalized = (0, client_ip_1.normalizeIp)(ip);
    if (normalized === "unknown")
        return;
    const expiresAt = new Date(Date.now() + durationMs);
    await client_1.default.blockedIp.upsert({
        where: { ipAddress: normalized },
        create: {
            ipAddress: normalized,
            reason,
            source,
            expiresAt,
        },
        update: {
            reason,
            source,
            blockedAt: new Date(),
            expiresAt,
        },
    });
    invalidateCache(normalized);
    logger_1.logger.warn("IP bloqueado automaticamente", { ip: normalized, reason, source, expiresAt });
    void (0, log_alerts_service_1.notifyIpBlocked)({ ip: normalized, reason, source });
}
async function countAdminFailures(ip, since) {
    return client_1.default.accessLog.count({
        where: { ipAddress: (0, client_ip_1.normalizeIp)(ip), success: false, createdAt: { gte: since } },
    });
}
async function countClientFailures(ip, since) {
    return client_1.default.clientAccessLog.count({
        where: { ipAddress: (0, client_ip_1.normalizeIp)(ip), success: false, createdAt: { gte: since } },
    });
}
async function countInvalidKeys(ip, since) {
    return client_1.default.keyUsageLog.count({
        where: {
            ipAddress: (0, client_ip_1.normalizeIp)(ip),
            result: { not: "SUCCESS" },
            attemptedAt: { gte: since },
        },
    });
}
async function evaluateAutoBlock(ip, source) {
    if ((0, client_ip_1.normalizeIp)(ip) === "unknown")
        return;
    if (await isIpBlocked(ip))
        return;
    const since = new Date(Date.now() - env_1.env.SECURITY_WINDOW_MS);
    let failures = 0;
    let threshold = 0;
    let durationMs = env_1.env.IP_BLOCK_DURATION_MS;
    let reason = "";
    switch (source) {
        case "ADMIN_LOGIN":
            failures = await countAdminFailures(ip, since);
            threshold = env_1.env.ADMIN_LOGIN_BLOCK_THRESHOLD;
            reason = `${failures} falhas de login admin em ${env_1.env.SECURITY_WINDOW_MS / 60000} min`;
            break;
        case "CLIENT_LOGIN":
            failures = await countClientFailures(ip, since);
            threshold = env_1.env.CLIENT_LOGIN_BLOCK_THRESHOLD;
            reason = `${failures} falhas de login cliente em ${env_1.env.SECURITY_WINDOW_MS / 60000} min`;
            break;
        case "KEY_SCANNING":
            failures = await countInvalidKeys(ip, since);
            threshold = env_1.env.KEY_SCAN_BLOCK_THRESHOLD;
            durationMs = env_1.env.KEY_SCAN_BLOCK_DURATION_MS;
            reason = `${failures} keys inválidas testadas em ${env_1.env.SECURITY_WINDOW_MS / 60000} min`;
            break;
    }
    if (failures >= threshold) {
        await upsertBlock(ip, reason, durationMs, source);
    }
}
async function cleanupExpiredIpBlocks() {
    const result = await client_1.default.blockedIp.deleteMany({
        where: {
            expiresAt: { not: null, lt: new Date() },
        },
    });
    if (result.count > 0) {
        blockCache.clear();
        logger_1.logger.info("IPs bloqueados expirados removidos", { count: result.count });
    }
    return result.count;
}
//# sourceMappingURL=ip-block.service.js.map