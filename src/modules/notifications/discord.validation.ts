/** Valida prefixo de URL de webhook do Discord */
export function isValidDiscordWebhookUrl(url: string): boolean {
  const prefix = "https://discord.com/api/webhooks/";
  const u = url.trim();
  return u.startsWith(prefix) && u.length > prefix.length + 20;
}
