import type { KeysSummary, LogFeedCategory, LogFeedStatus, UnifiedLogEntry } from "./log.types";
export declare const logRepository: {
    findAccessLogs: ({ page, limit, success, ip, reason, since, until, }: {
        page: number;
        limit: number;
        success?: boolean;
        ip?: string;
        reason?: string;
        since?: Date;
        until?: Date;
    }) => Promise<{
        data: any;
        total: any;
        page: number;
        totalPages: number;
    }>;
    findKeyLogs: ({ page, limit, result, }: {
        page: number;
        limit: number;
        result?: string;
    }) => Promise<{
        data: any;
        total: any;
        page: number;
        totalPages: number;
    }>;
    findUnifiedFailedLogins: ({ page, limit, source, ip, since, }: {
        page: number;
        limit: number;
        source?: "admin" | "client" | "all";
        ip?: string;
        since?: Date;
    }) => Promise<{
        data: any[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getDashboardStats: () => Promise<{
        keysByStatus: any;
        logins24h: any;
        validations24h: any;
        topInvalidIps: any;
        clientLogins24h: any;
        adminFailed7d: any;
        clientFailed7d: any;
        adminUniqueFailedIps24h: any;
        clientUniqueFailedIps24h: any;
        clientsTotal: any;
        clientsBanned: any;
        clientsExpired: any;
        adminFailuresByIp: any;
        adminFailuresByUsername: any;
        adminFailuresByReason: any;
        clientFailuresByReason: any;
        adminFailuresLastHour: any;
        adminTimelineRaw: any;
        clientTimelineRaw: any;
        keyTimelineRaw: any;
        adminFailures24hList: any;
        clientFailures24hList: any;
        invalidKeyByIpFull: any;
        recentAdminFailed: any;
        recentClientFailed: any;
        keysSummary: KeysSummary;
    }>;
    /** Remove tentativas de login falhas mais antigas que o limite informado. */
    deleteOldFailedLogins: (olderThan: Date) => Promise<{
        adminDeleted: any;
        clientDeleted: any;
        total: any;
    }>;
    getSecurityDetail: (days?: number) => Promise<{
        periodDays: number;
        adminByDay: any;
        clientByDay: any;
        keyResults: any;
        topAdminIps: any;
        topClientIps: any;
        hwidMismatches: any;
    }>;
    countAccessLogsInWindow: (since: Date) => Promise<{
        admin: any;
        client: any;
        keys: any;
        blocks: any;
        total: any;
    }>;
    findUnifiedLogFeed: (params: {
        since: Date;
        takePerSource: number;
        category?: LogFeedCategory;
        status?: LogFeedStatus;
        ip?: string;
        username?: string;
    }) => Promise<UnifiedLogEntry[]>;
    findClientAccessLogs: (params: {
        page: number;
        limit: number;
        since?: Date;
        success?: boolean;
        ip?: string;
        username?: string;
        action?: string;
    }) => Promise<{
        data: any;
        total: any;
        page: number;
        totalPages: number;
    }>;
    investigateIp: (ip: string, since: Date) => Promise<{
        block: any;
        adminLogs: any;
        clientLogs: any;
        keyLogs: any;
    }>;
    getClientAuditData: (username: string, since: Date, page: number, limit: number) => Promise<{
        client: any;
        logs: any;
        total: any;
        statsRows: any;
        uniqueIpCount: any;
        lastFailure: any;
        lastSuccess: any;
    }>;
    countRecentFailuresByIp: (ip: string, since: Date, source: "admin" | "client") => Promise<any>;
    countRecentInvalidKeysByIp: (ip: string, since: Date) => Promise<any>;
};
