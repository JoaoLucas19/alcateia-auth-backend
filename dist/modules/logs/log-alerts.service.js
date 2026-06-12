"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyAdminLoginFailed = notifyAdminLoginFailed;
exports.notifyClientLoginFailed = notifyClientLoginFailed;
exports.notifyIpBlocked = notifyIpBlocked;
exports.notifyKeyScanning = notifyKeyScanning;
exports.notifyAdminLoginSuccess = notifyAdminLoginSuccess;
exports.notifyAdminLogout = notifyAdminLogout;
const discord_dispatcher_1 = require("../notifications/discord.dispatcher");
const discord_service_1 = require("../notifications/discord.service");
const env_1 = require("../../config/env");
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
const authSessionCooldown = new Map();
const AUTH_SESSION_COOLDOWN_MS = 60000;
function authSessionKey(event, username) {
    return `${event}|${username}`;
}
async function notifyAdminLoginSuccess(params) {
    if (!env_1.env.DISCORD_NOTIFY_AUTH_SESSIONS)
        return;
    const key = authSessionKey("LOGIN", params.username);
    const until = authSessionCooldown.get(key);
    if (until && Date.now() < until)
        return;
    const sent = await (0, discord_service_1.sendAuthSessionNotification)({
        event: "LOGIN",
        username: params.username,
        ip: params.ip,
    });
    if (sent) {
        authSessionCooldown.set(key, Date.now() + AUTH_SESSION_COOLDOWN_MS);
    }
}
async function notifyAdminLogout(params) {
    if (!env_1.env.DISCORD_NOTIFY_AUTH_SESSIONS)
        return;
    const key = authSessionKey("LOGOUT", params.username);
    const until = authSessionCooldown.get(key);
    if (until && Date.now() < until)
        return;
    const sent = await (0, discord_service_1.sendAuthSessionNotification)({
        event: "LOGOUT",
        username: params.username,
        ip: params.ip,
    });
    if (sent) {
        authSessionCooldown.set(key, Date.now() + AUTH_SESSION_COOLDOWN_MS);
    }
}
//# sourceMappingURL=log-alerts.service.js.map