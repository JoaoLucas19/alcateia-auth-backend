"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchSecurityAlerts = dispatchSecurityAlerts;
exports.dispatchImmediateAlert = dispatchImmediateAlert;
const env_1 = require("../../config/env");
const logger_1 = require("../../utils/logger");
const discord_service_1 = require("./discord.service");
const cooldownUntil = new Map();
function alertFingerprint(alert) {
    return [alert.type, alert.ip ?? "", alert.username ?? "", alert.count ?? ""].join("|");
}
function isOnCooldown(key) {
    const until = cooldownUntil.get(key);
    if (!until)
        return false;
    if (Date.now() < until)
        return true;
    cooldownUntil.delete(key);
    return false;
}
function markCooldown(key) {
    cooldownUntil.set(key, Date.now() + env_1.env.DISCORD_ALERT_COOLDOWN_MS);
}
function shouldNotifyType(type) {
    switch (type) {
        case "BRUTE_FORCE_IP":
            return env_1.env.DISCORD_NOTIFY_BRUTE_FORCE;
        case "BRUTE_FORCE_USERNAME":
            return env_1.env.DISCORD_NOTIFY_BRUTE_FORCE;
        case "KEY_SCANNING":
            return env_1.env.DISCORD_NOTIFY_KEY_SCANNING;
        case "HIGH_FAILURE_RATE":
        case "SPIKE_FAILURES":
            return env_1.env.DISCORD_NOTIFY_HIGH_THREAT;
        case "HWID_MISMATCH":
            return env_1.env.DISCORD_NOTIFY_HIGH_THREAT;
        default:
            return env_1.env.DISCORD_NOTIFY_HIGH_THREAT;
    }
}
function shouldNotifySeverity(severity) {
    if (severity === "CRITICAL" || severity === "HIGH")
        return true;
    if (severity === "MEDIUM")
        return env_1.env.DISCORD_NOTIFY_HIGH_THREAT;
    return false;
}
/**
 * Dispara alertas para o Discord com anti-spam (cooldown por fingerprint).
 */
async function dispatchSecurityAlerts(alerts, context) {
    if (!(0, discord_service_1.isDiscordConfigured)()) {
        return { sent: 0, skipped: alerts.length };
    }
    let sent = 0;
    let skipped = 0;
    const eligible = alerts.filter((a) => shouldNotifyType(a.type) && shouldNotifySeverity(a.severity));
    for (const alert of eligible) {
        const key = alertFingerprint(alert);
        if (isOnCooldown(key)) {
            skipped++;
            continue;
        }
        const ok = await (0, discord_service_1.sendSecurityAlert)(alert);
        if (ok) {
            markCooldown(key);
            sent++;
        }
        else {
            skipped++;
        }
    }
    // Resumo quando threat alto e houve alertas (cooldown separado)
    const threatLevel = context?.threatLevel;
    const threatScore = context?.threatScore ?? 0;
    if (threatLevel &&
        (threatLevel === "HIGH" || threatLevel === "CRITICAL") &&
        eligible.length > 0 &&
        env_1.env.DISCORD_NOTIFY_HIGH_THREAT) {
        const summaryKey = `SUMMARY|${threatLevel}|${Math.floor(Date.now() / (env_1.env.DISCORD_ALERT_COOLDOWN_MS * 2))}`;
        if (!isOnCooldown(summaryKey)) {
            const ok = await (0, discord_service_1.sendSecuritySummary)({
                threatLevel,
                threatScore,
                alertCount: eligible.length,
                topAlerts: eligible.slice(0, 5),
            });
            if (ok) {
                markCooldown(summaryKey);
                sent++;
            }
        }
    }
    if (sent > 0) {
        logger_1.logger.info("Discord: alertas enviados", { sent, skipped, threatLevel, threatScore });
    }
    return { sent, skipped };
}
/** Evento imediato (ex.: HWID mismatch) — cooldown mais curto por tipo */
async function dispatchImmediateAlert(alert, cooldownMs = 5 * 60 * 1000) {
    if (!(0, discord_service_1.isDiscordConfigured)())
        return false;
    const key = `IMMEDIATE|${alertFingerprint(alert)}`;
    if (isOnCooldown(key))
        return false;
    const ok = await (0, discord_service_1.sendSecurityAlert)(alert);
    if (ok) {
        cooldownUntil.set(key, Date.now() + cooldownMs);
    }
    return ok;
}
//# sourceMappingURL=discord.dispatcher.js.map