import { env } from "../../config/env";
import { logger } from "../../utils/logger";
import { logService } from "../logs/log.service";
import { dispatchSecurityAlerts } from "./discord.dispatcher";
import { isDiscordConfigured } from "./discord.service";

let pollerStarted = false;
let pollInFlight = false;

async function runPoll(): Promise<void> {
  if (pollInFlight) return;
  if (!(await isDiscordConfigured())) return;

  pollInFlight = true;
  try {
    const evaluation = await logService.evaluateSecurity();
    await dispatchSecurityAlerts(evaluation.alerts, {
      threatLevel: evaluation.threatLevel,
      threatScore: evaluation.threatScore,
    });
  } catch (err) {
    logger.error("Discord poller falhou", {
      error: err instanceof Error ? err.message : String(err),
    });
  } finally {
    pollInFlight = false;
  }
}

async function logPollerBootStatus(): Promise<void> {
  if (await isDiscordConfigured()) {
    logger.info("Discord alerts: poller ativo", {
      intervalMs: env.DISCORD_ALERT_POLL_MS,
    });
  } else {
    logger.info(
      "Discord alerts: desativado (configure DISCORD_WEBHOOK_URL no servidor ou URL no painel + alertas ligados)"
    );
  }
}

export function startDiscordAlertPoller(): void {
  if (pollerStarted) return;
  pollerStarted = true;

  logger.info("Discord alerts: poller agendado", {
    intervalMs: env.DISCORD_ALERT_POLL_MS,
  });

  setTimeout(() => {
    logPollerBootStatus().catch(() => undefined);
    runPoll().catch(() => undefined);
  }, 45_000);

  setInterval(() => {
    runPoll().catch(() => undefined);
  }, env.DISCORD_ALERT_POLL_MS);
}
