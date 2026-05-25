export declare function listClients(filters: {
    page: number;
    limit: number;
    search?: string;
    status?: "active" | "banned" | "expired";
}): Promise<{
    clients: {
        id: any;
        username: any;
        hwid: any;
        isBanned: any;
        loginCount: any;
        lastLoginAt: any;
        createdAt: any;
        expiresAt: any;
        isLifetime: any;
        daysRemaining: number;
        status: string;
        key: {
            id: any;
            value: any;
            isPermanent: any;
            status: any;
        };
        product: {
            id: any;
            name: any;
        };
    }[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function getClient(id: string): Promise<{
    id: any;
    username: any;
    hwid: any;
    isBanned: any;
    loginCount: any;
    lastLoginAt: any;
    createdAt: any;
    expiresAt: any;
    isLifetime: any;
    daysRemaining: number;
    status: string;
    key: {
        id: any;
        value: any;
        isPermanent: any;
        status: any;
    };
    product: {
        id: any;
        name: any;
    };
}>;
export declare function banClient(id: string): Promise<{
    message: string;
}>;
export declare function unbanClient(id: string): Promise<{
    message: string;
}>;
export declare function resetClientHwid(id: string): Promise<{
    message: string;
}>;
export declare function deleteClient(id: string): Promise<{
    message: string;
}>;
