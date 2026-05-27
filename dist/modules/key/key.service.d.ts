import { KeyStatus } from "@prisma/client";
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
}): Promise<{
    generated: number;
    keys: string[];
}>;
export declare function listKeys(filters: {
    page: number;
    limit: number;
    status?: KeyStatus;
    productId?: string;
    search?: string;
}): Promise<{
    data: {
        canDelete: boolean;
        product: {
            name: string;
        };
        createdBy: {
            username: string;
        };
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
    }[];
    total: number;
    page: number;
    totalPages: number;
}>;
export declare function getKey(id: string): Promise<{
    canDelete: boolean;
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
export declare function revokeKey(id: string): Promise<{
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
export declare function updateKey(id: string, data: {
    customerEmail?: string;
    customerName?: string;
    expiresAt?: Date;
    isPermanent?: boolean;
}): Promise<{
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
export declare function deleteKey(id: string): Promise<{
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
