import prisma from "../../prisma/client";
import type { KeysSummary } from "./log.types";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

function sinceHours(hours: number): Date {
  return new Date(Date.now() - hours * HOUR_MS);
}

function sinceDays(days: number): Date {
  return new Date(Date.now() - days * DAY_MS);
}

function parseKeysSummary(
  rows: { status: string; _count: number }[]
): KeysSummary {
  const map = Object.fromEntries(rows.map((r) => [r.status, r._count]));
  const active = map.ACTIVE ?? 0;
  const used = map.USED ?? 0;
  const expired = map.EXPIRED ?? 0;
  const revoked = map.REVOKED ?? 0;
  return { active, used, expired, revoked, total: active + used + expired + revoked };
}

function loginStatsFromGroup(
  rows: { success: boolean; _count: number }[],
  failed7d: number,
  uniqueFailedIps24h: number
) {
  const success24h = rows.find((r) => r.success)?._count ?? 0;
  const failed24h = rows.find((r) => !r.success)?._count ?? 0;
  const total24h = success24h + failed24h;
  return {
    success24h,
    failed24h,
    total24h,
    failureRate: total24h > 0 ? Math.round((failed24h / total24h) * 1000) / 1000 : 0,
    failed7d,
    uniqueFailedIps24h,
  };
}

