import { KeyStatus } from "@prisma/client";
interface KeyFilters {
    page: number;
    limit: number;
    status?: KeyStatus;
    productId?: string;
    search?: string;
}
export declare const keyRepository: {
    create: (data: {
        value: string;
        productId: string;
        createdById: string;
        customerEmail?: string;
        customerName?: string;
        expiresAt?: Date;
    }) => import("@prisma/client").Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    createMany: (keys: {
        value: string;
        productId: string;
        createdById: string;
        customerEmail?: string;
        customerName?: string;
        expiresAt?: Date;
    }[]) => import("@prisma/client").Prisma.PrismaPromise<import("@prisma/client").Prisma.BatchPayload>;
    findPaginated: ({ page, limit, status, productId, search }: KeyFilters) => Promise<{
        data: ({
            product: {
                name: string;
            };
            createdBy: {
                username: string;
            };
        } & {
            id: string;
            createdAt: Date;
            value: string;
            productId: string;
            createdById: string;
            customerEmail: string | null;
            customerName: string | null;
            status: import("@prisma/client").$Enums.KeyStatus;
            activatedAt: Date | null;
            expiresAt: Date | null;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findById: (id: string) => import("@prisma/client").Prisma.Prisma__KeyClient<({
        product: {
            id: string;
            createdAt: Date;
            name: string;
            description: string | null;
            isActive: boolean;
        };
        createdBy: {
            username: string;
            id: string;
        };
        usageLogs: {
            id: string;
            result: import("@prisma/client").$Enums.ValidationResult;
            ipAddress: string;
            attemptedAt: Date;
            keyId: string;
            userAgent: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findByValue: (value: string) => import("@prisma/client").Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        activatedAt: Date | null;
        expiresAt: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    valueExists: (value: string) => Promise<boolean>;
    update: (id: string, data: {
        customerEmail?: string;
        customerName?: string;
        expiresAt?: Date | null;
    }) => import("@prisma/client").Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    revoke: (id: string) => import("@prisma/client").Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    activate: (id: string) => import("@prisma/client").Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    delete: (id: string) => import("@prisma/client").Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
};
export {};
