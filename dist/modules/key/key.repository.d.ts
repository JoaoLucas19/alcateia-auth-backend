import { KeyStatus, Prisma } from "../../prisma/enums";
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
        resellerId?: string;
    }) => Prisma.Prisma__KeyClient<{
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        resellerId: string | null;
        customerEmail: string | null;
        customerName: string | null;
        status: KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    createMany: (keys: {
        value: string;
        productId: string;
        createdById: string;
        customerEmail?: string;
        customerName?: string;
        expiresAt?: Date;
        isPermanent?: boolean;
        resellerId?: string;
    }[]) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    findPaginated: ({ page, limit, status, productId, search, }: KeyFilters) => Promise<{
        data: ({
            client: {
                username: string;
            } | null;
            product: {
                name: string;
            };
            createdBy: {
                username: string;
            };
        } & {
            id: string;
            expiresAt: Date | null;
            createdAt: Date;
            value: string;
            productId: string;
            createdById: string;
            resellerId: string | null;
            customerEmail: string | null;
            customerName: string | null;
            status: KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findById: (id: string) => Prisma.Prisma__KeyClient<({
        client: {
            username: string;
        } | null;
        product: {
            id: string;
            name: string;
            createdAt: Date;
            description: string | null;
            isActive: boolean;
        };
        createdBy: {
            id: string;
            username: string;
        };
        usageLogs: {
            id: string;
            result: import("../../prisma/enums").ValidationResult;
            ipAddress: string;
            keyId: string;
            userAgent: string | null;
            attemptedAt: Date;
        }[];
    } & {
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        resellerId: string | null;
        customerEmail: string | null;
        customerName: string | null;
        status: KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findByValue: (value: string) => Prisma.Prisma__KeyClient<{
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        resellerId: string | null;
        customerEmail: string | null;
        customerName: string | null;
        status: KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
    } | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    valueExists: (value: string) => Promise<boolean>;
    update: (id: string, data: {
        customerEmail?: string;
        customerName?: string;
        expiresAt?: Date | null;
        isPermanent?: boolean;
    }) => Prisma.Prisma__KeyClient<{
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        resellerId: string | null;
        customerEmail: string | null;
        customerName: string | null;
        status: KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    revoke: (id: string) => Prisma.Prisma__KeyClient<{
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        resellerId: string | null;
        customerEmail: string | null;
        customerName: string | null;
        status: KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    setStatus: (id: string, status: KeyStatus) => Prisma.Prisma__KeyClient<{
        client: {
            username: string;
        } | null;
        product: {
            name: string;
        };
        createdBy: {
            username: string;
        };
    } & {
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        resellerId: string | null;
        customerEmail: string | null;
        customerName: string | null;
        status: KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    activate: (id: string) => Prisma.Prisma__KeyClient<{
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        resellerId: string | null;
        customerEmail: string | null;
        customerName: string | null;
        status: KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    markExpiredKeys: () => Prisma.PrismaPromise<Prisma.BatchPayload>;
    deleteExpiredKeys: () => Promise<Prisma.BatchPayload>;
    /** Remove key e dependências (cliente do cheat + logs de uso). */
    deleteWithDependencies: (id: string) => Promise<{
        id: string;
        expiresAt: Date | null;
        createdAt: Date;
        value: string;
        productId: string;
        createdById: string;
        resellerId: string | null;
        customerEmail: string | null;
        customerName: string | null;
        status: KeyStatus;
        isPermanent: boolean;
        activatedAt: Date | null;
    }>;
    /** IDs de keys permanentes (flag ou data sentinela 2099). */
    findPermanentKeyIds: (onlyUnused?: boolean) => Promise<string[]>;
};
export {};
