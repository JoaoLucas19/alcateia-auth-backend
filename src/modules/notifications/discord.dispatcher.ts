import { env } from "../../config/env";
import { logger } from "../../utils/logger";
import type { SecurityAlert, ThreatLevel } from "../logs/log.types";
import { resolveNotificationDeliveryConfig } from "./notification-config.service";
import { sendSecurityAlert, sendSecuritySummary } from "./discord.service";

const cooldownUntil = new Map<string, number>();

function alertFingerprint(alert: SecurityAlert): string {
  return [alert.type, alert.ip ?? "", alert.username ?? "", alert.count ?? ""].join("|");
}

function isOnCooldown(key: string): boolean {
  const until = cooldownUntil.get(key);
  if (!until) return false;
  if (Date.now() < until) return true;
  cooldownUntil.delete(key);
  return false;
}

function markCooldown(key: string): void {
  cooldownUntil.set(key, Date.now() + env.DISCORD_ALERT_COOLDOWN_MS);
}

function shouldNotifyType(
  type: SecurityAlert["type"],
  notify: {
    notifyBruteForce: boolean;
    notifyKeyScanning: boolean;
    notifyHighThreat: boolean;
  }
): boolean {
  switch (type) {
    case "BRUTE_FORCE_IP":
      return notify.notifyBruteForce;
    case "BRUTE_FORCE_USERNAME":
      return notify.notifyBruteForce;
    case "KEY_SCANNING":
      return notify.notifyKeyScanning;
    case "HIGH_FAILURE_RATE":
    case "SPIKE_FAILURES":
      return notify.notifyHighThreat;
    case "HWID_MISMATCH":
      return notify.notifyHighThreat;
    case "CLIENT_LOGIN_FAILED":
    case "ADMIN_LOGIN_FAILED":
      return notify.notifyBruteForce;
    case "IP_BLOCKED":
      return notify.notifyHighThreat;
    default:
      return notify.notifyHighThreat;
  }
}

function shouldNotifySeverity(severity: ThreatLevel, notifyHighThreat: boolean): boolean {
  if (severity === "CRITICAL" || severity === "HIGH") return true;
  if (severity === "MEDIUM") return notifyHighThreat;
  return false;
}

/**
 * Dispara alertas para o Discord com anti-spam (cooldown por fingerprint).
 */
export async function dispatchSecurityAlerts(
  alerts: SecurityAlert[],
  context?: { threatLevel?: ThreatLevel; threatScore?: number }
): Promise<{ sent: number; skipped: number }> {
  const cfg = await resolveNotificationDeliveryConfig();
  if (!cfg.configured) {
    return { sent: 0, skipped: alerts.length };
  }

  const notifyPrefs = {
    notifyBruteForce: cfg.notifyBruteForce,
    notifyKeyScanning: cfg.notifyKeyScanning,
    notifyHighThreat: cfg.notifyHighThreat,
  };

  let sent = 0;
  let skipped = 0;

  const eligible = alerts.filter(
    (a) => shouldNotifyType(a.type, notifyPrefs) && shouldNotifySeverity(a.severity, cfg.notifyHighThreat)
  );

  for (const alert of eligible) {
    const key = alertFingerprint(alert);
    if (isOnCooldown(key)) {
      skipped++;
      continue;
    }

    const ok = await sendSecurityAlert(alert);
    if (ok) {
      markCooldown(key);
      sent++;
    } else {
      skipped++;
    }
  }

  // Resumo quando threat alto e houve alertas (cooldown separado)
  const threatLevel = context?.threatLevel;
  const threatScore = context?.threatScore ?? 0;
  if (
    threatLevel &&
    (threatLevel === "HIGH" || threatLevel === "CRITICAL") &&
    eligible.length > 0 &&
    cfg.notifyHighThreat
  ) {
    const summaryKey = `SUMMARY|${threatLevel}|${Math.floor(Date.now() / (env.DISCORD_ALERT_COOLDOWN_MS * 2))}`;
    if (!isOnCooldown(summaryKey)) {
      const ok = await sendSecuritySummary({
        threatLevel,
        threatScore,
        alertCount: eligible.length,
        topAlerts: eligible.slice(0, 5),
      });
      if (ok) {
        markCooldown(summaryKey);
        sent++;
      }
    }
  }

  if (sent > 0) {
    logger.info("Discord: alertas enviados", { sent, skipped, threatLevel, threatScore });
  }

  return { sent, skipped };
}

/** Evento imediato (ex.: HWID mismatch) — cooldown mais curto por tipo */
export async function dispatchImmediateAlert(
  alert: SecurityAlert,
  cooldownMs = 5 * 60 * 1000
): Promise<boolean> {
  const cfg = await resolveNotificationDeliveryConfig();
  if (!cfg.configured) return false;

  if (
    !shouldNotifyType(alert.type, {
      notifyBruteForce: cfg.notifyBruteForce,
      notifyKeyScanning: cfg.notifyKeyScanning,
      notifyHighThreat: cfg.notifyHighThreat,
    }) ||
    !shouldNotifySeverity(alert.severity, cfg.notifyHighThreat)
  ) {
    return false;
  }

  const key = `IMMEDIATE|${alertFingerprint(alert)}`;
  if (isOnCooldown(key)) return false;

  const ok = await sendSecurityAlert(alert);
  if (ok) {
    cooldownUntil.set(key, Date.now() + cooldownMs);
  }
  return ok;
}
