export type ThreatLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type SecurityAlertType =
  | "BRUTE_FORCE_IP"
  | "BRUTE_FORCE_USERNAME"
  | "HIGH_FAILURE_RATE"
  | "KEY_SCANNING"
  | "MULTI_IP_USERNAME"
  | "SPIKE_FAILURES"
  | "HWID_MISMATCH"
  | "CLIENT_LOGIN_FAILED"
  | "ADMIN_LOGIN_FAILED"
  | "IP_BLOCKED";

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
  reasonCode?: string;
  reasonLabel?: string;
  event?: string;
  detail?: string;
  hwid?: string;
  hwidMasked?: string;
  action?: string;
  status?: "failed";
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

export type LogFeedCategory =
  | "admin_access"
  | "client_access"
  | "key_validation"
  | "ip_block"
  | "all";

export type LogFeedStatus = "success" | "failed" | "all";

export interface LogFeedFilters {
  page: number;
  limit: number;
  hours: number;
  category?: LogFeedCategory;
  status?: LogFeedStatus;
  ip?: string;
  username?: string;
  search?: string;
}

export interface LogOverview {
  threatLevel: ThreatLevel;
  threatScore: number;
  activeAlerts: number;
  recordsInWindow: number;
  summary: {
    adminSuccess: number;
    adminFailed: number;
    clientSuccess: number;
    clientFailed: number;
    keySuccess: number;
    keyFailed: number;
    ipBlocks: number;
  };
  alerts: SecurityAlert[];
}

export interface IpInvestigation {
  ip: string;
  blocked: boolean;
  blockedUntil: string | null;
  blockReason: string | null;
  riskScore: number;
  totals: {
    adminAttempts: number;
    adminFailures: number;
    clientAttempts: number;
    clientFailures: number;
    keyAttempts: number;
    keyFailures: number;
  };
  recentEvents: UnifiedLogEntry[];
  topUsernames: { username: string; attempts: number; failures: number }[];
  topReasons: { reason: string; label: string; count: number }[];
}

export interface ClientAuditTrail {
  username: string;
  clientId: string | null;
  isBanned: boolean;
  hwid: string | null;
  hwidMasked: string | null;
  productName: string | null;
  expiresAt: string | null;
  loginCount: number;
  lastLoginAt: string | null;
  stats: {
    totalAttempts: number;
    successCount: number;
    failedCount: number;
    uniqueIps: number;
    lastFailureAt: string | null;
    lastSuccessAt: string | null;
  };
  logs: UnifiedLogEntry[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
}

export interface UnifiedLogEntry {
  id: string;
  category: "admin_access" | "client_access" | "key_validation" | "ip_block";
  source: "ADMIN" | "CLIENT" | "KEY" | "SECURITY";
  event: string;
  detail: string;
  username?: string;
  ip: string;
  hwid?: string;
  hwidMasked?: string;
  userAgent?: string;
  keyMasked?: string;
  keyId?: string;
  adminId?: string;
  clientId?: string;
  action?: string;
  reasonCode?: string;
  reasonLabel: string;
  status: "success" | "failed";
  blockedUntil?: string | null;
  blockSource?: string | null;
  createdAt: string;
}
