import { KeyStatus, ResellerStatus } from "../../prisma/enums";
export declare function getOverview(): Promise<{
    metrics: {
        totalStores: number;
        totalKeys: number;
        activeKeys: number;
        expiredKeys: number;
        bannedKeys: number;
        pausedKeys: number;
    };
    ranking: {
        bySales: {
            id: string;
            name: string;
            owner: string;
            status: ResellerStatus;
            metric: number;
        }[];
        byFailures: {
            id: string;
            name: string;
            owner: string;
            status: ResellerStatus;
            metric: number;
        }[];
        byBanned: {
            id: string;
            name: string;
            owner: string;
            status: ResellerStatus;
            metric: number;
        }[];
    };
    stores: {
        id: string;
        name: string;
        owner: string;
        discord: string | null;
        email: string | null;
        notes: string | null;
        status: ResellerStatus;
        activeKeys: number;
        expiredKeys: number;
        bannedKeys: number;
        pausedKeys: number;
        totalKeys: number;
        failedLogins24h: number;
        createdAt: string;
    }[];
}>;
export declare function listResellers(filters: {
    page: number;
    limit: number;
    status?: "all" | "active" | "paused" | "banned";
    search?: string;
}): Promise<{
    data: {
        id: string;
        name: string;
        owner: string;
        discord: string | null;
        email: string | null;
        notes: string | null;
        status: ResellerStatus;
        activeKeys: number;
        expiredKeys: number;
        bannedKeys: number;
        pausedKeys: number;
        totalKeys: number;
        failedLogins24h: number;
        createdAt: string;
    }[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare function getReseller(id: string): Promise<{
    id: string;
    name: string;
    owner: string;
    discord: string | null;
    email: string | null;
    notes: string | null;
    status: ResellerStatus;
    activeKeys: number;
    expiredKeys: number;
    bannedKeys: number;
    pausedKeys: number;
    totalKeys: number;
    failedLogins24h: number;
    createdAt: string;
}>;
export declare function createReseller(data: {
    name: string;
    owner: string;
    discord?: string;
    email?: string;
    notes?: string;
}, actor?: string): Promise<{
    id: string;
    name: string;
    owner: string;
    discord: string | null;
    email: string | null;
    notes: string | null;
    status: ResellerStatus;
    activeKeys: number;
    expiredKeys: number;
    bannedKeys: number;
    pausedKeys: number;
    totalKeys: number;
    failedLogins24h: number;
    createdAt: string;
}>;
export declare function updateReseller(id: string, data: {
    name?: string;
    owner?: string;
    discord?: string | null;
    email?: string | null;
    notes?: string | null;
    status?: ResellerStatus;
}, actor?: string): Promise<{
    id: string;
    name: string;
    owner: string;
    discord: string | null;
    email: string | null;
    notes: string | null;
    status: ResellerStatus;
    activeKeys: number;
    expiredKeys: number;
    bannedKeys: number;
    pausedKeys: number;
    totalKeys: number;
    failedLogins24h: number;
    createdAt: string;
}>;
export declare function banReseller(id: string, actor?: string): Promise<{
    deleted: boolean;
    id: string;
    name: string;
    deletedKeys: number;
    deletedClients: number;
    message: string;
    actor: string;
}>;
export declare function unbanReseller(id: string, actor?: string): Promise<{
    id: string;
    name: string;
    owner: string;
    discord: string | null;
    email: string | null;
    notes: string | null;
    status: ResellerStatus;
    activeKeys: number;
    expiredKeys: number;
    bannedKeys: number;
    pausedKeys: number;
    totalKeys: number;
    failedLogins24h: number;
    createdAt: string;
}>;
export declare function pauseReseller(id: string, actor?: string): Promise<{
    id: string;
    name: string;
    owner: string;
    discord: string | null;
    email: string | null;
    notes: string | null;
    status: ResellerStatus;
    activeKeys: number;
    expiredKeys: number;
    bannedKeys: number;
    pausedKeys: number;
    totalKeys: number;
    failedLogins24h: number;
    createdAt: string;
}>;
export declare function unpauseReseller(id: string, actor?: string): Promise<{
    id: string;
    name: string;
    owner: string;
    discord: string | null;
    email: string | null;
    notes: string | null;
    status: ResellerStatus;
    activeKeys: number;
    expiredKeys: number;
    bannedKeys: number;
    pausedKeys: number;
    totalKeys: number;
    failedLogins24h: number;
    createdAt: string;
}>;
export declare function listResellerKeys(id: string, page: number, limit: number): Promise<{
    data: {
        id: string;
        value: string;
        status: KeyStatus;
        product: {
            id: string;
            name: string;
        };
        customerName: string | null;
        customerEmail: string | null;
        isPermanent: boolean;
        activatedAt: string | null;
        expiresAt: string | null;
        createdAt: string;
    }[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare function bulkUpdateResellerKeys(resellerId: string, action: "pause" | "ban" | "unpause" | "reactivate", keyIds: string[], actor?: string): Promise<{
    data: {
        id: string;
        value: string;
        status: KeyStatus;
        product: {
            id: string;
            name: string;
        };
        customerName: string | null;
        customerEmail: string | null;
        isPermanent: boolean;
        activatedAt: string | null;
        expiresAt: string | null;
        createdAt: string;
    }[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare function listResellerHistory(id: string, page: number, limit: number): Promise<{
    data: {
        id: string;
        type: string;
        description: string;
        actor: string;
        metadata: string | null;
        createdAt: string;
    }[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare function recordKeyGeneration(resellerId: string, quantity: number, actor?: string): Promise<void>;
