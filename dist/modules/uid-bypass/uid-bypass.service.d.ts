export declare function addWhitelistedUid(uid: string, validityDays: number, note?: string): Promise<{
    uid: any;
    expiresAt: any;
    validityDays: any;
}>;
export declare function removeWhitelistedUid(uid: string): Promise<{
    uid: string;
}>;
export declare function checkWhitelistedUid(uid: string): Promise<{
    uid: string;
    whitelisted: boolean;
    expiresAt: any;
}>;
