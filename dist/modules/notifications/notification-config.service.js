"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveNotificationDeliveryConfig = resolveNotificationDeliveryConfig;
exports.maskWebhookPreview = maskWebhookPreview;
const env_1 = require("../../config/env");
const notification_settings_repository_1 = require("./notification-settings.repository");
const discord_validation_1 = require("./discord.validation");
async function resolveNotificationDeliveryConfig() {
    const row = await (0, notification_settings_repository_1.findNotificationSettings)();
    const webhookUrl = (row?.discordWebhookUrl?.trim() || env_1.env.DISCORD_WEBHOOK_URL.trim() || "").trim();
    const alertsEnabled = row ? row.discordAlertsEnabled : env_1.env.DISCORD_ALERTS_ENABLED;
    const notifyBruteForce = row ? row.discordNotifyBruteForce : env_1.env.DISCORD_NOTIFY_BRUTE_FORCE;
    const notifyKeyScanning = row ? row.discordNotifyKeyScanning : env_1.env.DISCORD_NOTIFY_KEY_SCANNING;
    const notifyHighThreat = row ? row.discordNotifyHighThreat : env_1.env.DISCORD_NOTIFY_HIGH_THREAT;
    const configured = alertsEnabled && Boolean(webhookUrl) && (0, discord_validation_1.isValidDiscordWebhookUrl)(webhookUrl);
    return {
        webhookUrl,
        alertsEnabled,
        notifyBruteForce,
        notifyKeyScanning,
        notifyHighThreat,
        configured,
    };
}
/** Mascarar URL para GET (nunca retornar webhook completo) */
function maskWebhookPreview(url) {
    const t = url.trim();
    if (t.length < 12) {
        return "••••";
    }
    return `••••••${t.slice(-8)}`;
}
//# sourceMappingURL=notification-config.service.js.map