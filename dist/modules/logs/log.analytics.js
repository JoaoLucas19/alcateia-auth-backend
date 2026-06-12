"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reasonLabel = void 0;
exports.buildTimeline24h = buildTimeline24h;
exports.aggregateSuspiciousIps = aggregateSuspiciousIps;
exports.detectSecurityAlerts = detectSecurityAlerts;
exports.computeThreatLevel = computeThreatLevel;
const log_formatters_1 = require("./log.formatters");
Object.defineProperty(exports, "reasonLabel", { enumerable: true, get: function () { return log_formatters_1.reasonLabel; } });
const BRUTE_FORCE_IP_THRESHOLD = 8;
const BRUTE_FORCE_USERNAME_THRESHOLD = 10;
const HIGH_FAILURE_RATE_THRESHOLD = 0.35;
const KEY_SCANNING_THRESHOLD = 15;
function buildTimeline24h(adminLogs, clientLogs, keyLogs) {
    const buckets = new Map();
    const ensure = (date) => {
        const d = new Date(date);
        d.setMinutes(0, 0, 0);
        const key = d.toISOString();
        if (!buckets.has(key)) {
            buckets.set(key, {
                hour: key,
                adminSuccess: 0,
                adminFailed: 0,
                clientSuccess: 0,
                clientFailed: 0,
                keyInvalid: 0,
            });
        }
        return buckets.get(key);
    };
    for (const log of adminLogs) {
        const b = ensure(log.createdAt);
        if (log.success)
            b.adminSuccess++;
        else
            b.adminFailed++;
    }
    for (const log of clientLogs) {
        const b = ensure(log.createdAt);
        if (log.success)
            b.clientSuccess++;
        else
            b.clientFailed++;
    }
    for (const log of keyLogs) {
        if (log.result === "SUCCESS")
            continue;
        const b = ensure(log.attemptedAt);
        b.keyInvalid++;
    }
    const since = Date.now() - 24 * 60 * 60 * 1000;
    return Array.from(buckets.values())
        .filter((b) => new Date(b.hour).getTime() >= since)
        .sort((a, b) => a.hour.localeCompare(b.hour));
}
function aggregateSuspiciousIps(input) {
    const map = new Map();
    const touch = (ip, at) => {
        if (!map.has(ip)) {
            map.set(ip, { adminFailures: 0, clientFailures: 0, invalidKeys: 0, lastSeen: at });
        }
        const entry = map.get(ip);
        if (at > entry.lastSeen)
            entry.lastSeen = at;
    };
    for (const row of input.adminFailures) {
        touch(row.ipAddress, row.createdAt);
        map.get(row.ipAddress).adminFailures++;
    }
    for (const row of input.clientFailures) {
        touch(row.ipAddress, row.createdAt);
        map.get(row.ipAddress).clientFailures++;
    }
    for (const row of input.invalidKeyByIp) {
        if (!map.has(row.ipAddress)) {
            map.set(row.ipAddress, {
                adminFailures: 0,
                clientFailures: 0,
                invalidKeys: 0,
                lastSeen: new Date(),
            });
        }
        map.get(row.ipAddress).invalidKeys = row._count;
    }
    return Array.from(map.entries())
        .map(([ip, agg]) => {
        const total = agg.adminFailures + agg.clientFailures + agg.invalidKeys;
        const riskScore = Math.min(100, agg.adminFailures * 12 +
            agg.clientFailures * 6 +
            agg.invalidKeys * 4 +
            (total >= BRUTE_FORCE_IP_THRESHOLD ? 20 : 0));
        return {
            ip,
            riskScore,
            adminFailures24h: agg.adminFailures,
            clientFailures24h: agg.clientFailures,
            invalidKeyAttempts24h: agg.invalidKeys,
            totalAttempts24h: total,
            lastSeenAt: agg.lastSeen.toISOString(),
        };
    })
        .filter((e) => e.totalAttempts24h > 0)
        .sort((a, b) => b.riskScore - a.riskScore)
        .slice(0, 15);
}
function detectSecurityAlerts(input) {
    const alerts = [];
    const now = new Date().toISOString();
    for (const row of input.adminFailuresByIp) {
        if (row._count >= BRUTE_FORCE_IP_THRESHOLD) {
            alerts.push({
                type: "BRUTE_FORCE_IP",
                severity: row._count >= BRUTE_FORCE_IP_THRESHOLD * 2 ? "CRITICAL" : "HIGH",
                message: `IP ${row.ipAddress} com ${row._count} tentativas falhas de login admin em 24h`,
                ip: row.ipAddress,
                count: row._count,
                detectedAt: now,
            });
        }
    }
    for (const row of input.adminFailuresByUsername) {
        if (row._count >= BRUTE_FORCE_USERNAME_THRESHOLD) {
            alerts.push({
                type: "BRUTE_FORCE_USERNAME",
                severity: "HIGH",
                message: `Usuário "${row.usernameAttempted}" alvo de ${row._count} tentativas falhas em 24h`,
                username: row.usernameAttempted,
                count: row._count,
                detectedAt: now,
            });
        }
    }
    if (input.adminTotal24h > 0) {
        const rate = input.adminFailed24h / input.adminTotal24h;
        if (rate >= HIGH_FAILURE_RATE_THRESHOLD && input.adminFailed24h >= 5) {
            alerts.push({
                type: "HIGH_FAILURE_RATE",
                severity: rate >= 0.6 ? "CRITICAL" : "HIGH",
                message: `Taxa de falha admin de ${(rate * 100).toFixed(1)}% nas últimas 24h`,
                count: input.adminFailed24h,
                detectedAt: now,
            });
        }
    }
    for (const row of input.invalidKeyByIp) {
        if (row._count >= KEY_SCANNING_THRESHOLD) {
            alerts.push({
                type: "KEY_SCANNING",
                severity: row._count >= KEY_SCANNING_THRESHOLD * 2 ? "HIGH" : "MEDIUM",
                message: `IP ${row.ipAddress} testou ${row._count} keys inválidas em 24h`,
                ip: row.ipAddress,
                count: row._count,
                detectedAt: now,
            });
        }
    }
    if (input.adminFailuresLastHour >= 5) {
        alerts.push({
            type: "SPIKE_FAILURES",
            severity: input.adminFailuresLastHour >= 15 ? "CRITICAL" : "MEDIUM",
            message: `${input.adminFailuresLastHour} falhas de login admin na última hora`,
            count: input.adminFailuresLastHour,
            detectedAt: now,
        });
    }
    for (const row of input.clientFailuresByIp ?? []) {
        if (row._count >= BRUTE_FORCE_IP_THRESHOLD) {
            alerts.push({
                type: "CLIENT_LOGIN_FAILED",
                severity: row._count >= BRUTE_FORCE_IP_THRESHOLD * 2 ? "HIGH" : "MEDIUM",
                message: `IP ${row.ipAddress} com ${row._count} falhas de login cliente em 24h`,
                ip: row.ipAddress,
                count: row._count,
                detectedAt: now,
            });
        }
    }
    if ((input.clientFailed24h ?? 0) >= 20) {
        alerts.push({
            type: "CLIENT_LOGIN_FAILED",
            severity: "MEDIUM",
            message: `${input.clientFailed24h} falhas de login cliente nas últimas 24h`,
            count: input.clientFailed24h,
            detectedAt: now,
        });
    }
    return alerts.sort((a, b) => severityWeight(b.severity) - severityWeight(a.severity));
}
function severityWeight(level) {
    switch (level) {
        case "CRITICAL":
            return 4;
        case "HIGH":
            return 3;
        case "MEDIUM":
            return 2;
        default:
            return 1;
    }
}
function computeThreatLevel(alerts, suspiciousIps) {
    let score = 0;
    for (const alert of alerts) {
        score += severityWeight(alert.severity) * 8;
    }
    const topIp = suspiciousIps[0];
    if (topIp) {
        score += Math.min(40, topIp.riskScore * 0.4);
    }
    score = Math.min(100, Math.round(score));
    let level = "LOW";
    if (score >= 76)
        level = "CRITICAL";
    else if (score >= 51)
        level = "HIGH";
    else if (score >= 26)
        level = "MEDIUM";
    return { level, score };
}
// reasonLabel re-exported from log.formatters above
//# sourceMappingURL=log.analytics.js.map