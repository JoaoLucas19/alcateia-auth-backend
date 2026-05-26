import { env } from "../../config/env";
import { logger } from "../../utils/logger";
import type { SecurityAlert, ThreatLevel } from "../logs/log.types";

const DISCORD_WEBHOOK_PREFIX = "https://discord.com/api/webhooks/";

function severityColor(severity: ThreatLevel): number {
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

function isValidWebhookUrl(url: string): boolean {
  return url.startsWith(DISCORD_WEBHOOK_PREFIX) && url.length > DISCORD_WEBHOOK_PREFIX.length + 20;
}

export function isDiscordConfigured(): boolean {
  return env.DISCORD_ALERTS_ENABLED && Boolean(env.DISCORD_WEBHOOK_URL) && isValidWebhookUrl(env.DISCORD_WEBHOOK_URL!);
}

export async function sendDiscordMessage(payload: {
  content?: string;
  embeds?: Array<{
    title: string;
    description: string;
    color: number;
    fields?: Array<{ name: string; value: string; inline?: boolean }>;
    timestamp?: string;
  }>;
}): Promise<boolean> {
  const webhookUrl = env.DISCORD_WEBHOOK_URL;
  if (!isDiscordConfigured() || !webhookUrl) return false;

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const body = await res.text().catch(() => "");
      logger.warn("Discord webhook falhou", { status: res.status, body: body.slice(0, 200) });
      return false;
    }

    return true;
  } catch (err) {
    logger.warn("Discord webhook erro de rede", { error: err instanceof Error ? err.message : String(err) });
    return false;
  }
}

export async function sendSecurityAlert(alert: SecurityAlert): Promise<boolean> {
  const fields: Array<{ name: string; value: string; inline?: boolean }> = [];

  if (alert.ip) fields.push({ name: "IP", value: alert.ip, inline: true });
  if (alert.username) fields.push({ name: "Usuário", value: alert.username, inline: true });
  if (alert.count != null) fields.push({ name: "Contagem", value: String(alert.count), inline: true });

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

export async function sendSecuritySummary(payload: {
  threatLevel: ThreatLevel;
  threatScore: number;
  alertCount: number;
  topAlerts: SecurityAlert[];
}): Promise<boolean> {
  const lines =
    payload.topAlerts.length > 0
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

export async function sendDiscordTest(): Promise<boolean> {
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
