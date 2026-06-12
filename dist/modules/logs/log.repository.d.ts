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
        data: {
            success: boolean;
            id: string;
            ipAddress: string;
            reason: string | null;
            adminId: string | null;
            usernameAttempted: string;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findKeyLogs: ({ page, limit, result, }: {
        page: number;
        limit: number;
        result?: string;
    }) => Promise<{
        data: ({
            key: {
                value: string;
            };
        } & {
            id: string;
            result: import("../../prisma/enums").ValidationResult;
            ipAddress: string;
            keyId: string;
            userAgent: string | null;
            attemptedAt: Date;
        })[];
        total: number;
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
        data: ({
            id: string;
            source: "admin";
            username: string;
            ip: string;
            reason: string;
            createdAt: Date;
        } | {
            id: string;
            source: "client";
            username: string;
            ip: string;
            reason: string;
            action: string;
            createdAt: Date;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    getDashboardStats: () => Promise<{
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
        clientLogins24h: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").ClientAccessLogGroupByOutputType, "success"[]> & {
            _count: number;
        })[];
        adminFailed7d: number;
        clientFailed7d: number;
        adminUniqueFailedIps24h: number;
        clientUniqueFailedIps24h: number;
        clientsTotal: number;
        clientsBanned: number;
        clientsExpired: number;
        adminFailuresByIp: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").AccessLogGroupByOutputType, "ipAddress"[]> & {
            _count: number;
        })[];
        adminFailuresByUsername: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").AccessLogGroupByOutputType, "usernameAttempted"[]> & {
            _count: number;
        })[];
        adminFailuresByReason: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").AccessLogGroupByOutputType, "reason"[]> & {
            _count: number;
        })[];
        clientFailuresByReason: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").ClientAccessLogGroupByOutputType, "reason"[]> & {
            _count: number;
        })[];
        adminFailuresLastHour: number;
        adminTimelineRaw: {
            success: boolean;
            createdAt: Date;
        }[];
        clientTimelineRaw: {
            success: boolean;
            createdAt: Date;
        }[];
        keyTimelineRaw: {
            attemptedAt: Date;
            result: import("../../prisma/enums").ValidationResult;
        }[];
        adminFailures24hList: {
            ipAddress: string;
            createdAt: Date;
        }[];
        clientFailures24hList: {
            ipAddress: string;
            createdAt: Date;
        }[];
        invalidKeyByIpFull: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").KeyUsageLogGroupByOutputType, "ipAddress"[]> & {
            _count: number;
        })[];
        recentAdminFailed: {
            success: boolean;
            id: string;
            ipAddress: string;
            reason: string | null;
            adminId: string | null;
            usernameAttempted: string;
            createdAt: Date;
        }[];
        recentClientFailed: {
            success: boolean;
            id: string;
            ipAddress: string;
            reason: string | null;
            usernameAttempted: string;
            createdAt: Date;
            clientId: string | null;
            hwid: string | null;
            action: string;
        }[];
        keysSummary: KeysSummary;
    }>;
    /** Remove tentativas de login falhas mais antigas que o limite informado. */
    deleteOldFailedLogins: (olderThan: Date) => Promise<{
        adminDeleted: number;
        clientDeleted: number;
        total: number;
    }>;
    getSecurityDetail: (days?: number) => Promise<{
        periodDays: number;
        adminByDay: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").AccessLogGroupByOutputType, "success"[]> & {
            _count: number;
        })[];
        clientByDay: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").ClientAccessLogGroupByOutputType, "success"[]> & {
            _count: number;
        })[];
        keyResults: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").KeyUsageLogGroupByOutputType, "result"[]> & {
            _count: number;
        })[];
        topAdminIps: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").AccessLogGroupByOutputType, "ipAddress"[]> & {
            _count: number;
        })[];
        topClientIps: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").ClientAccessLogGroupByOutputType, "ipAddress"[]> & {
            _count: number;
        })[];
        hwidMismatches: number;
    }>;
    countAccessLogsInWindow: (since: Date) => Promise<{
        admin: number;
        client: number;
        keys: number;
        blocks: number;
        total: number;
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
        data: UnifiedLogEntry[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    investigateIp: (ip: string, since: Date) => Promise<{
        block: {
            id: string;
            ipAddress: string;
            reason: string | null;
            source: string | null;
            blockedAt: Date;
            expiresAt: Date | null;
        } | null;
        adminLogs: {
            success: boolean;
            id: string;
            ipAddress: string;
            reason: string | null;
            adminId: string | null;
            usernameAttempted: string;
            createdAt: Date;
        }[];
        clientLogs: {
            success: boolean;
            id: string;
            ipAddress: string;
            reason: string | null;
            usernameAttempted: string;
            createdAt: Date;
            clientId: string | null;
            hwid: string | null;
            action: string;
        }[];
        keyLogs: ({
            key: {
                value: string;
            };
        } & {
            id: string;
            result: import("../../prisma/enums").ValidationResult;
            ipAddress: string;
            keyId: string;
            userAgent: string | null;
            attemptedAt: Date;
        })[];
    }>;
    getClientAuditData: (username: string, since: Date, page: number, limit: number) => Promise<{
        client: ({
            key: {
                product: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    description: string | null;
                    isActive: boolean;
                };
            } & {
                id: string;
                expiresAt: Date | null;
                createdAt: Date;
                value: string;
                productId: string;
                createdById: string;
                customerEmail: string | null;
                customerName: string | null;
                status: import("../../prisma/enums").KeyStatus;
                isPermanent: boolean;
                activatedAt: Date | null;
            };
        } & {
            id: string;
            expiresAt: Date;
            createdAt: Date;
            keyId: string;
            hwid: string | null;
            isBanned: boolean;
            username: string;
            passwordHash: string;
            discordId: string | null;
            loginCount: number;
            lastLoginAt: Date | null;
        }) | null;
        logs: {
            success: boolean;
            id: string;
            ipAddress: string;
            reason: string | null;
            usernameAttempted: string;
            createdAt: Date;
            clientId: string | null;
            hwid: string | null;
            action: string;
        }[];
        total: number;
        statsRows: (import("../../generated/prisma/internal/prismaNamespace").PickEnumerable<import("../../generated/prisma/models").ClientAccessLogGroupByOutputType, "success"[]> & {
            _count: number;
        })[];
        uniqueIpCount: number;
        lastFailure: {
            success: boolean;
            id: string;
            ipAddress: string;
            reason: string | null;
            usernameAttempted: string;
            createdAt: Date;
            clientId: string | null;
            hwid: string | null;
            action: string;
        } | null;
        lastSuccess: {
            success: boolean;
            id: string;
            ipAddress: string;
            reason: string | null;
            usernameAttempted: string;
            createdAt: Date;
            clientId: string | null;
            hwid: string | null;
            action: string;
        } | null;
    }>;
    countRecentFailuresByIp: (ip: string, since: Date, source: "admin" | "client") => Promise<number>;
    countRecentInvalidKeysByIp: (ip: string, since: Date) => Promise<number>;
};
