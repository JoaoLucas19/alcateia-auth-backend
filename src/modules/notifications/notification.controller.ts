import { Request, Response, NextFunction } from "express";
import { isDiscordConfigured, sendDiscordTest } from "./discord.service";
import { dispatchImmediateAlert } from "./discord.dispatcher";
import type { SecurityAlert } from "../logs/log.types";
import { findNotificationSettings, upsertNotificationSettings } from "./notification-settings.repository";
import { maskWebhookPreview, resolveNotificationDeliveryConfig } from "./notification-config.service";

async function buildSettingsResponse(): Promise<{
  discordAlertsEnabled: boolean;
  discordNotifyBruteForce: boolean;
  discordNotifyKeyScanning: boolean;
  discordNotifyHighThreat: boolean;
  webhookConfigured: boolean;
  webhookSource: "database" | "environment" | "none";
  webhookUrlHint: string | null;
}> {
  const row = await findNotificationSettings();
  const effective = await resolveNotificationDeliveryConfig();
  const webhookFromDb = row?.discordWebhookUrl?.trim() ?? "";

  const webhookSource: "database" | "environment" | "none" = !effective.webhookUrl
    ? "none"
    : webhookFromDb
      ? "database"
      : "environment";

  const webhookUrlHint = webhookFromDb ? maskWebhookPreview(webhookFromDb) : null;

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

export async function getNotificationSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const data = await buildSettingsResponse();
    res.status(200).json({ success: true, data });
  } catch (err) {
    next(err);
  }
}

export async function putNotificationSettings(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const patch: Parameters<typeof upsertNotificationSettings>[0] = {};

    if (req.body.discordWebhookUrl !== undefined) {
      const v = req.body.discordWebhookUrl as string;
      patch.discordWebhookUrl = v.trim() === "" ? null : v.trim();
    }
    if (req.body.discordAlertsEnabled !== undefined) {
      patch.discordAlertsEnabled = req.body.discordAlertsEnabled as boolean;
    }
    if (req.body.discordNotifyBruteForce !== undefined) {
      patch.discordNotifyBruteForce = req.body.discordNotifyBruteForce as boolean;
    }
    if (req.body.discordNotifyKeyScanning !== undefined) {
      patch.discordNotifyKeyScanning = req.body.discordNotifyKeyScanning as boolean;
    }
    if (req.body.discordNotifyHighThreat !== undefined) {
      patch.discordNotifyHighThreat = req.body.discordNotifyHighThreat as boolean;
    }

    await upsertNotificationSettings(patch);
    const data = await buildSettingsResponse();

    res.status(200).json({
      success: true,
      message: "Configurações atualizadas",
      data,
    });
  } catch (err) {
    next(err);
  }
}

export async function testDiscord(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!(await isDiscordConfigured())) {
      res.status(400).json({
        success: false,
        message: "Webhook não configurado ou alertas desativados (painel ou variáveis de ambiente)",
      });
      return;
    }

    const ok = await sendDiscordTest();
    res.status(ok ? 200 : 502).json({
      success: ok,
      message: ok ? "Mensagem de teste enviada ao Discord" : "Falha ao enviar para o Discord",
    });
  } catch (err) {
    next(err);
  }
}

export async function sendTestAlert(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const alert: SecurityAlert = {
      type: "SPIKE_FAILURES",
      severity: "MEDIUM",
      message: "Teste manual de alerta de segurança do painel Alcateia Auth",
      detectedAt: new Date().toISOString(),
    };

    const ok = await dispatchImmediateAlert(alert, 0);
    res.status(ok ? 200 : 502).json({
      success: ok,
      message: ok ? "Alerta de teste enviado" : "Falha ao enviar alerta",
    });
  } catch (err) {
    next(err);
  }
}
