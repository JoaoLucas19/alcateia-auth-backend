export declare const clientRepository: {
    findPaginated(filters: {
        page: number;
        limit: number;
        search?: string;
        status?: "active" | "banned" | "expired";
        discordId?: string;
    }): Promise<{
        total: number;
        clients: ({
            key: {
                product: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    description: string | null;
                    isActive: boolean;
                };
            } & {
                id: string;
                expiresAt: Date | null;
                createdAt: Date;
                value: string;
                productId: string;
                createdById: string;
                customerEmail: string | null;
                customerName: string | null;
                status: import("@prisma/client").$Enums.KeyStatus;
                isPermanent: boolean;
                activatedAt: Date | null;
            };
        } & {
            id: string;
            expiresAt: Date;
            username: string;
            passwordHash: string;
            createdAt: Date;
            lastLoginAt: Date | null;
            hwid: string | null;
            keyId: string;
            discordId: string | null;
            isBanned: boolean;
            loginCount: number;
        })[];
        page: number;
        limit: number;
        totalPages: number;
    }>;
    findById(id: string): Promise<({
        key: {
            product: {
                id: string;
                name: string;
                createdAt: Date;
                description: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            expiresAt: Date | null;
            createdAt: Date;
            value: string;
            productId: string;
            createdById: string;
            customerEmail: string | null;
            customerName: string | null;
            status: import("@prisma/client").$Enums.KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }) | null>;
    findByUsername(username: string): Promise<({
        key: {
            product: {
                id: string;
                name: string;
                createdAt: Date;
                description: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            expiresAt: Date | null;
            createdAt: Date;
            value: string;
            productId: string;
            createdById: string;
            customerEmail: string | null;
            customerName: string | null;
            status: import("@prisma/client").$Enums.KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }) | null>;
    findByDiscordId(discordId: string): Promise<({
        key: {
            product: {
                id: string;
                name: string;
                createdAt: Date;
                description: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            expiresAt: Date | null;
            createdAt: Date;
            value: string;
            productId: string;
            createdById: string;
            customerEmail: string | null;
            customerName: string | null;
            status: import("@prisma/client").$Enums.KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }) | null>;
    findByKeyValue(keyValue: string): Promise<({
        key: {
            product: {
                id: string;
                name: string;
                createdAt: Date;
                description: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            expiresAt: Date | null;
            createdAt: Date;
            value: string;
            productId: string;
            createdById: string;
            customerEmail: string | null;
            customerName: string | null;
            status: import("@prisma/client").$Enums.KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }) | null>;
    findByKeyId(keyId: string): Promise<({
        key: {
            product: {
                id: string;
                name: string;
                createdAt: Date;
                description: string | null;
                isActive: boolean;
            };
        } & {
            id: string;
            expiresAt: Date | null;
            createdAt: Date;
            value: string;
            productId: string;
            createdById: string;
            customerEmail: string | null;
            customerName: string | null;
            status: import("@prisma/client").$Enums.KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }) | null>;
    updatePassword(id: string, passwordHash: string): Promise<{
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }>;
    updateDiscordId(id: string, discordId: string | null): Promise<{
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }>;
    updateExpiresAt(id: string, expiresAt: Date): Promise<{
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }>;
    ban(id: string): Promise<{
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }>;
    unban(id: string): Promise<{
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }>;
    resetHwid(id: string): Promise<{
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }>;
    delete(id: string): Promise<{
        id: string;
        expiresAt: Date;
        username: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        hwid: string | null;
        keyId: string;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
    }>;
    countTotal(): Promise<number>;
    countActive(): Promise<number>;
    countBanned(): Promise<number>;
    countExpired(): Promise<number>;
    /** Ativos sem HWID vinculado (null ou vazio). */
    countActiveWithoutHwid(): Promise<number>;
};
