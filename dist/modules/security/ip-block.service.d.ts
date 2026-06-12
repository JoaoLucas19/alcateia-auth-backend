type BlockSource = "ADMIN_LOGIN" | "CLIENT_LOGIN" | "KEY_SCANNING";
export declare function isIpBlocked(ip: string): Promise<boolean>;
export declare function assertIpNotBlocked(ip: string): Promise<void>;
export declare function evaluateAutoBlock(ip: string, source: BlockSource): Promise<void>;
export declare function cleanupExpiredIpBlocks(): Promise<number>;
export {};
