export declare function notifyAdminLoginFailed(params: {
    username: string;
    ip: string;
    reason: string;
    attemptsFromIp?: number;
}): Promise<void>;
export declare function notifyClientLoginFailed(params: {
    username: string;
    ip: string;
    reason: string;
    action: "LOGIN" | "REGISTER";
    hwid?: string | null;
    attemptsFromIp?: number;
}): Promise<void>;
export declare function notifyIpBlocked(params: {
    ip: string;
    reason: string;
    source: string;
}): Promise<void>;
export declare function notifyKeyScanning(params: {
    ip: string;
    invalidAttempts: number;
}): Promise<void>;
export declare function notifyAdminLoginSuccess(params: {
    username: string;
    ip: string;
}): Promise<void>;
export declare function notifyAdminLogout(params: {
    username: string;
    ip: string;
}): Promise<void>;
