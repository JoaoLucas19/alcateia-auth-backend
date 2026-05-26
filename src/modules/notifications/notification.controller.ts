import { Request, Response, NextFunction } from "express";
import { isDiscordConfigured, sendDiscordTest } from "./discord.service";
import { dispatchImmediateAlert } from "./discord.dispatcher";
import type { SecurityAlert } from "../logs/log.types";

export async function testDiscord(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    if (!isDiscordConfigured()) {
      res.status(400).json({
        success: false,
        message: "DISCORD_WEBHOOK_URL não configurado ou alertas desativados",
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
