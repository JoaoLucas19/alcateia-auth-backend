export type ThreatLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type SecurityAlertType =
  | "BRUTE_FORCE_IP"
  | "BRUTE_FORCE_USERNAME"
  | "HIGH_FAILURE_RATE"
  | "KEY_SCANNING"
  | "MULTI_IP_USERNAME"
  | "SPIKE_FAILURES";

export interface SecurityAlert {
  type: SecurityAlertType;
  severity: ThreatLevel;
  message: string;
  ip?: string;
  username?: string;
  count?: number;
  detectedAt: string;
}

export interface SuspiciousIpEntry {
  ip: string;
  riskScore: number;
  adminFailures24h: number;
  clientFailures24h: number;
  invalidKeyAttempts24h: number;
  totalAttempts24h: number;
  lastSeenAt: string;
}

export interface TimelineHourBucket {
  hour: string;
  adminSuccess: number;
  adminFailed: number;
  clientSuccess: number;
  clientFailed: number;
  keyInvalid: number;
}

export interface UnifiedFailedLogin {
  id: string;
  source: "admin" | "client";
  username: string;
  ip: string;
  reason: string;
  action?: string;
  createdAt: string;
}

export interface KeysSummary {
  active: number;
  used: number;
  expired: number;
  revoked: number;
  total: number;
}

export interface LoginStatsBlock {
  success24h: number;
  failed24h: number;
  total24h: number;
  failureRate: number;
  failed7d: number;
  uniqueFailedIps24h: number;
}
