import type { ClientAuditTrail, IpInvestigation, LogFeedFilters, LogOverview, UnifiedFailedLogin } from "./log.types";
declare function cleanupOldFailedLogins(): Promise<void>;
/** Limpeza explícita (admin/bot) — retorna contagens */
export declare function runCleanupFailedLogins(hours?: number): Promise<{
    retentionHours: number;
    message: string;
    adminDeleted: number;
    clientDeleted: number;
    total: number;
}>;
export declare const logService: {
    cleanupOldFailedLogins: typeof cleanupOldFailedLogins;
    evaluateSecurity(): Promise<{
        alerts: import("./log.types").SecurityAlert[];
        threatLevel: import("./log.types").ThreatLevel;
        threatScore: number;
        suspiciousIps: import("./log.types").SuspiciousIpEntry[];
        adminLogins: {
            success24h: number;
            failed24h: number;
            total24h: number;
            failureRate: number;
            failed7d: number;
            uniqueFailedIps24h: number;
        };
        clientLogins: {
            success24h: number;
            failed24h: number;
            total24h: number;
            failureRate: number;
            failed7d: number;
            uniqueFailedIps24h: number;
        };
    }>;
    getDashboard(): Promise<{
        keysByStatus: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").KeyGroupByOutputType, "status"[]> & {
            _count: number;
        })[];
        logins24h: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").AccessLogGroupByOutputType, "success"[]> & {
            _count: number;
        })[];
        validations24h: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").KeyUsageLogGroupByOutputType, "result"[]> & {
            _count: number;
        })[];
        topInvalidIps: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").KeyUsageLogGroupByOutputType, "ipAddress"[]> & {
            _count: number;
        })[];
        keys: import("./log.types").KeysSummary;
        clients: {
            total: number;
            banned: number;
            expired: number;
            active: number;
        };
        metrics: {
            activations24h: number;
            adminLoginsOk24h: number;
            adminLoginsFailed24h: number;
            clientLoginsOk24h: number;
            clientLoginsFailed24h: number;
        };
        security: {
            threatLevel: import("./log.types").ThreatLevel;
            threatScore: number;
            alerts: import("./log.types").SecurityAlert[];
            adminLogins: {
                success24h: number;
                failed24h: number;
                total24h: number;
                failureRate: number;
                failed7d: number;
                uniqueFailedIps24h: number;
            };
            clientLogins: {
                success24h: number;
                failed24h: number;
                total24h: number;
                failureRate: number;
                failed7d: number;
                uniqueFailedIps24h: number;
            };
            suspiciousIps: import("./log.types").SuspiciousIpEntry[];
            topFailedUsernames: {
                username: string;
                attempts: number;
            }[];
            failuresByReason: ({
                source: "admin";
                reason: string;
                label: string;
                count: number;
            } | {
                source: "client";
                reason: string;
                label: string;
                count: number;
            })[];
            timeline24h: import("./log.types").TimelineHourBucket[];
            recentFailedLogins: UnifiedFailedLogin[];
            checks: {
                bruteForceIps: number;
                keyScanningIps: number;
                highFailureRate: boolean;
                spikeLastHour: boolean;
                hwidMismatchRisk: boolean;
            };
        };
    }>;
    getSecurity(days: number): Promise<{
        overview: {
            threatLevel: import("./log.types").ThreatLevel;
            threatScore: number;
            alerts: import("./log.types").SecurityAlert[];
            adminLogins: {
                success24h: number;
                failed24h: number;
                total24h: number;
                failureRate: number;
                failed7d: number;
                uniqueFailedIps24h: number;
            };
            clientLogins: {
                success24h: number;
                failed24h: number;
                total24h: number;
                failureRate: number;
                failed7d: number;
                uniqueFailedIps24h: number;
            };
            suspiciousIps: import("./log.types").SuspiciousIpEntry[];
            topFailedUsernames: {
                username: string;
                attempts: number;
            }[];
            failuresByReason: ({
                source: "admin";
                reason: string;
                label: string;
                count: number;
            } | {
                source: "client";
                reason: string;
                label: string;
                count: number;
            })[];
            timeline24h: import("./log.types").TimelineHourBucket[];
            recentFailedLogins: UnifiedFailedLogin[];
            checks: {
                bruteForceIps: number;
                keyScanningIps: number;
                highFailureRate: boolean;
                spikeLastHour: boolean;
                hwidMismatchRisk: boolean;
            };
        };
        period: {
            days: number;
            admin: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").AccessLogGroupByOutputType, "success"[]> & {
                _count: number;
            })[];
            client: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").ClientAccessLogGroupByOutputType, "success"[]> & {
                _count: number;
            })[];
            keyValidations: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").KeyUsageLogGroupByOutputType, "result"[]> & {
                _count: number;
            })[];
        };
        rankings: {
            topAdminFailedIps: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").AccessLogGroupByOutputType, "ipAddress"[]> & {
                _count: number;
            })[];
            topClientFailedIps: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").ClientAccessLogGroupByOutputType, "ipAddress"[]> & {
                _count: number;
            })[];
        };
        hwidMismatches: number;
        keys: import("./log.types").KeysSummary;
        clients: {
            total: number;
            banned: number;
            expired: number;
            active: number;
        };
    }>;
    getFailedLogins(params: {
        page: number;
        limit: number;
        source?: "admin" | "client" | "all";
        ip?: string;
        hours?: number;
    }): Promise<{
        data: ({
            reasonCode: string;
            reasonLabel: string;
            event: string;
            detail: string;
            status: "failed";
            createdAt: string;
            id: string;
            source: "admin";
            username: string;
            ip: string;
            reason: string;
        } | {
            reasonCode: string;
            reasonLabel: string;
            event: string;
            detail: string;
            status: "failed";
            createdAt: string;
            id: string;
            source: "client";
            username: string;
            ip: string;
            reason: string;
            action: string;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getLogOverview(hours?: number): Promise<LogOverview>;
    getLogFeed(filters: LogFeedFilters): Promise<{
        data: import("./log.types").UnifiedLogEntry[];
        total: number;
        page: number;
        totalPages: number;
        filters: {
            hours: number;
            category: import("./log.types").LogFeedCategory;
            status: import("./log.types").LogFeedStatus;
        };
    }>;
    investigateIpAddress(ip: string, hours?: number): Promise<IpInvestigation>;
    getClientAudit(username: string, params: {
        page: number;
        limit: number;
        hours?: number;
    }): Promise<ClientAuditTrail>;
    getClientAccessLogs(params: {
        page: number;
        limit: number;
        hours?: number;
        success?: boolean;
        ip?: string;
        username?: string;
        action?: string;
    }): Promise<{
        data: import("./log.types").UnifiedLogEntry[];
        total: number;
        page: number;
        totalPages: number;
    }>;
};
export {};
