export declare const productRepository: {
    create: (data: {
        name: string;
        description?: string;
    }) => import("../../generated/prisma/models").Prisma__ProductClient<{
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    findAll: () => import("../../generated/prisma/internal/prismaNamespace").PrismaPromise<({
        _count: {
            keys: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
    })[]>;
    findById: (id: string) => import("../../generated/prisma/models").Prisma__ProductClient<({
        keys: {
            status: import("../../prisma/enums").KeyStatus;
        }[];
        _count: {
            keys: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    update: (id: string, data: {
        name?: string;
        description?: string;
        isActive?: boolean;
    }) => import("../../generated/prisma/models").Prisma__ProductClient<{
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    delete: (id: string) => import("../../generated/prisma/models").Prisma__ProductClient<{
        id: string;
        name: string;
        createdAt: Date;
        description: string | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: import("../../generated/prisma/internal/prismaNamespace").GlobalOmitConfig | undefined;
    }>;
    hasKeys: (id: string) => Promise<boolean>;
};
