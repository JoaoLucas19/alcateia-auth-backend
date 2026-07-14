import { KeyStatus, ResellerStatus, Prisma } from "../../prisma/enums";
export type ResellerListFilters = {
    page: number;
    limit: number;
    status?: "all" | "active" | "paused" | "banned";
    search?: string;
};
export declare const resellerRepository: {
    create: (data: {
        name: string;
        owner: string;
        discord?: string | null;
        email?: string | null;
        notes?: string | null;
        status?: ResellerStatus;
    }) => Prisma.Prisma__ResellerClient<{
        id: string;
        name: string;
        createdAt: Date;
        status: ResellerStatus;
        owner: string;
        discord: string | null;
        email: string | null;
        notes: string | null;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    update: (id: string, data: {
        name?: string;
        owner?: string;
        discord?: string | null;
        email?: string | null;
        notes?: string | null;
        status?: ResellerStatus;
    }) => Prisma.Prisma__ResellerClient<{
        id: string;
        name: string;
        createdAt: Date;
        status: ResellerStatus;
        owner: string;
        discord: string | null;
        email: string | null;
        notes: string | null;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findById: (id: string) => Prisma.Prisma__ResellerClient<({
        _count: {
            keys: number;
        };
    } & {
        id: string;
        name: string;
        createdAt: Date;
        status: ResellerStatus;
        owner: string;
        discord: string | null;
        email: string | null;
        notes: string | null;
        updatedAt: Date;
    }) | null, null, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findPaginated: ({ page, limit, status, search }: ResellerListFilters) => Promise<{
        data: ({
            keys: {
                id: string;
                status: KeyStatus;
            }[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            status: ResellerStatus;
            owner: string;
            discord: string | null;
            email: string | null;
            notes: string | null;
            updatedAt: Date;
        })[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findAllWithKeys: () => Prisma.PrismaPromise<({
        keys: {
            id: string;
            status: KeyStatus;
        }[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        status: ResellerStatus;
        owner: string;
        discord: string | null;
        email: string | null;
        notes: string | null;
        updatedAt: Date;
    })[]>;
    countAll: () => Prisma.PrismaPromise<number>;
    countKeysByStatus: () => Promise<Record<string, number>>;
    countAllKeysLinked: () => Prisma.PrismaPromise<number>;
    addHistory: (data: {
        resellerId: string;
        type: string;
        description: string;
        actor?: string;
        metadata?: string | null;
    }) => Prisma.Prisma__ResellerHistoryClient<{
        id: string;
        type: string;
        createdAt: Date;
        resellerId: string;
        metadata: string | null;
        description: string;
        actor: string;
    }, never, import("@prisma/client/runtime/client").DefaultArgs, {
        omit: Prisma.GlobalOmitConfig | undefined;
    }>;
    findHistory: (resellerId: string, page: number, limit: number) => Promise<{
        data: {
            id: string;
            type: string;
            createdAt: Date;
            resellerId: string;
            metadata: string | null;
            description: string;
            actor: string;
        }[];
        total: number;
        page: number;
        totalPages: number;
    }>;
    findKeys: (resellerId: string, page: number, limit: number) => Promise<{
        data: ({
            client: {
                username: string;
            } | null;
            product: {
                id: string;
                name: string;
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
    findKeysByIds: (resellerId: string, keyIds: string[]) => Prisma.PrismaPromise<{
        client: {
            id: string;
        } | null;
        id: string;
        status: KeyStatus;
        activatedAt: Date | null;
    }[]>;
    updateKeysStatus: (keyIds: string[], status: KeyStatus) => Prisma.PrismaPromise<Prisma.BatchPayload>;
    deleteKeysWithDependencies: (keyIds: string[]) => Promise<{
        deletedKeys: number;
        deletedClients: number;
    }>;
    /** Banir loja = apagar loja + histórico + keys + clientes vinculados */
    deleteCompletely: (resellerId: string) => Promise<{
        deletedKeys: number;
        deletedClients: number;
    }>;
    countFailedLogins24hByReseller: (since: Date) => Promise<Map<string, number>>;
};
