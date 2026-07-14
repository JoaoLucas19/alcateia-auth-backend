export declare function addWhitelistedUid(uid: string, validityDays: number, note?: string): Promise<{
    uid: string;
    expiresAt: string | null;
    validityDays: number;
}>;
export declare function removeWhitelistedUid(uid: string): Promise<{
    uid: string;
}>;
export declare function checkWhitelistedUid(uid: string): Promise<{
    uid: string;
    whitelisted: boolean;
    expiresAt: string | null;
}>;
