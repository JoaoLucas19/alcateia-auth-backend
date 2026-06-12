"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logService = void 0;
exports.runCleanupFailedLogins = runCleanupFailedLogins;
const log_analytics_1 = require("./log.analytics");
const log_formatters_1 = require("./log.formatters");
const log_repository_1 = require("./log.repository");
const logger_1 = require("../../utils/logger");
const FAILED_LOGIN_RETENTION_HOURS = 24;
let cleanupInFlight = false;
function loginStatsFromGroup(rows, failed7d, uniqueFailedIps24h) {
    const success24h = rows.find((r) => r.success)?._count ?? 0;
    const failed24h = rows.find((r) => !r.success)?._count ?? 0;
    const total24h = success24h + failed24h;
    return {
        success24h,
        failed24h,
        total24h,
        failureRate: total24h > 0 ? Math.round((failed24h / total24h) * 1000) / 1000 : 0,
        failed7d,
        uniqueFailedIps24h,
    };
}
function buildRecentFailedLogins(adminRows, clientRows, limit = 25) {
    const merged = [
        ...adminRows.map((r) => ({
            id: r.id,
            source: "admin",
            username: r.usernameAttempted,
            ip: r.ipAddress,
            reason: (0, log_formatters_1.reasonLabel)(r.reason),
            createdAt: r.createdAt.toISOString(),
        })),
        ...clientRows.map((r) => ({
            id: r.id,
            source: "client",
            username: r.usernameAttempted,
            ip: r.ipAddress,
            reason: (0, log_formatters_1.reasonLabel)(r.reason),
            action: r.action,
            createdAt: r.createdAt.toISOString(),
        })),
    ];
    return merged
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limit);
}
async function evaluateSecurityFromRaw(raw) {
    const adminLogins = loginStatsFromGroup(raw.logins24h, raw.adminFailed7d, raw.adminUniqueFailedIps24h);
    const clientLogins = loginStatsFromGroup(raw.clientLogins24h, raw.clientFailed7d, raw.clientUniqueFailedIps24h);
    const suspiciousIps = (0, log_analytics_1.aggregateSuspiciousIps)({
        adminFailures: raw.adminFailures24hList,
        clientFailures: raw.clientFailures24hList,
        invalidKeyByIp: raw.invalidKeyByIpFull,
    });
    const clientFailuresByIpMap = new Map();
    for (const row of raw.clientFailures24hList) {
        clientFailuresByIpMap.set(row.ipAddress, (clientFailuresByIpMap.get(row.ipAddress) ?? 0) + 1);
    }
    const clientFailuresByIp = Array.from(clientFailuresByIpMap.entries())
        .map(([ipAddress, _count]) => ({ ipAddress, _count }))
        .sort((a, b) => b._count - a._count)
        .slice(0, 10);
    const alerts = (0, log_analytics_1.detectSecurityAlerts)({
        adminFailed24h: adminLogins.failed24h,
        adminTotal24h: adminLogins.total24h,
        adminFailuresByIp: raw.adminFailuresByIp,
        adminFailuresByUsername: raw.adminFailuresByUsername,
        invalidKeyByIp: raw.topInvalidIps,
        adminFailuresLastHour: raw.adminFailuresLastHour,
        clientFailed24h: clientLogins.failed24h,
        clientFailuresByIp,
    });
    const { level: threatLevel, score: threatScore } = (0, log_analytics_1.computeThreatLevel)(alerts, suspiciousIps);
    return { alerts, threatLevel, threatScore, suspiciousIps, adminLogins, clientLogins };
}
function retentionCutoff(hours = FAILED_LOGIN_RETENTION_HOURS) {
    return new Date(Date.now() - hours * 60 * 60 * 1000);
}
async function cleanupOldFailedLogins() {
    if (cleanupInFlight)
        return;
    cleanupInFlight = true;
    try {
        const result = await log_repository_1.logRepository.deleteOldFailedLogins(retentionCutoff());
        if (result.total > 0) {
            logger_1.logger.info("Logins falhos antigos removidos", result);
        }
    }
    catch (err) {
        logger_1.logger.error("Falha ao limpar logins falhos antigos", {
            error: err instanceof Error ? err.message : String(err),
        });
    }
    finally {
        cleanupInFlight = false;
    }
}
/** Limpeza explícita (admin/bot) — retorna contagens */
async function runCleanupFailedLogins(hours = FAILED_LOGIN_RETENTION_HOURS) {
    const result = await log_repository_1.logRepository.deleteOldFailedLogins(retentionCutoff(hours));
    return {
        ...result,
        retentionHours: hours,
        message: "Limpeza de logins falhos concluída",
    };
}
exports.logService = {
    cleanupOldFailedLogins,
    async evaluateSecurity() {
        const raw = await log_repository_1.logRepository.getDashboardStats();
        return evaluateSecurityFromRaw(raw);
    },
    async getDashboard() {
        await cleanupOldFailedLogins();
        const raw = await log_repository_1.logRepository.getDashboardStats();
        const { alerts, threatLevel, threatScore, suspiciousIps, adminLogins, clientLogins } = await evaluateSecurityFromRaw(raw);
        const validationsMap = Object.fromEntries(raw.validations24h.map((v) => [v.result, v._count]));
        const activations24h = validationsMap.SUCCESS ?? 0;
        const timeline24h = (0, log_analytics_1.buildTimeline24h)(raw.adminTimelineRaw, raw.clientTimelineRaw, raw.keyTimelineRaw);
        const recentFailedLogins = buildRecentFailedLogins(raw.recentAdminFailed, raw.recentClientFailed, 25);
        const failuresByReason = [
            ...raw.adminFailuresByReason.map((r) => ({
                source: "admin",
                reason: r.reason,
                label: (0, log_formatters_1.reasonLabel)(r.reason),
                count: r._count,
            })),
            ...raw.clientFailuresByReason.map((r) => ({
                source: "client",
                reason: r.reason,
                label: (0, log_formatters_1.reasonLabel)(r.reason),
                count: r._count,
            })),
        ].sort((a, b) => b.count - a.count);
        return {
            keysByStatus: raw.keysByStatus,
            logins24h: raw.logins24h,
            validations24h: raw.validations24h,
            topInvalidIps: raw.topInvalidIps,
            keys: raw.keysSummary,
            clients: {
                total: raw.clientsTotal,
                banned: raw.clientsBanned,
                expired: raw.clientsExpired,
                active: Math.max(0, raw.clientsTotal - raw.clientsBanned - raw.clientsExpired),
            },
            metrics: {
                activations24h,
                adminLoginsOk24h: adminLogins.success24h,
                adminLoginsFailed24h: adminLogins.failed24h,
                clientLoginsOk24h: clientLogins.success24h,
                clientLoginsFailed24h: clientLogins.failed24h,
            },
            security: {
                threatLevel,
                threatScore,
                alerts,
                adminLogins,
                clientLogins,
                suspiciousIps,
                topFailedUsernames: raw.adminFailuresByUsername.map((r) => ({
                    username: r.usernameAttempted,
                    attempts: r._count,
                })),
                failuresByReason,
                timeline24h,
                recentFailedLogins,
                checks: {
                    bruteForceIps: alerts.filter((a) => a.type === "BRUTE_FORCE_IP").length,
                    keyScanningIps: alerts.filter((a) => a.type === "KEY_SCANNING").length,
                    highFailureRate: adminLogins.failureRate >= 0.35,
                    spikeLastHour: raw.adminFailuresLastHour >= 5,
                    hwidMismatchRisk: (raw.clientFailuresByReason.find((r) => r.reason === "HWID_MISMATCH")?._count ?? 0) > 0,
                },
            },
        };
    },
    async getSecurity(days) {
        const [dashboard, detail] = await Promise.all([
            this.getDashboard(),
            log_repository_1.logRepository.getSecurityDetail(days),
        ]);
        return {
            overview: dashboard.security,
            period: {
                days: detail.periodDays,
                admin: detail.adminByDay,
                client: detail.clientByDay,
                keyValidations: detail.keyResults,
            },
            rankings: {
                topAdminFailedIps: detail.topAdminIps,
                topClientFailedIps: detail.topClientIps,
            },
            hwidMismatches: detail.hwidMismatches,
            keys: dashboard.keys,
            clients: dashboard.clients,
        };
    },
    async getFailedLogins(params) {
        const hours = params.hours ?? FAILED_LOGIN_RETENTION_HOURS;
        const since = new Date(Date.now() - hours * 60 * 60 * 1000);
        const result = await log_repository_1.logRepository.findUnifiedFailedLogins({
            page: params.page,
            limit: params.limit,
            source: params.source ?? "all",
            ip: params.ip,
            since,
        });
        return {
            ...result,
            data: result.data.map((row) => ({
                ...row,
                reasonCode: row.reason,
                reasonLabel: (0, log_formatters_1.reasonLabel)(row.reason),
                event: row.source === "admin" ? "Falha de login admin" : `Falha de ${row.action === "REGISTER" ? "cadastro" : "login"} cliente`,
                detail: (0, log_formatters_1.reasonLabel)(row.reason),
                status: "failed",
                createdAt: row.createdAt.toISOString(),
            })),
        };
    },
    async getLogOverview(hours = 24) {
        await cleanupOldFailedLogins();
        const since = new Date(Date.now() - hours * 60 * 60 * 1000);
        const [raw, counts, evaluation] = await Promise.all([
            log_repository_1.logRepository.getDashboardStats(),
            log_repository_1.logRepository.countAccessLogsInWindow(since),
            this.evaluateSecurity(),
        ]);
        const adminSuccess = raw.logins24h.find((r) => r.success)?._count ?? 0;
        const adminFailed = raw.logins24h.find((r) => !r.success)?._count ?? 0;
        const clientSuccess = raw.clientLogins24h.find((r) => r.success)?._count ?? 0;
        const clientFailed = raw.clientLogins24h.find((r) => !r.success)?._count ?? 0;
        const keySuccess = raw.validations24h.find((r) => r.result === "SUCCESS")?._count ?? 0;
        const keyFailed = raw.validations24h
            .filter((r) => r.result !== "SUCCESS")
            .reduce((sum, r) => sum + r._count, 0);
        return {
            threatLevel: evaluation.threatLevel,
            threatScore: evaluation.threatScore,
            activeAlerts: evaluation.alerts.length,
            recordsInWindow: counts.total,
            summary: {
                adminSuccess,
                adminFailed,
                clientSuccess,
                clientFailed,
                keySuccess,
                keyFailed,
                ipBlocks: counts.blocks,
            },
            alerts: evaluation.alerts,
        };
    },
    async getLogFeed(filters) {
        const since = new Date(Date.now() - filters.hours * 60 * 60 * 1000);
        const takePerSource = Math.min(Math.max(filters.page * filters.limit, filters.limit), 500);
        let merged = await log_repository_1.logRepository.findUnifiedLogFeed({
            since,
            takePerSource,
            category: filters.category,
            status: filters.status,
            ip: filters.ip,
            username: filters.username,
        });
        if (filters.search?.trim()) {
            merged = merged.filter((entry) => (0, log_formatters_1.matchesLogSearch)(entry, filters.search));
        }
        const total = merged.length;
        const start = (filters.page - 1) * filters.limit;
        const data = merged.slice(start, start + filters.limit);
        return {
            data,
            total,
            page: filters.page,
            totalPages: Math.ceil(total / filters.limit) || 1,
            filters: {
                hours: filters.hours,
                category: filters.category ?? "all",
                status: filters.status ?? "all",
            },
        };
    },
    async investigateIpAddress(ip, hours = 168) {
        const since = new Date(Date.now() - hours * 60 * 60 * 1000);
        const { block, adminLogs, clientLogs, keyLogs } = await log_repository_1.logRepository.investigateIp(ip, since);
        const adminFailures = adminLogs.filter((l) => !l.success).length;
        const clientFailures = clientLogs.filter((l) => !l.success).length;
        const keyFailures = keyLogs.filter((l) => l.result !== "SUCCESS").length;
        const suspicious = (0, log_analytics_1.aggregateSuspiciousIps)({
            adminFailures: adminLogs.filter((l) => !l.success).map((l) => ({ ipAddress: l.ipAddress, createdAt: l.createdAt })),
            clientFailures: clientLogs.filter((l) => !l.success).map((l) => ({ ipAddress: l.ipAddress, createdAt: l.createdAt })),
            invalidKeyByIp: keyLogs
                .filter((l) => l.result !== "SUCCESS")
                .reduce((acc, row) => {
                const existing = acc.find((a) => a.ipAddress === row.ipAddress);
                if (existing)
                    existing._count++;
                else
                    acc.push({ ipAddress: row.ipAddress, _count: 1 });
                return acc;
            }, []),
        });
        const usernameMap = new Map();
        for (const row of [...adminLogs, ...clientLogs]) {
            const key = row.usernameAttempted;
            const entry = usernameMap.get(key) ?? { attempts: 0, failures: 0 };
            entry.attempts++;
            if (!row.success)
                entry.failures++;
            usernameMap.set(key, entry);
        }
        const reasonMap = new Map();
        for (const row of [...adminLogs, ...clientLogs].filter((l) => !l.success && l.reason)) {
            reasonMap.set(row.reason, (reasonMap.get(row.reason) ?? 0) + 1);
        }
        for (const row of keyLogs.filter((l) => l.result !== "SUCCESS")) {
            reasonMap.set(row.result, (reasonMap.get(row.result) ?? 0) + 1);
        }
        const recentEvents = [
            ...adminLogs.map((r) => (0, log_formatters_1.buildAdminAccessEntry)(r)),
            ...clientLogs.map((r) => (0, log_formatters_1.buildClientAccessEntry)(r)),
            ...keyLogs.map((r) => (0, log_formatters_1.buildKeyUsageEntry)({ ...r, key: r.key })),
        ]
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .slice(0, 50);
        return {
            ip: ip.trim(),
            blocked: Boolean(block),
            blockedUntil: block?.expiresAt?.toISOString() ?? null,
            blockReason: block?.reason ?? null,
            riskScore: suspicious.find((s) => s.ip.includes(ip.trim()))?.riskScore ?? 0,
            totals: {
                adminAttempts: adminLogs.length,
                adminFailures,
                clientAttempts: clientLogs.length,
                clientFailures,
                keyAttempts: keyLogs.length,
                keyFailures,
            },
            recentEvents,
            topUsernames: Array.from(usernameMap.entries())
                .map(([username, stats]) => ({ username, ...stats }))
                .sort((a, b) => b.failures - a.failures)
                .slice(0, 10),
            topReasons: Array.from(reasonMap.entries())
                .map(([reason, count]) => ({ reason, label: (0, log_formatters_1.reasonLabel)(reason), count }))
                .sort((a, b) => b.count - a.count)
                .slice(0, 10),
        };
    },
    async getClientAudit(username, params) {
        const hours = params.hours ?? 168;
        const since = new Date(Date.now() - hours * 60 * 60 * 1000);
        const audit = await log_repository_1.logRepository.getClientAuditData(username, since, params.page, params.limit);
        const successCount = audit.statsRows.find((r) => r.success)?._count ?? 0;
        const failedCount = audit.statsRows.find((r) => !r.success)?._count ?? 0;
        return {
            username,
            clientId: audit.client?.id ?? null,
            isBanned: audit.client?.isBanned ?? false,
            hwid: audit.client?.hwid ?? null,
            hwidMasked: (0, log_formatters_1.maskHwid)(audit.client?.hwid) ?? null,
            productName: audit.client?.key.product.name ?? null,
            expiresAt: audit.client?.expiresAt.toISOString() ?? null,
            loginCount: audit.client?.loginCount ?? 0,
            lastLoginAt: audit.client?.lastLoginAt?.toISOString() ?? null,
            stats: {
                totalAttempts: successCount + failedCount,
                successCount,
                failedCount,
                uniqueIps: audit.uniqueIpCount,
                lastFailureAt: audit.lastFailure?.createdAt.toISOString() ?? null,
                lastSuccessAt: audit.lastSuccess?.createdAt.toISOString() ?? null,
            },
            logs: audit.logs.map(log_formatters_1.buildClientAccessEntry),
            pagination: {
                page: params.page,
                limit: params.limit,
                total: audit.total,
                totalPages: Math.ceil(audit.total / params.limit) || 1,
            },
        };
    },
    async getClientAccessLogs(params) {
        const since = params.hours ? new Date(Date.now() - params.hours * 60 * 60 * 1000) : undefined;
        return log_repository_1.logRepository.findClientAccessLogs({ ...params, since });
    },
};
//# sourceMappingURL=log.service.js.map