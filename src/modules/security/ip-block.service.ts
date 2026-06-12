import prisma from "../../prisma/client";
import { env } from "../../config/env";
import { AppError } from "../../utils/AppError";
import { logger } from "../../utils/logger";
import { normalizeIp } from "../../utils/client-ip";
import { dispatchImmediateAlert } from "../notifications/discord.dispatcher";

type BlockSource = "ADMIN_LOGIN" | "CLIENT_LOGIN" | "KEY_SCANNING";

interface BlockCacheEntry {
  blocked: boolean;
  expiresAt: number;
}

const blockCache = new Map<string, BlockCacheEntry>();
const CACHE_TTL_MS = 30_000;

function cacheKey(ip: string): string {
  return normalizeIp(ip);
}

function readCache(ip: string): boolean | null {
  const entry = blockCache.get(cacheKey(ip));
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    blockCache.delete(cacheKey(ip));
    return null;
  }
  return entry.blocked;
}

function writeCache(ip: string, blocked: boolean): void {
  blockCache.set(cacheKey(ip), { blocked, expiresAt: Date.now() + CACHE_TTL_MS });
}

function invalidateCache(ip: string): void {
  blockCache.delete(cacheKey(ip));
}

async function findActiveBlock(ip: string) {
  const normalized = normalizeIp(ip);
  if (normalized === "unknown") return null;

  const now = new Date();
  return prisma.blockedIp.findFirst({
    where: {
      ipAddress: normalized,
      OR: [{ expiresAt: null }, { expiresAt: { gt: now } }],
    },
  });
}

export async function isIpBlocked(ip: string): Promise<boolean> {
  const cached = readCache(ip);
  if (cached !== null) return cached;

  const row = await findActiveBlock(ip);
  const blocked = Boolean(row);
  writeCache(ip, blocked);
  return blocked;
}

export async function assertIpNotBlocked(ip: string): Promise<void> {
  if (await isIpBlocked(ip)) {
    throw new AppError(
      "Acesso temporariamente bloqueado por atividade suspeita",
      403,
      "IP_BLOCKED"
    );
  }
}

async function upsertBlock(
  ip: string,
  reason: string,
  durationMs: number,
  source: BlockSource
): Promise<void> {
  const normalized = normalizeIp(ip);
  if (normalized === "unknown") return;

  const expiresAt = new Date(Date.now() + durationMs);

  await prisma.blockedIp.upsert({
    where: { ipAddress: normalized },
    create: {
      ipAddress: normalized,
      reason,
      source,
      expiresAt,
    },
    update: {
      reason,
      source,
      blockedAt: new Date(),
      expiresAt,
    },
  });

  invalidateCache(normalized);
  logger.warn("IP bloqueado automaticamente", { ip: normalized, reason, source, expiresAt });

  void dispatchImmediateAlert({
    type: "BRUTE_FORCE_IP",
    severity: "HIGH",
    message: `IP ${normalized} bloqueado: ${reason}`,
    ip: normalized,
    detectedAt: new Date().toISOString(),
  });
}

async function countAdminFailures(ip: string, since: Date): Promise<number> {
  return prisma.accessLog.count({
    where: { ipAddress: normalizeIp(ip), success: false, createdAt: { gte: since } },
  });
}

async function countClientFailures(ip: string, since: Date): Promise<number> {
  return prisma.clientAccessLog.count({
    where: { ipAddress: normalizeIp(ip), success: false, createdAt: { gte: since } },
  });
}

async function countInvalidKeys(ip: string, since: Date): Promise<number> {
  return prisma.keyUsageLog.count({
    where: {
      ipAddress: normalizeIp(ip),
      result: { not: "SUCCESS" },
      attemptedAt: { gte: since },
    },
  });
}

export async function evaluateAutoBlock(ip: string, source: BlockSource): Promise<void> {
  if (normalizeIp(ip) === "unknown") return;
  if (await isIpBlocked(ip)) return;

  const since = new Date(Date.now() - env.SECURITY_WINDOW_MS);
  let failures = 0;
  let threshold = 0;
  let durationMs = env.IP_BLOCK_DURATION_MS;
  let reason = "";

  switch (source) {
    case "ADMIN_LOGIN":
      failures = await countAdminFailures(ip, since);
      threshold = env.ADMIN_LOGIN_BLOCK_THRESHOLD;
      reason = `${failures} falhas de login admin em ${env.SECURITY_WINDOW_MS / 60000} min`;
      break;
    case "CLIENT_LOGIN":
      failures = await countClientFailures(ip, since);
      threshold = env.CLIENT_LOGIN_BLOCK_THRESHOLD;
      reason = `${failures} falhas de login cliente em ${env.SECURITY_WINDOW_MS / 60000} min`;
      break;
    case "KEY_SCANNING":
      failures = await countInvalidKeys(ip, since);
      threshold = env.KEY_SCAN_BLOCK_THRESHOLD;
      durationMs = env.KEY_SCAN_BLOCK_DURATION_MS;
      reason = `${failures} keys inválidas testadas em ${env.SECURITY_WINDOW_MS / 60000} min`;
      break;
  }

  if (failures >= threshold) {
    await upsertBlock(ip, reason, durationMs, source);
  }
}

export async function cleanupExpiredIpBlocks(): Promise<number> {
  const result = await prisma.blockedIp.deleteMany({
    where: {
      expiresAt: { not: null, lt: new Date() },
    },
  });

  if (result.count > 0) {
    blockCache.clear();
    logger.info("IPs bloqueados expirados removidos", { count: result.count });
  }

  return result.count;
}
