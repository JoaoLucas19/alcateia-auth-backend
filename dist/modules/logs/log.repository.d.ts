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
            result: import("@prisma/client").$Enums.ValidationResult;
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
        keysByStatus: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.KeyGroupByOutputType, "status"[]> & {
            _count: number;
        })[];
        logins24h: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.AccessLogGroupByOutputType, "success"[]> & {
            _count: number;
        })[];
        validations24h: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.KeyUsageLogGroupByOutputType, "result"[]> & {
            _count: number;
        })[];
        topInvalidIps: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.KeyUsageLogGroupByOutputType, "ipAddress"[]> & {
            _count: number;
        })[];
        clientLogins24h: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.ClientAccessLogGroupByOutputType, "success"[]> & {
            _count: number;
        })[];
        adminFailed7d: number;
        clientFailed7d: number;
        adminUniqueFailedIps24h: number;
        clientUniqueFailedIps24h: number;
        clientsTotal: number;
        clientsBanned: number;
        clientsExpired: number;
        adminFailuresByIp: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.AccessLogGroupByOutputType, "ipAddress"[]> & {
            _count: number;
        })[];
        adminFailuresByUsername: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.AccessLogGroupByOutputType, "usernameAttempted"[]> & {
            _count: number;
        })[];
        adminFailuresByReason: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.AccessLogGroupByOutputType, "reason"[]> & {
            _count: number;
        })[];
        clientFailuresByReason: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.ClientAccessLogGroupByOutputType, "reason"[]> & {
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
            result: import("@prisma/client").$Enums.ValidationResult;
        }[];
        adminFailures24hList: {
            ipAddress: string;
            createdAt: Date;
        }[];
        clientFailures24hList: {
            ipAddress: string;
            createdAt: Date;
        }[];
        invalidKeyByIpFull: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.KeyUsageLogGroupByOutputType, "ipAddress"[]> & {
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
        adminByDay: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.AccessLogGroupByOutputType, "success"[]> & {
            _count: number;
        })[];
        clientByDay: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.ClientAccessLogGroupByOutputType, "success"[]> & {
            _count: number;
        })[];
        keyResults: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.KeyUsageLogGroupByOutputType, "result"[]> & {
            _count: number;
        })[];
        topAdminIps: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.AccessLogGroupByOutputType, "ipAddress"[]> & {
            _count: number;
        })[];
        topClientIps: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.ClientAccessLogGroupByOutputType, "ipAddress"[]> & {
            _count: number;
        })[];
        hwidMismatches: number;
    }>;
};
