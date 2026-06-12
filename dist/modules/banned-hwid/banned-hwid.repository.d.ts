export declare const bannedHwidRepository: {
    findByHwid(hwid: string): Promise<any>;
    findPaginated(filters: {
        page: number;
        limit: number;
        search?: string;
    }): Promise<{
        total: any;
        items: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    create(hwid: string, reason?: string): Promise<any>;
    deleteById(id: string): Promise<any>;
    deleteByHwid(hwid: string): Promise<any>;
};
