export declare const logRepository: {
    findAccessLogs: ({ page, limit, success }: {
        page: number;
        limit: number;
        success?: boolean;
    }) => Promise<{
        data: {
            id: string;
            createdAt: Date;
            usernameAttempted: string;
            ipAddress: string;
            success: boolean;
            reason: string | null;
            adminId: string | null;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findKeyLogs: ({ page, limit, result }: {
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
    }>;
};
