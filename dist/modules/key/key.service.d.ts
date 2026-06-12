import { KeyStatus } from "../../prisma/enums";
/** Limpeza explícita (bot/admin) — retorna contagens */
export declare function runCleanupExpiredKeys(): Promise<{
    markedExpired: any;
    deleted: any;
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
    data: any;
    total: any;
    page: number;
    totalPages: number;
}>;
export declare function getKey(id: string): Promise<any>;
export declare function revokeKey(id: string): Promise<any>;
export declare function updateKey(id: string, data: {
    customerEmail?: string;
    customerName?: string;
    expiresAt?: Date;
    isPermanent?: boolean;
}): Promise<any>;
export declare function deleteKey(id: string): Promise<any>;
