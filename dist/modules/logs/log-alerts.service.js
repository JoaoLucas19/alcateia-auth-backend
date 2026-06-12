"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAdminLoginFailed = notifyAdminLoginFailed;
exports.notifyClientLoginFailed = notifyClientLoginFailed;
exports.notifyIpBlocked = notifyIpBlocked;
exports.notifyKeyScanning = notifyKeyScanning;
const discord_dispatcher_1 = require("../notifications/discord.dispatcher");
const log_formatters_1 = require("./log.formatters");
const cooldownUntil = new Map();
const IMMEDIATE_COOLDOWN_MS = 5 * 60 * 1000;
function fingerprint(type, ip, username, reason) {
    return [type, ip ?? "", username ?? "", reason ?? ""].join("|");
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
async function notify(alert, cooldownMs = IMMEDIATE_COOLDOWN_MS) {
    const key = fingerprint(alert.type, alert.ip, alert.username, alert.message);
    if (isOnCooldown(key))
        return;
    const sent = await (0, discord_dispatcher_1.dispatchImmediateAlert)(alert, cooldownMs);
    if (sent) {
        cooldownUntil.set(key, Date.now() + cooldownMs);
    }
}
async function notifyAdminLoginFailed(params) {
    const severity = params.reason === "USER_NOT_FOUND" ? "MEDIUM" : params.attemptsFromIp && params.attemptsFromIp >= 3 ? "HIGH" : "MEDIUM";
    await notify({
        type: "ADMIN_LOGIN_FAILED",
        severity,
        message: `Falha de login admin: ${(0, log_formatters_1.reasonLabel)(params.reason)} — usuário "${params.username}"`,
        ip: params.ip,
        username: params.username,
        count: params.attemptsFromIp,
        detectedAt: new Date().toISOString(),
    });
}
async function notifyClientLoginFailed(params) {
    const highRisk = ["HWID_MISMATCH", "HWID_BANNED", "USER_BANNED", "KEY_REVOKED"].includes(params.reason);
    const severity = highRisk ? "HIGH" : params.attemptsFromIp && params.attemptsFromIp >= 5 ? "HIGH" : "MEDIUM";
    if (params.reason === "HWID_MISMATCH") {
        await notify({
            type: "HWID_MISMATCH",
            severity: "HIGH",
            message: `HWID não autorizado — cliente "${params.username}" (${params.action})`,
            ip: params.ip,
            username: params.username,
            detectedAt: new Date().toISOString(),
        }, 10 * 60 * 1000);
        return;
    }
    await notify({
        type: "CLIENT_LOGIN_FAILED",
        severity,
        message: `Falha de ${params.action === "REGISTER" ? "cadastro" : "login"} cliente: ${(0, log_formatters_1.reasonLabel)(params.reason)} — "${params.username}"`,
        ip: params.ip,
        username: params.username,
        count: params.attemptsFromIp,
        detectedAt: new Date().toISOString(),
    });
}
async function notifyIpBlocked(params) {
    await notify({
        type: "IP_BLOCKED",
        severity: "HIGH",
        message: `IP ${params.ip} bloqueado (${params.source}): ${params.reason}`,
        ip: params.ip,
        detectedAt: new Date().toISOString(),
    }, 15 * 60 * 1000);
}
async function notifyKeyScanning(params) {
    if (params.invalidAttempts < 5)
        return;
    await notify({
        type: "KEY_SCANNING",
        severity: params.invalidAttempts >= 15 ? "HIGH" : "MEDIUM",
        message: `IP ${params.ip} testou ${params.invalidAttempts} keys inválidas recentemente`,
        ip: params.ip,
        count: params.invalidAttempts,
        detectedAt: new Date().toISOString(),
    }, 10 * 60 * 1000);
}
//# sourceMappingURL=log-alerts.service.js.map