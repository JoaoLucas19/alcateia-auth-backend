"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NOTIFICATION_SETTINGS_ID = void 0;
exports.findNotificationSettings = findNotificationSettings;
exports.upsertNotificationSettings = upsertNotificationSettings;
const client_1 = __importDefault(require("../../prisma/client"));
exports.NOTIFICATION_SETTINGS_ID = "singleton";
/** Acesso tipado ao delegate (evita erro de IDE quando o Prisma Client ainda não foi gerado) */
function notificationSettings() {
    return client_1.default
        .notificationSettings;
}
async function findNotificationSettings() {
    return notificationSettings().findUnique({
        where: { id: exports.NOTIFICATION_SETTINGS_ID },
    });
}
function buildUpdateData(patch) {
    const data = {};
    if (patch.discordWebhookUrl !== undefined) {
        data.discordWebhookUrl = patch.discordWebhookUrl;
    }
    if (patch.discordAlertsEnabled !== undefined) {
        data.discordAlertsEnabled = patch.discordAlertsEnabled;
    }
    if (patch.discordNotifyBruteForce !== undefined) {
        data.discordNotifyBruteForce = patch.discordNotifyBruteForce;
    }
    if (patch.discordNotifyKeyScanning !== undefined) {
        data.discordNotifyKeyScanning = patch.discordNotifyKeyScanning;
    }
    if (patch.discordNotifyHighThreat !== undefined) {
        data.discordNotifyHighThreat = patch.discordNotifyHighThreat;
    }
    return data;
}
function buildCreateData(patch) {
    return {
        id: exports.NOTIFICATION_SETTINGS_ID,
        discordWebhookUrl: patch.discordWebhookUrl ?? null,
        discordAlertsEnabled: patch.discordAlertsEnabled ?? true,
        discordNotifyBruteForce: patch.discordNotifyBruteForce ?? true,
        discordNotifyKeyScanning: patch.discordNotifyKeyScanning ?? true,
        discordNotifyHighThreat: patch.discordNotifyHighThreat ?? true,
    };
}
async function upsertNotificationSettings(patch) {
    const db = notificationSettings();
    const existing = await findNotificationSettings();
    const updateData = buildUpdateData(patch);
    if (existing) {
        if (Object.keys(updateData).length === 0) {
            return existing;
        }
        return db.update({
            where: { id: exports.NOTIFICATION_SETTINGS_ID },
            data: updateData,
        });
    }
    return db.create({
        data: buildCreateData(patch),
    });
}
//# sourceMappingURL=notification-settings.repository.js.map