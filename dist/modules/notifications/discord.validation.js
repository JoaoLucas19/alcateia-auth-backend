"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDiscordWebhookUrl = isValidDiscordWebhookUrl;
/** Valida prefixo de URL de webhook do Discord */
function isValidDiscordWebhookUrl(url) {
    const prefix = "https://discord.com/api/webhooks/";
    const u = url.trim();
    return u.startsWith(prefix) && u.length > prefix.length + 20;
}
//# sourceMappingURL=discord.validation.js.map