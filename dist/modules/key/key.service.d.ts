import { KeyStatus } from "../../prisma/enums";
/** Limpeza explícita (bot/admin) — retorna contagens */
export declare function runCleanupExpiredKeys(): Promise<{
    markedExpired: number;
    deleted: number;
    message: string;
}>;
/** Remove todas as keys permanentes (inclui usadas/revogadas, com cliente se existir). */
export declare function runCleanupPermanentKeys(onlyUnused?: boolean): Promise<{
    deleted: number;
    onlyUnused: boolean;
    message: string;
}>;
export declare function generateKeys(data: {
    productId: string;
    quantity: number;
    createdById: string;
    customerEmail?: string;
    customerName?: string;
    expiresAt?: Date;
    isPermanent?: boolean;
    resellerId?: string;
    actorUsername?: string;
}): Promise<{
    generated: number;
    keys: string[];
    resellerId: string | null;
}>;
export declare function listKeys(filters: {
    page: number;
    limit: number;
    status?: KeyStatus;
    productId?: string;
    search?: string;
    resellerId?: string;
}): Promise<{
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
    } & {
        customerName: string | null;
        registeredUsername: string | null;
        canDelete: boolean;
        canPause: boolean;
        canUnpause: boolean;
    })[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare function getKey(id: string): Promise<{
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
} & {
    customerName: string | null;
    registeredUsername: string | null;
    canDelete: boolean;
    canPause: boolean;
    canUnpause: boolean;
}>;
export declare function revokeKey(id: string): Promise<{
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
export declare function pauseKey(id: string): Promise<{
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
} & {
    customerName: string | null;
    registeredUsername: string | null;
    canDelete: boolean;
    canPause: boolean;
    canUnpause: boolean;
}>;
export declare function unpauseKey(id: string): Promise<{
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
} & {
    customerName: string | null;
    registeredUsername: string | null;
    canDelete: boolean;
    canPause: boolean;
    canUnpause: boolean;
}>;
export declare function updateKey(id: string, data: {
    customerEmail?: string;
    customerName?: string;
    expiresAt?: Date;
    isPermanent?: boolean;
}): Promise<{
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
export declare function deleteKey(id: string): Promise<{
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
