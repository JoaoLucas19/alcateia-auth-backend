export type ClientLookup = {
    clientId?: string;
    username?: string;
    key?: string;
    discordId?: string;
};
export declare function resolveClientLookup(lookup: ClientLookup): Promise<{
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
export declare function listClients(filters: {
    page: number;
    limit: number;
    search?: string;
    status?: "active" | "banned" | "expired";
    discordId?: string;
}): Promise<{
    clients: {
        id: string;
        username: string;
        hwid: string | null;
        hwidFormat: "machine" | "mac" | null;
        hwidDisplay: string | null;
        hwidBound: boolean;
        hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
        lastAttemptHwid: string | null;
        lastAttemptHwidDisplay: string | null;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
        lastLoginAt: Date | null;
        createdAt: Date;
        expiresAt: Date;
        isLifetime: boolean;
        daysRemaining: number;
        status: string;
        key: {
            id: string;
            value: string;
            isPermanent: boolean;
            status: string;
        };
        product: {
            id: string;
            name: string;
        };
    }[];
    summary: {
        total: number;
        active: number;
        banned: number;
        expired: number;
        withoutHwid: number;
    };
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}>;
export declare function getClientsSummary(): Promise<{
    total: number;
    active: number;
    banned: number;
    expired: number;
    withoutHwid: number;
}>;
export declare function getClient(id: string): Promise<{
    id: string;
    username: string;
    hwid: string | null;
    hwidFormat: "machine" | "mac" | null;
    hwidDisplay: string | null;
    hwidBound: boolean;
    hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
    lastAttemptHwid: string | null;
    lastAttemptHwidDisplay: string | null;
    discordId: string | null;
    isBanned: boolean;
    loginCount: number;
    lastLoginAt: Date | null;
    createdAt: Date;
    expiresAt: Date;
    isLifetime: boolean;
    daysRemaining: number;
    status: string;
    key: {
        id: string;
        value: string;
        isPermanent: boolean;
        status: string;
    };
    product: {
        id: string;
        name: string;
    };
}>;
export declare function getClientByDiscordId(discordId: string): Promise<{
    id: string;
    username: string;
    hwid: string | null;
    hwidFormat: "machine" | "mac" | null;
    hwidDisplay: string | null;
    hwidBound: boolean;
    hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
    lastAttemptHwid: string | null;
    lastAttemptHwidDisplay: string | null;
    discordId: string | null;
    isBanned: boolean;
    loginCount: number;
    lastLoginAt: Date | null;
    createdAt: Date;
    expiresAt: Date;
    isLifetime: boolean;
    daysRemaining: number;
    status: string;
    key: {
        id: string;
        value: string;
        isPermanent: boolean;
        status: string;
    };
    product: {
        id: string;
        name: string;
    };
}>;
export declare function getClientByKeyValue(keyValue: string): Promise<{
    id: string;
    username: string;
    hwid: string | null;
    hwidFormat: "machine" | "mac" | null;
    hwidDisplay: string | null;
    hwidBound: boolean;
    hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
    lastAttemptHwid: string | null;
    lastAttemptHwidDisplay: string | null;
    discordId: string | null;
    isBanned: boolean;
    loginCount: number;
    lastLoginAt: Date | null;
    createdAt: Date;
    expiresAt: Date;
    isLifetime: boolean;
    daysRemaining: number;
    status: string;
    key: {
        id: string;
        value: string;
        isPermanent: boolean;
        status: string;
    };
    product: {
        id: string;
        name: string;
    };
}>;
export declare function getClientByUsername(username: string): Promise<{
    id: string;
    username: string;
    hwid: string | null;
    hwidFormat: "machine" | "mac" | null;
    hwidDisplay: string | null;
    hwidBound: boolean;
    hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
    lastAttemptHwid: string | null;
    lastAttemptHwidDisplay: string | null;
    discordId: string | null;
    isBanned: boolean;
    loginCount: number;
    lastLoginAt: Date | null;
    createdAt: Date;
    expiresAt: Date;
    isLifetime: boolean;
    daysRemaining: number;
    status: string;
    key: {
        id: string;
        value: string;
        isPermanent: boolean;
        status: string;
    };
    product: {
        id: string;
        name: string;
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
export declare function resetClientHwidByLookup(lookup: ClientLookup): Promise<{
    message: string;
    data: {
        id: string;
        username: string;
        hwid: string | null;
        hwidFormat: "machine" | "mac" | null;
        hwidDisplay: string | null;
        hwidBound: boolean;
        hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
        lastAttemptHwid: string | null;
        lastAttemptHwidDisplay: string | null;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
        lastLoginAt: Date | null;
        createdAt: Date;
        expiresAt: Date;
        isLifetime: boolean;
        daysRemaining: number;
        status: string;
        key: {
            id: string;
            value: string;
            isPermanent: boolean;
            status: string;
        };
        product: {
            id: string;
            name: string;
        };
    };
}>;
export declare function changeClientPassword(id: string, password: string): Promise<{
    message: string;
}>;
export declare function changeClientPasswordByLookup(lookup: ClientLookup & {
    password: string;
}): Promise<{
    message: string;
    data: {
        id: string;
        username: string;
        hwid: string | null;
        hwidFormat: "machine" | "mac" | null;
        hwidDisplay: string | null;
        hwidBound: boolean;
        hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
        lastAttemptHwid: string | null;
        lastAttemptHwidDisplay: string | null;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
        lastLoginAt: Date | null;
        createdAt: Date;
        expiresAt: Date;
        isLifetime: boolean;
        daysRemaining: number;
        status: string;
        key: {
            id: string;
            value: string;
            isPermanent: boolean;
            status: string;
        };
        product: {
            id: string;
            name: string;
        };
    };
}>;
export declare function linkClientDiscord(id: string, discordId: string): Promise<{
    message: string;
    data: {
        id: string;
        username: string;
        hwid: string | null;
        hwidFormat: "machine" | "mac" | null;
        hwidDisplay: string | null;
        hwidBound: boolean;
        hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
        lastAttemptHwid: string | null;
        lastAttemptHwidDisplay: string | null;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
        lastLoginAt: Date | null;
        createdAt: Date;
        expiresAt: Date;
        isLifetime: boolean;
        daysRemaining: number;
        status: string;
        key: {
            id: string;
            value: string;
            isPermanent: boolean;
            status: string;
        };
        product: {
            id: string;
            name: string;
        };
    };
}>;
export declare function linkClientDiscordByLookup(body: {
    clientId?: string;
    username?: string;
    key?: string;
    discordId: string;
}): Promise<{
    message: string;
    data: {
        id: string;
        username: string;
        hwid: string | null;
        hwidFormat: "machine" | "mac" | null;
        hwidDisplay: string | null;
        hwidBound: boolean;
        hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
        lastAttemptHwid: string | null;
        lastAttemptHwidDisplay: string | null;
        discordId: string | null;
        isBanned: boolean;
        loginCount: number;
        lastLoginAt: Date | null;
        createdAt: Date;
        expiresAt: Date;
        isLifetime: boolean;
        daysRemaining: number;
        status: string;
        key: {
            id: string;
            value: string;
            isPermanent: boolean;
            status: string;
        };
        product: {
            id: string;
            name: string;
        };
    };
}>;
export declare function unlinkClientDiscord(id: string): Promise<{
    message: string;
}>;
export declare function deleteClient(id: string): Promise<{
    message: string;
}>;
/** Normaliza HWIDs inválidos/placeholder gravados antes da correção. */
export declare function repairInvalidClientHwids(): Promise<{
    message: string;
    fixed: number;
    cleared: number;
    scanned: number;
}>;
