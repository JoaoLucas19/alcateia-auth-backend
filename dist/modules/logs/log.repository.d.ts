import type { KeysSummary } from "./log.types";
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
            id: string;
            ipAddress: string;
            reason: string | null;
            success: boolean;
            createdAt: Date;
            usernameAttempted: string;
            adminId: string | null;
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
            userAgent: string | null;
            attemptedAt: Date;
            keyId: string;
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
            id: string;
            ipAddress: string;
            reason: string | null;
            success: boolean;
            createdAt: Date;
            usernameAttempted: string;
            adminId: string | null;
        }[];
        recentClientFailed: {
            id: string;
            ipAddress: string;
            reason: string | null;
            success: boolean;
            createdAt: Date;
            usernameAttempted: string;
            hwid: string | null;
            action: string;
            clientId: string | null;
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
};
