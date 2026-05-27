import { KeyStatus, Prisma } from "@prisma/client";
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
        isPermanent?: boolean;
    }) => Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    createMany: (keys: {
        value: string;
        productId: string;
        createdById: string;
        customerEmail?: string;
        customerName?: string;
        expiresAt?: Date;
        isPermanent?: boolean;
    }[]) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    findPaginated: ({ page, limit, status, productId, search, }: KeyFilters) => Promise<{
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
            isPermanent: boolean;
            activatedAt: Date | null;
            expiresAt: Date | null;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findById: (id: string) => Prisma.Prisma__KeyClient<({
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
            userAgent: string | null;
            attemptedAt: Date;
            keyId: string;
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
        isPermanent: boolean;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    findByValue: (value: string) => Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
        expiresAt: Date | null;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    valueExists: (value: string) => Promise<boolean>;
    update: (id: string, data: {
        customerEmail?: string;
        customerName?: string;
        expiresAt?: Date | null;
        isPermanent?: boolean;
    }) => Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    revoke: (id: string) => Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    activate: (id: string) => Prisma.Prisma__KeyClient<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    markExpiredKeys: () => Prisma.PrismaPromise<Prisma.BatchPayload>;
    deleteExpiredKeys: () => Promise<Prisma.BatchPayload>;
    /** Remove key e dependências (cliente do cheat + logs de uso). */
    deleteWithDependencies: (id: string) => Promise<{
        id: string;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        customerEmail: string | null;
        customerName: string | null;
        status: import("@prisma/client").$Enums.KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
        expiresAt: Date | null;
    }>;
    /** IDs de keys permanentes (flag ou data sentinela 2099). */
    findPermanentKeyIds: (onlyUnused?: boolean) => Promise<string[]>;
};
export {};
