export declare const clientRepository: {
    findPaginated(filters: {
        page: number;
        limit: number;
        search?: string;
        status?: "active" | "banned" | "expired";
    }): Promise<{
        total: number;
        clients: ({
            key: {
                product: {
                    id: string;
                    createdAt: Date;
                    name: string;
                    description: string | null;
                    isActive: boolean;
                };
            } & {
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
            };
        } & {
            username: string;
            id: string;
            passwordHash: string;
            createdAt: Date;
            lastLoginAt: Date | null;
            keyId: string;
            hwid: string | null;
            expiresAt: Date;
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
                createdAt: Date;
                name: string;
                description: string | null;
                isActive: boolean;
            };
        } & {
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
        };
    } & {
        username: string;
        id: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        keyId: string;
        hwid: string | null;
        expiresAt: Date;
        isBanned: boolean;
        loginCount: number;
    }) | null>;
    ban(id: string): Promise<{
        username: string;
        id: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        keyId: string;
        hwid: string | null;
        expiresAt: Date;
        isBanned: boolean;
        loginCount: number;
    }>;
    unban(id: string): Promise<{
        username: string;
        id: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        keyId: string;
        hwid: string | null;
        expiresAt: Date;
        isBanned: boolean;
        loginCount: number;
    }>;
    resetHwid(id: string): Promise<{
        username: string;
        id: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        keyId: string;
        hwid: string | null;
        expiresAt: Date;
        isBanned: boolean;
        loginCount: number;
    }>;
    delete(id: string): Promise<{
        username: string;
        id: string;
        passwordHash: string;
        createdAt: Date;
        lastLoginAt: Date | null;
        keyId: string;
        hwid: string | null;
        expiresAt: Date;
        isBanned: boolean;
        loginCount: number;
    }>;
    countTotal(): Promise<number>;
    countActive(): Promise<number>;
};
