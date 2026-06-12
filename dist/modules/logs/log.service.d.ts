import type { ClientAuditTrail, IpInvestigation, LogFeedFilters, LogOverview, UnifiedFailedLogin } from "./log.types";
declare function cleanupOldFailedLogins(): Promise<void>;
/** Limpeza explícita (admin/bot) — retorna contagens */
export declare function runCleanupFailedLogins(hours?: number): Promise<{
    retentionHours: number;
    message: string;
    adminDeleted: any;
    clientDeleted: any;
    total: any;
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
        keysByStatus: any;
        logins24h: any;
        validations24h: any;
        topInvalidIps: any;
        keys: import("./log.types").KeysSummary;
        clients: {
            total: any;
            banned: any;
            expired: any;
            active: number;
        };
        metrics: {
            activations24h: any;
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
            topFailedUsernames: any;
            failuresByReason: any[];
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
            topFailedUsernames: any;
            failuresByReason: any[];
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
            admin: any;
            client: any;
            keyValidations: any;
        };
        rankings: {
            topAdminFailedIps: any;
            topClientFailedIps: any;
        };
        hwidMismatches: any;
        keys: import("./log.types").KeysSummary;
        clients: {
            total: any;
            banned: any;
            expired: any;
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
        data: any[];
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
        data: any;
        total: any;
        page: number;
        totalPages: number;
    }>;
};
export {};
