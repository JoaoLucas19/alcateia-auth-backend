interface LoginInput {
    username: string;
    password: string;
    ip: string;
}
export declare function loginService({ username, password, ip }: LoginInput): Promise<{
    token: string;
    expiresIn: string;
    admin: {
        id: string;
        username: string;
    };
}>;
export declare function logoutService(params: {
    adminId: string;
    username: string;
    ip: string;
}): Promise<void>;
export {};
