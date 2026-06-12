import { dispatchImmediateAlert } from "../notifications/discord.dispatcher";
import type { SecurityAlert, ThreatLevel } from "./log.types";
import { reasonLabel } from "./log.formatters";

const cooldownUntil = new Map<string, number>();
const IMMEDIATE_COOLDOWN_MS = 5 * 60 * 1000;

function fingerprint(type: string, ip?: string, username?: string, reason?: string): string {
  return [type, ip ?? "", username ?? "", reason ?? ""].join("|");
}

function isOnCooldown(key: string): boolean {
  const until = cooldownUntil.get(key);
  if (!until) return false;
  if (Date.now() < until) return true;
  cooldownUntil.delete(key);
  return false;
}

async function notify(alert: SecurityAlert, cooldownMs = IMMEDIATE_COOLDOWN_MS): Promise<void> {
  const key = fingerprint(alert.type, alert.ip, alert.username, alert.message);
  if (isOnCooldown(key)) return;

  const sent = await dispatchImmediateAlert(alert, cooldownMs);
  if (sent) {
    cooldownUntil.set(key, Date.now() + cooldownMs);
  }
}

export async function notifyAdminLoginFailed(params: {
  username: string;
  ip: string;
  reason: string;
  attemptsFromIp?: number;
}): Promise<void> {
  const severity: ThreatLevel =
    params.reason === "USER_NOT_FOUND" ? "MEDIUM" : params.attemptsFromIp && params.attemptsFromIp >= 3 ? "HIGH" : "MEDIUM";

  await notify({
    type: "ADMIN_LOGIN_FAILED",
    severity,
    message: `Falha de login admin: ${reasonLabel(params.reason)} — usuário "${params.username}"`,
    ip: params.ip,
    username: params.username,
    count: params.attemptsFromIp,
    detectedAt: new Date().toISOString(),
  });
}

export async function notifyClientLoginFailed(params: {
  username: string;
  ip: string;
  reason: string;
  action: "LOGIN" | "REGISTER";
  hwid?: string | null;
  attemptsFromIp?: number;
}): Promise<void> {
  const highRisk = ["HWID_MISMATCH", "HWID_BANNED", "USER_BANNED", "KEY_REVOKED"].includes(params.reason);
  const severity: ThreatLevel = highRisk ? "HIGH" : params.attemptsFromIp && params.attemptsFromIp >= 5 ? "HIGH" : "MEDIUM";

  if (params.reason === "HWID_MISMATCH") {
    await notify(
      {
        type: "HWID_MISMATCH",
        severity: "HIGH",
        message: `HWID não autorizado — cliente "${params.username}" (${params.action})`,
        ip: params.ip,
        username: params.username,
        detectedAt: new Date().toISOString(),
      },
      10 * 60 * 1000
    );
    return;
  }

  await notify({
    type: "CLIENT_LOGIN_FAILED",
    severity,
    message: `Falha de ${params.action === "REGISTER" ? "cadastro" : "login"} cliente: ${reasonLabel(params.reason)} — "${params.username}"`,
    ip: params.ip,
    username: params.username,
    count: params.attemptsFromIp,
    detectedAt: new Date().toISOString(),
  });
}

export async function notifyIpBlocked(params: {
  ip: string;
  reason: string;
  source: string;
}): Promise<void> {
  await notify(
    {
      type: "IP_BLOCKED",
      severity: "HIGH",
      message: `IP ${params.ip} bloqueado (${params.source}): ${params.reason}`,
      ip: params.ip,
      detectedAt: new Date().toISOString(),
    },
    15 * 60 * 1000
  );
}

export async function notifyKeyScanning(params: { ip: string; invalidAttempts: number }): Promise<void> {
  if (params.invalidAttempts < 5) return;

  await notify(
    {
      type: "KEY_SCANNING",
      severity: params.invalidAttempts >= 15 ? "HIGH" : "MEDIUM",
      message: `IP ${params.ip} testou ${params.invalidAttempts} keys inválidas recentemente`,
      ip: params.ip,
      count: params.invalidAttempts,
      detectedAt: new Date().toISOString(),
    },
    10 * 60 * 1000
  );
}
