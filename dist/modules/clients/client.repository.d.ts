export declare const clientRepository: {
    findPaginated(filters: {
        page: number;
        limit: number;
        search?: string;
        status?: "active" | "banned" | "expired";
        discordId?: string;
    }): Promise<{
        total: any;
        clients: any;
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findById(id: string): Promise<any>;
    findByUsername(username: string): Promise<any>;
    findByDiscordId(discordId: string): Promise<any>;
    findByKeyValue(keyValue: string): Promise<any>;
    findByKeyId(keyId: string): Promise<any>;
    updatePassword(id: string, passwordHash: string): Promise<any>;
    updateDiscordId(id: string, discordId: string | null): Promise<any>;
    updateExpiresAt(id: string, expiresAt: Date): Promise<any>;
    ban(id: string): Promise<any>;
    unban(id: string): Promise<any>;
    resetHwid(id: string): Promise<any>;
    delete(id: string): Promise<any>;
    countTotal(): Promise<any>;
    countActive(): Promise<any>;
    countBanned(): Promise<any>;
    countExpired(): Promise<any>;
    /** Ativos sem HWID vinculado (null ou vazio). */
    countActiveWithoutHwid(): Promise<any>;
};
