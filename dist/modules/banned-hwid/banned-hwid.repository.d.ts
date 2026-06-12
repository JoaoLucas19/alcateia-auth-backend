export declare const bannedHwidRepository: {
    findByHwid(hwid: string): Promise<{
        id: string;
        reason: string | null;
        createdAt: Date;
        hwid: string;
    } | null>;
    findPaginated(filters: {
        page: number;
        limit: number;
        search?: string;
    }): Promise<{
        total: number;
        items: {
            id: string;
            reason: string | null;
            createdAt: Date;
            hwid: string;
        }[];
        page: number;
        limit: number;
        totalPages: number;
    }>;
    create(hwid: string, reason?: string): Promise<{
        id: string;
        reason: string | null;
        createdAt: Date;
        hwid: string;
    }>;
    deleteById(id: string): Promise<{
        id: string;
        reason: string | null;
        createdAt: Date;
        hwid: string;
    }>;
    deleteByHwid(hwid: string): Promise<{
        id: string;
        reason: string | null;
        createdAt: Date;
        hwid: string;
    }>;
};
