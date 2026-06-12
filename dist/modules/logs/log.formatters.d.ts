import type { UnifiedLogEntry } from "./log.types";
export declare function reasonLabel(reason: string | null | undefined): string;
export declare function keyResultLabel(result: string): string;
export declare function maskKey(value: string | null | undefined): string | undefined;
export declare function maskHwid(value: string | null | undefined): string | undefined;
export declare function buildAdminAccessEntry(row: {
    id: string;
    adminId: string | null;
    usernameAttempted: string;
    ipAddress: string;
    success: boolean;
    reason: string | null;
    createdAt: Date;
}): UnifiedLogEntry;
export declare function buildClientAccessEntry(row: {
    id: string;
    clientId: string | null;
    usernameAttempted: string;
    ipAddress: string;
    hwid: string | null;
    action: string;
    success: boolean;
    reason: string | null;
    createdAt: Date;
}): UnifiedLogEntry;
export declare function buildKeyUsageEntry(row: {
    id: string;
    keyId: string;
    ipAddress: string;
    userAgent: string | null;
    result: string;
    attemptedAt: Date;
    key?: {
        value: string;
    } | null;
}): UnifiedLogEntry;
export declare function buildIpBlockEntry(row: {
    id: string;
    ipAddress: string;
    reason: string | null;
    source: string | null;
    blockedAt: Date;
    expiresAt: Date | null;
}): UnifiedLogEntry;
export declare function matchesLogSearch(entry: UnifiedLogEntry, search: string): boolean;
