import { env } from "../../config/env";
import { findNotificationSettings } from "./notification-settings.repository";
import { isValidDiscordWebhookUrl } from "./discord.validation";

export type ResolvedNotificationDeliveryConfig = {
  webhookUrl: string;
  alertsEnabled: boolean;
  notifyBruteForce: boolean;
  notifyKeyScanning: boolean;
  notifyHighThreat: boolean;
  /** webhook válido + alertas ligados — pronto para enviar ao Discord */
  configured: boolean;
};

export async function resolveNotificationDeliveryConfig(): Promise<ResolvedNotificationDeliveryConfig> {
  const row = await findNotificationSettings();

  const webhookUrl = (row?.discordWebhookUrl?.trim() || env.DISCORD_WEBHOOK_URL.trim() || "").trim();

  const alertsEnabled = row ? row.discordAlertsEnabled : env.DISCORD_ALERTS_ENABLED;
  const notifyBruteForce = row ? row.discordNotifyBruteForce : env.DISCORD_NOTIFY_BRUTE_FORCE;
  const notifyKeyScanning = row ? row.discordNotifyKeyScanning : env.DISCORD_NOTIFY_KEY_SCANNING;
  const notifyHighThreat = row ? row.discordNotifyHighThreat : env.DISCORD_NOTIFY_HIGH_THREAT;

  const configured = alertsEnabled && Boolean(webhookUrl) && isValidDiscordWebhookUrl(webhookUrl);

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
export function maskWebhookPreview(url: string): string {
  const t = url.trim();
  if (t.length < 12) {
    return "••••";
  }
  return `••••••${t.slice(-8)}`;
}
