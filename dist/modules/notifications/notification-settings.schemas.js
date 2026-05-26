"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotificationSettingsSchema = void 0;
const zod_1 = require("zod");
const discord_validation_1 = require("./discord.validation");
exports.updateNotificationSettingsSchema = zod_1.z
    .object({
    discordWebhookUrl: zod_1.z.string().max(4096).optional(),
    discordAlertsEnabled: zod_1.z.boolean().optional(),
    discordNotifyBruteForce: zod_1.z.boolean().optional(),
    discordNotifyKeyScanning: zod_1.z.boolean().optional(),
    discordNotifyHighThreat: zod_1.z.boolean().optional(),
})
    .strict()
    .superRefine((data, ctx) => {
    if (data.discordWebhookUrl === undefined)
        return;
    const trimmed = data.discordWebhookUrl.trim();
    if (trimmed === "")
        return;
    if (!(0, discord_validation_1.isValidDiscordWebhookUrl)(trimmed)) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "URL inválida (use https://discord.com/api/webhooks/…)",
            path: ["discordWebhookUrl"],
        });
    }
});
//# sourceMappingURL=notification-settings.schemas.js.map