import { KeyStatus } from "../../prisma/enums";
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
    }) => any;
    createMany: (keys: {
        value: string;
        productId: string;
        createdById: string;
        customerEmail?: string;
        customerName?: string;
        expiresAt?: Date;
        isPermanent?: boolean;
    }[]) => any;
    findPaginated: ({ page, limit, status, productId, search, }: KeyFilters) => Promise<{
        data: any;
        total: any;
        page: number;
        totalPages: number;
    }>;
    findById: (id: string) => any;
    findByValue: (value: string) => any;
    valueExists: (value: string) => Promise<boolean>;
    update: (id: string, data: {
        customerEmail?: string;
        customerName?: string;
        expiresAt?: Date | null;
        isPermanent?: boolean;
    }) => any;
    revoke: (id: string) => any;
    activate: (id: string) => any;
    markExpiredKeys: () => any;
    deleteExpiredKeys: () => Promise<any>;
    /** Remove key e dependências (cliente do cheat + logs de uso). */
    deleteWithDependencies: (id: string) => any;
    /** IDs de keys permanentes (flag ou data sentinela 2099). */
    findPermanentKeyIds: (onlyUnused?: boolean) => Promise<any>;
};
export {};