export const logRepository = {
  findAccessLogs: async ({
    page,
    limit,
    success,
    ip,
    reason,
    since,
    until,
  }: {
    page: number;
    limit: number;
    success?: boolean;
    ip?: string;
    reason?: string;
    since?: Date;
    until?: Date;
  }) => {
    const where: Record<string, unknown> = {};
    if (success !== undefined) where.success = success;
    if (ip) where.ipAddress = { contains: ip };
    if (reason) where.reason = reason;
    if (since || until) {
      where.createdAt = {
        ...(since ? { gte: since } : {}),
        ...(until ? { lte: until } : {}),
      };
    }

    const [data, total] = await Promise.all([
      prisma.accessLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.accessLog.count({ where }),
    ]);
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  },

  findKeyLogs: async ({
    page,
    limit,
    result,
  }: {
    page: number;
    limit: number;
    result?: string;
  }) => {
    const where = result ? { result: result as never } : {};
    const [data, total] = await Promise.all([
      prisma.keyUsageLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { key: { select: { value: true } } },
        orderBy: { attemptedAt: "desc" },
      }),
      prisma.keyUsageLog.count({ where }),
    ]);
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  },

  findUnifiedFailedLogins: async ({
    page,
    limit,
    source,
    ip,
    since,
  }: {
    page: number;
    limit: number;
    source?: "admin" | "client" | "all";
    ip?: string;
    since?: Date;
  }) => {
    const dateFilter = since ? { gte: since } : undefined;
    const ipFilter = ip ? { contains: ip } : undefined;

    let adminRows: Awaited<ReturnType<typeof prisma.accessLog.findMany>> = [];
    let clientRows: Awaited<ReturnType<typeof prisma.clientAccessLog.findMany>> = [];

    if (source !== "client") {
      adminRows = await prisma.accessLog.findMany({
        where: {
          success: false,
          ...(dateFilter ? { createdAt: dateFilter } : {}),
          ...(ipFilter ? { ipAddress: ipFilter } : {}),
        },
        orderBy: { createdAt: "desc" },
        take: 500,
      });
    }

    if (source !== "admin") {
      try {
        clientRows = await prisma.clientAccessLog.findMany({
          where: {
            success: false,
            ...(dateFilter ? { createdAt: dateFilter } : {}),
            ...(ipFilter ? { ipAddress: ipFilter } : {}),
          },
          orderBy: { createdAt: "desc" },
          take: 500,
        });
      } catch (err) {
        // Tabela ClientAccessLog ausente (migration não aplicada) — não quebra o endpoint
        console.warn("[logs] ClientAccessLog indisponível:", err);
        clientRows = [];
      }
    }

    const merged = [
      ...adminRows.map((r) => ({
        id: r.id,
        source: "admin" as const,
        username: r.usernameAttempted,
        ip: r.ipAddress,
        reason: r.reason ?? "UNKNOWN",
        createdAt: r.createdAt,
      })),
      ...clientRows.map((r) => ({
        id: r.id,
        source: "client" as const,
        username: r.usernameAttempted,
        ip: r.ipAddress,
        reason: r.reason ?? "UNKNOWN",
        action: r.action,
        createdAt: r.createdAt,
      })),
    ].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    const total = merged.length;
    const start = (page - 1) * limit;
    const data = merged.slice(start, start + limit);

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  },

  getDashboardStats: async () => {
    const since24h = sinceHours(24);
    const since7d = sinceDays(7);
    const since1h = sinceHours(1);

    const [
      keysByStatus,
      logins24h,
      validations24h,
      topInvalidIps,
      clientLogins24h,
      clientFailed7d,
      adminFailed7d,
      adminUniqueFailedIps24h,
      clientUniqueFailedIps24h,
      clientsTotal,
      clientsBanned,
      clientsExpired,
      adminFailuresByIp,
      adminFailuresByUsername,
      adminFailuresByReason,
      clientFailuresByReason,
      adminFailuresLastHour,
      adminTimelineRaw,
      clientTimelineRaw,
      keyTimelineRaw,
      adminFailures24hList,
      clientFailures24hList,
      invalidKeyByIpFull,
      recentAdminFailed,
      recentClientFailed,
    ] = await Promise.all([
      prisma.key.groupBy({ by: ["status"], _count: true }),
      prisma.accessLog.groupBy({
        by: ["success"],
        where: { createdAt: { gte: since24h } },
        _count: true,
      }),
      prisma.keyUsageLog.groupBy({
        by: ["result"],
        where: { attemptedAt: { gte: since24h } },
        _count: true,
      }),
      prisma.keyUsageLog.groupBy({
        by: ["ipAddress"],
        where: { result: "INVALID_KEY", attemptedAt: { gte: since24h } },
        _count: true,
        orderBy: { _count: { ipAddress: "desc" } },
        take: 5,
      }),
      prisma.clientAccessLog.groupBy({
        by: ["success"],
        where: { createdAt: { gte: since24h } },
        _count: true,
      }),
      prisma.clientAccessLog.count({
        where: { success: false, createdAt: { gte: since7d } },
      }),
      prisma.accessLog.count({
        where: { success: false, createdAt: { gte: since7d } },
      }),
      prisma.accessLog.groupBy({
        by: ["ipAddress"],
        where: { success: false, createdAt: { gte: since24h } },
        _count: true,
      }),
      prisma.clientAccessLog.groupBy({
        by: ["ipAddress"],
        where: { success: false, createdAt: { gte: since24h } },
        _count: true,
      }),
      prisma.client.count(),
      prisma.client.count({ where: { isBanned: true } }),
      prisma.client.count({ where: { expiresAt: { lt: new Date() }, isBanned: false } }),
      prisma.accessLog.groupBy({
        by: ["ipAddress"],
        where: { success: false, createdAt: { gte: since24h } },
        _count: true,
        orderBy: { _count: { ipAddress: "desc" } },
        take: 10,
      }),
      prisma.accessLog.groupBy({
        by: ["usernameAttempted"],
        where: { success: false, createdAt: { gte: since24h } },
        _count: true,
        orderBy: { _count: { usernameAttempted: "desc" } },
        take: 10,
      }),
      prisma.accessLog.groupBy({
        by: ["reason"],
        where: { success: false, createdAt: { gte: since24h }, reason: { not: null } },
        _count: true,
      }),
      prisma.clientAccessLog.groupBy({
        by: ["reason"],
        where: { success: false, createdAt: { gte: since24h }, reason: { not: null } },
        _count: true,
      }),
      prisma.accessLog.count({
        where: { success: false, createdAt: { gte: since1h } },
      }),
      prisma.accessLog.findMany({
        where: { createdAt: { gte: since24h } },
        select: { createdAt: true, success: true },
      }),
      prisma.clientAccessLog.findMany({
        where: { createdAt: { gte: since24h } },
        select: { createdAt: true, success: true },
      }),
      prisma.keyUsageLog.findMany({
        where: { attemptedAt: { gte: since24h } },
        select: { attemptedAt: true, result: true },
      }),
      prisma.accessLog.findMany({
        where: { success: false, createdAt: { gte: since24h } },
        select: { ipAddress: true, createdAt: true },
      }),
      prisma.clientAccessLog.findMany({
        where: { success: false, createdAt: { gte: since24h } },
        select: { ipAddress: true, createdAt: true },
      }),
      prisma.keyUsageLog.groupBy({
        by: ["ipAddress"],
        where: { result: { not: "SUCCESS" }, attemptedAt: { gte: since24h } },
        _count: true,
        orderBy: { _count: { ipAddress: "desc" } },
        take: 15,
      }),
      prisma.accessLog.findMany({
        where: { success: false },
        orderBy: { createdAt: "desc" },
        take: 25,
      }),
      prisma.clientAccessLog.findMany({
        where: { success: false },
        orderBy: { createdAt: "desc" },
        take: 25,
      }),
    ]);

    return {
      keysByStatus,
      logins24h,
      validations24h,
      topInvalidIps,
      clientLogins24h,
      adminFailed7d,
      clientFailed7d,
      adminUniqueFailedIps24h: adminUniqueFailedIps24h.length,
      clientUniqueFailedIps24h: clientUniqueFailedIps24h.length,
      clientsTotal,
      clientsBanned,
      clientsExpired,
      adminFailuresByIp,
      adminFailuresByUsername,
      adminFailuresByReason,
      clientFailuresByReason,
      adminFailuresLastHour,
      adminTimelineRaw,
      clientTimelineRaw,
      keyTimelineRaw: keyTimelineRaw.map((k) => ({
        attemptedAt: k.attemptedAt,
        result: k.result,
      })),
      adminFailures24hList,
      clientFailures24hList,
      invalidKeyByIpFull,
      recentAdminFailed,
      recentClientFailed,
      keysSummary: parseKeysSummary(keysByStatus),
    };
  },

  getSecurityDetail: async (days = 7) => {
    const since = sinceDays(days);

    const [
      adminByDay,
      clientByDay,
      keyResults,
      topAdminIps,
      topClientIps,
      hwidMismatches,
    ] = await Promise.all([
      prisma.accessLog.groupBy({
        by: ["success"],
        where: { createdAt: { gte: since } },
        _count: true,
      }),
      prisma.clientAccessLog.groupBy({
        by: ["success"],
        where: { createdAt: { gte: since } },
        _count: true,
      }),
      prisma.keyUsageLog.groupBy({
        by: ["result"],
        where: { attemptedAt: { gte: since } },
        _count: true,
      }),
      prisma.accessLog.groupBy({
        by: ["ipAddress"],
        where: { success: false, createdAt: { gte: since } },
        _count: true,
        orderBy: { _count: { ipAddress: "desc" } },
        take: 20,
      }),
      prisma.clientAccessLog.groupBy({
        by: ["ipAddress"],
        where: { success: false, createdAt: { gte: since } },
        _count: true,
        orderBy: { _count: { ipAddress: "desc" } },
        take: 20,
      }),
      prisma.clientAccessLog.count({
        where: { reason: "HWID_MISMATCH", createdAt: { gte: since } },
      }),
    ]);

    return {
      periodDays: days,
      adminByDay,
      clientByDay,
      keyResults,
      topAdminIps,
      topClientIps,
      hwidMismatches,
    };
  },
};
