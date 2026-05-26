import {
  aggregateSuspiciousIps,
  buildTimeline24h,
  computeThreatLevel,
  detectSecurityAlerts,
  reasonLabel,
} from "./log.analytics";
import { logRepository } from "./log.repository";
import type { LoginStatsBlock, UnifiedFailedLogin } from "./log.types";

function mapLoginStats(
  rows: { success: boolean; _count: number }[],
  failed7d: number,
  uniqueFailedIps24h: number
): LoginStatsBlock {
  return loginStatsFromGroup(rows, failed7d, uniqueFailedIps24h);
}

function loginStatsFromGroup(
  rows: { success: boolean; _count: number }[],
  failed7d: number,
  uniqueFailedIps24h: number
): LoginStatsBlock {
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

function buildRecentFailedLogins(
  adminRows: {
    id: string;
    usernameAttempted: string;
    ipAddress: string;
    reason: string | null;
    createdAt: Date;
  }[],
  clientRows: {
    id: string;
    usernameAttempted: string;
    ipAddress: string;
    reason: string | null;
    action: string;
    createdAt: Date;
  }[],
  limit = 25
): UnifiedFailedLogin[] {
  const merged: UnifiedFailedLogin[] = [
    ...adminRows.map((r) => ({
      id: r.id,
      source: "admin" as const,
      username: r.usernameAttempted,
      ip: r.ipAddress,
      reason: reasonLabel(r.reason),
      createdAt: r.createdAt.toISOString(),
    })),
    ...clientRows.map((r) => ({
      id: r.id,
      source: "client" as const,
      username: r.usernameAttempted,
      ip: r.ipAddress,
      reason: reasonLabel(r.reason),
      action: r.action,
      createdAt: r.createdAt.toISOString(),
    })),
  ];

  return merged
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

async function evaluateSecurityFromRaw(raw: Awaited<ReturnType<typeof logRepository.getDashboardStats>>) {
  const adminLogins = mapLoginStats(
    raw.logins24h,
    raw.adminFailed7d,
    raw.adminUniqueFailedIps24h
  );
  const clientLogins = mapLoginStats(
    raw.clientLogins24h,
    raw.clientFailed7d,
    raw.clientUniqueFailedIps24h
  );

  const suspiciousIps = aggregateSuspiciousIps({
    adminFailures: raw.adminFailures24hList,
    clientFailures: raw.clientFailures24hList,
    invalidKeyByIp: raw.invalidKeyByIpFull,
  });

  const alerts = detectSecurityAlerts({
    adminFailed24h: adminLogins.failed24h,
    adminTotal24h: adminLogins.total24h,
    adminFailuresByIp: raw.adminFailuresByIp,
    adminFailuresByUsername: raw.adminFailuresByUsername,
    invalidKeyByIp: raw.topInvalidIps,
    adminFailuresLastHour: raw.adminFailuresLastHour,
  });

  const { level: threatLevel, score: threatScore } = computeThreatLevel(alerts, suspiciousIps);

  return { alerts, threatLevel, threatScore, suspiciousIps, adminLogins, clientLogins };
}

export const logService = {
  async evaluateSecurity() {
    const raw = await logRepository.getDashboardStats();
    return evaluateSecurityFromRaw(raw);
  },

  async getDashboard() {
    const raw = await logRepository.getDashboardStats();
    const { alerts, threatLevel, threatScore, suspiciousIps, adminLogins, clientLogins } =
      await evaluateSecurityFromRaw(raw);

    const validationsMap = Object.fromEntries(
      raw.validations24h.map((v) => [v.result, v._count])
    );
    const activations24h = validationsMap.SUCCESS ?? 0;

    const timeline24h = buildTimeline24h(
      raw.adminTimelineRaw,
      raw.clientTimelineRaw,
      raw.keyTimelineRaw
    );

    const recentFailedLogins = buildRecentFailedLogins(
      raw.recentAdminFailed,
      raw.recentClientFailed,
      25
    );

    const failuresByReason = [
      ...raw.adminFailuresByReason.map((r) => ({
        source: "admin" as const,
        reason: r.reason!,
        label: reasonLabel(r.reason),
        count: r._count,
      })),
      ...raw.clientFailuresByReason.map((r) => ({
        source: "client" as const,
        reason: r.reason!,
        label: reasonLabel(r.reason),
        count: r._count,
      })),
    ].sort((a, b) => b.count - a.count);

    return {
      keysByStatus: raw.keysByStatus,
      logins24h: raw.logins24h,
      validations24h: raw.validations24h,
      topInvalidIps: raw.topInvalidIps,
      keys: raw.keysSummary,
      clients: {
        total: raw.clientsTotal,
        banned: raw.clientsBanned,
        expired: raw.clientsExpired,
        active: Math.max(0, raw.clientsTotal - raw.clientsBanned - raw.clientsExpired),
      },
      metrics: {
        activations24h,
        adminLoginsOk24h: adminLogins.success24h,
        adminLoginsFailed24h: adminLogins.failed24h,
        clientLoginsOk24h: clientLogins.success24h,
        clientLoginsFailed24h: clientLogins.failed24h,
      },
      security: {
        threatLevel,
        threatScore,
        alerts,
        adminLogins,
        clientLogins,
        suspiciousIps,
        topFailedUsernames: raw.adminFailuresByUsername.map((r) => ({
          username: r.usernameAttempted,
          attempts: r._count,
        })),
        failuresByReason,
        timeline24h,
        recentFailedLogins,
        checks: {
          bruteForceIps: alerts.filter((a) => a.type === "BRUTE_FORCE_IP").length,
          keyScanningIps: alerts.filter((a) => a.type === "KEY_SCANNING").length,
          highFailureRate: adminLogins.failureRate >= 0.35,
          spikeLastHour: raw.adminFailuresLastHour >= 5,
          hwidMismatchRisk: (raw.clientFailuresByReason.find((r) => r.reason === "HWID_MISMATCH")?._count ?? 0) > 0,
        },
      },
    };
  },

  async getSecurity(days: number) {
    const [dashboard, detail] = await Promise.all([
      this.getDashboard(),
      logRepository.getSecurityDetail(days),
    ]);

    return {
      overview: dashboard.security,
      period: {
        days: detail.periodDays,
        admin: detail.adminByDay,
        client: detail.clientByDay,
        keyValidations: detail.keyResults,
      },
      rankings: {
        topAdminFailedIps: detail.topAdminIps,
        topClientFailedIps: detail.topClientIps,
      },
      hwidMismatches: detail.hwidMismatches,
      keys: dashboard.keys,
      clients: dashboard.clients,
    };
  },

  async getFailedLogins(params: {
    page: number;
    limit: number;
    source?: "admin" | "client" | "all";
    ip?: string;
    hours?: number;
  }) {
    const since = params.hours
      ? new Date(Date.now() - params.hours * 60 * 60 * 1000)
      : undefined;

    const result = await logRepository.findUnifiedFailedLogins({
      page: params.page,
      limit: params.limit,
      source: params.source ?? "all",
      ip: params.ip,
      since,
    });

    return {
      ...result,
      data: result.data.map((row) => ({
        ...row,
        reasonLabel: reasonLabel(row.reason),
        createdAt: row.createdAt.toISOString(),
      })),
    };
  },
};
