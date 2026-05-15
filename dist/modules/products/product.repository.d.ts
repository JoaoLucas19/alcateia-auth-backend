export declare const productRepository: {
    create: (data: {
        name: string;
        description?: string;
    }) => import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll: () => import("@prisma/client").Prisma.PrismaPromise<({
        _count: {
            keys: number;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
    })[]>;
    findById: (id: string) => import("@prisma/client").Prisma.Prisma__ProductClient<({
        keys: {
            status: import("@prisma/client").$Enums.KeyStatus;
        }[];
        _count: {
            keys: number;
        };
    } & {
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
    }) | null, null, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    update: (id: string, data: {
        name?: string;
        description?: string;
        isActive?: boolean;
    }) => import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    delete: (id: string) => import("@prisma/client").Prisma.Prisma__ProductClient<{
        id: string;
        createdAt: Date;
        name: string;
        description: string | null;
        isActive: boolean;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    hasKeys: (id: string) => Promise<boolean>;
};
