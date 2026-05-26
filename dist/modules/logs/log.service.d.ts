import type { LoginStatsBlock, UnifiedFailedLogin } from "./log.types";
export declare const logService: {
    getDashboard(): Promise<{
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
            adminLogins: LoginStatsBlock;
            clientLogins: LoginStatsBlock;
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
            adminLogins: LoginStatsBlock;
            clientLogins: LoginStatsBlock;
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
            admin: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.AccessLogGroupByOutputType, "success"[]> & {
                _count: number;
            })[];
            client: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.ClientAccessLogGroupByOutputType, "success"[]> & {
                _count: number;
            })[];
            keyValidations: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.KeyUsageLogGroupByOutputType, "result"[]> & {
                _count: number;
            })[];
        };
        rankings: {
            topAdminFailedIps: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.AccessLogGroupByOutputType, "ipAddress"[]> & {
                _count: number;
            })[];
            topClientFailedIps: (import("@prisma/client").Prisma.PickEnumerable<import("@prisma/client").Prisma.ClientAccessLogGroupByOutputType, "ipAddress"[]> & {
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
            reasonLabel: string;
            createdAt: string;
            id: string;
            source: "admin";
            username: string;
            ip: string;
            reason: string;
        } | {
            reasonLabel: string;
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
};
