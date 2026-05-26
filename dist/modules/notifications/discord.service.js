"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDiscordConfigured = isDiscordConfigured;
exports.sendDiscordMessage = sendDiscordMessage;
exports.sendSecurityAlert = sendSecurityAlert;
exports.sendSecuritySummary = sendSecuritySummary;
exports.sendDiscordTest = sendDiscordTest;
const env_1 = require("../../config/env");
const logger_1 = require("../../utils/logger");
const DISCORD_WEBHOOK_PREFIX = "https://discord.com/api/webhooks/";
function severityColor(severity) {
    switch (severity) {
        case "CRITICAL":
            return 0xff2d55;
        case "HIGH":
            return 0xff9f0a;
        case "MEDIUM":
            return 0xffd60a;
        default:
            return 0x34c759;
    }
}
function isValidWebhookUrl(url) {
    return url.startsWith(DISCORD_WEBHOOK_PREFIX) && url.length > DISCORD_WEBHOOK_PREFIX.length + 20;
}
function isDiscordConfigured() {
    return env_1.env.DISCORD_ALERTS_ENABLED && Boolean(env_1.env.DISCORD_WEBHOOK_URL) && isValidWebhookUrl(env_1.env.DISCORD_WEBHOOK_URL);
}
async function sendDiscordMessage(payload) {
    const webhookUrl = env_1.env.DISCORD_WEBHOOK_URL;
    if (!isDiscordConfigured() || !webhookUrl)
        return false;
    try {
        const res = await fetch(webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!res.ok) {
            const body = await res.text().catch(() => "");
            logger_1.logger.warn("Discord webhook falhou", { status: res.status, body: body.slice(0, 200) });
            return false;
        }
        return true;
    }
    catch (err) {
        logger_1.logger.warn("Discord webhook erro de rede", { error: err instanceof Error ? err.message : String(err) });
        return false;
    }
}
async function sendSecurityAlert(alert) {
    const fields = [];
    if (alert.ip)
        fields.push({ name: "IP", value: alert.ip, inline: true });
    if (alert.username)
        fields.push({ name: "Usuário", value: alert.username, inline: true });
    if (alert.count != null)
        fields.push({ name: "Contagem", value: String(alert.count), inline: true });
    return sendDiscordMessage({
        content: "🚨 **Alcateia Auth** — Alerta de segurança",
        embeds: [
            {
                title: alert.type.replace(/_/g, " "),
                description: alert.message,
                color: severityColor(alert.severity),
                fields: fields.length ? fields : undefined,
                timestamp: alert.detectedAt || new Date().toISOString(),
            },
        ],
    });
}
async function sendSecuritySummary(payload) {
    const lines = payload.topAlerts.length > 0
        ? payload.topAlerts.map((a) => `• **${a.type}** (${a.severity}): ${a.message}`).join("\n")
        : "Nenhum alerta ativo.";
    return sendDiscordMessage({
        content: "📊 **Alcateia Auth** — Resumo de segurança",
        embeds: [
            {
                title: `Threat Level: ${payload.threatLevel}`,
                description: lines.slice(0, 3500),
                color: severityColor(payload.threatLevel),
                fields: [
                    { name: "Score", value: String(payload.threatScore), inline: true },
                    { name: "Alertas", value: String(payload.alertCount), inline: true },
                ],
                timestamp: new Date().toISOString(),
            },
        ],
    });
}
async function sendDiscordTest() {
    return sendDiscordMessage({
        content: "✅ **Alcateia Auth** — Teste de webhook",
        embeds: [
            {
                title: "Conexão OK",
                description: "Notificações Discord configuradas com sucesso.",
                color: 0x34c759,
                timestamp: new Date().toISOString(),
            },
        ],
    });
}
//# sourceMappingURL=discord.service.js.map