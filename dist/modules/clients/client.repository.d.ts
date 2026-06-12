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
                status: import("../../prisma/enums").KeyStatus;
                isPermanent: boolean;
                activatedAt: Date | null;
            };
        } & {
            id: string;
            expiresAt: Date;
            createdAt: Date;
            keyId: string;
            hwid: string | null;
            isBanned: boolean;
            username: string;
            passwordHash: string;
            discordId: string | null;
            loginCount: number;
            lastLoginAt: Date | null;
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
            status: import("../../prisma/enums").KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
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
            status: import("../../prisma/enums").KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
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
            status: import("../../prisma/enums").KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
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
            status: import("../../prisma/enums").KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
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
            status: import("../../prisma/enums").KeyStatus;
            isPermanent: boolean;
            activatedAt: Date | null;
        };
    } & {
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
    }) | null>;
    updatePassword(id: string, passwordHash: string): Promise<{
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
    }>;
    updateDiscordId(id: string, discordId: string | null): Promise<{
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
    }>;
    updateExpiresAt(id: string, expiresAt: Date): Promise<{
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
    }>;
    ban(id: string): Promise<{
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
    }>;
    unban(id: string): Promise<{
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
    }>;
    resetHwid(id: string): Promise<{
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        expiresAt: Date;
        createdAt: Date;
        keyId: string;
        hwid: string | null;
        isBanned: boolean;
        username: string;
        passwordHash: string;
        discordId: string | null;
        loginCount: number;
        lastLoginAt: Date | null;
    }>;
    countTotal(): Promise<number>;
    countActive(): Promise<number>;
    countBanned(): Promise<number>;
    countExpired(): Promise<number>;
    /** Ativos sem HWID vinculado (null ou vazio). */
    countActiveWithoutHwid(): Promise<number>;
};
