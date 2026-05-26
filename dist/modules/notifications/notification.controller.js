"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotificationSettings = getNotificationSettings;
exports.putNotificationSettings = putNotificationSettings;
exports.testDiscord = testDiscord;
exports.sendTestAlert = sendTestAlert;
const discord_service_1 = require("./discord.service");
const discord_dispatcher_1 = require("./discord.dispatcher");
const notification_settings_repository_1 = require("./notification-settings.repository");
const notification_config_service_1 = require("./notification-config.service");
async function buildSettingsResponse() {
    const row = await (0, notification_settings_repository_1.findNotificationSettings)();
    const effective = await (0, notification_config_service_1.resolveNotificationDeliveryConfig)();
    const webhookFromDb = row?.discordWebhookUrl?.trim() ?? "";
    const webhookSource = !effective.webhookUrl
        ? "none"
        : webhookFromDb
            ? "database"
            : "environment";
    const webhookUrlHint = webhookFromDb ? (0, notification_config_service_1.maskWebhookPreview)(webhookFromDb) : null;
    return {
        discordAlertsEnabled: effective.alertsEnabled,
        discordNotifyBruteForce: effective.notifyBruteForce,
        discordNotifyKeyScanning: effective.notifyKeyScanning,
        discordNotifyHighThreat: effective.notifyHighThreat,
        webhookConfigured: effective.configured,
        webhookSource,
        webhookUrlHint,
    };
}
async function getNotificationSettings(req, res, next) {
    try {
        const data = await buildSettingsResponse();
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        next(err);
    }
}
async function putNotificationSettings(req, res, next) {
    try {
        const patch = {};
        if (req.body.discordWebhookUrl !== undefined) {
            const v = req.body.discordWebhookUrl;
            patch.discordWebhookUrl = v.trim() === "" ? null : v.trim();
        }
        if (req.body.discordAlertsEnabled !== undefined) {
            patch.discordAlertsEnabled = req.body.discordAlertsEnabled;
        }
        if (req.body.discordNotifyBruteForce !== undefined) {
            patch.discordNotifyBruteForce = req.body.discordNotifyBruteForce;
        }
        if (req.body.discordNotifyKeyScanning !== undefined) {
            patch.discordNotifyKeyScanning = req.body.discordNotifyKeyScanning;
        }
        if (req.body.discordNotifyHighThreat !== undefined) {
            patch.discordNotifyHighThreat = req.body.discordNotifyHighThreat;
        }
        await (0, notification_settings_repository_1.upsertNotificationSettings)(patch);
        const data = await buildSettingsResponse();
        res.status(200).json({
            success: true,
            message: "Configurações atualizadas",
            data,
        });
    }
    catch (err) {
        next(err);
    }
}
async function testDiscord(req, res, next) {
    try {
        if (!(await (0, discord_service_1.isDiscordConfigured)())) {
            res.status(400).json({
                success: false,
                message: "Webhook não configurado ou alertas desativados (painel ou variáveis de ambiente)",
            });
            return;
        }
        const ok = await (0, discord_service_1.sendDiscordTest)();
        res.status(ok ? 200 : 502).json({
            success: ok,
            message: ok ? "Mensagem de teste enviada ao Discord" : "Falha ao enviar para o Discord",
        });
    }
    catch (err) {
        next(err);
    }
}
async function sendTestAlert(req, res, next) {
    try {
        const alert = {
            type: "SPIKE_FAILURES",
            severity: "MEDIUM",
            message: "Teste manual de alerta de segurança do painel Alcateia Auth",
            detectedAt: new Date().toISOString(),
        };
        const ok = await (0, discord_dispatcher_1.dispatchImmediateAlert)(alert, 0);
        res.status(ok ? 200 : 502).json({
            success: ok,
            message: ok ? "Alerta de teste enviado" : "Falha ao enviar alerta",
        });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=notification.controller.js.map