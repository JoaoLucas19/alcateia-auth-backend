export interface ClientAuthInput {
    username: string;
    password: string;
    hwid: string;
    ipAddress: string;
}
export interface ClientRegisterInput extends ClientAuthInput {
    license: string;
}
export declare function registerClientService(input: ClientRegisterInput): Promise<{
    message: string;
    user: {
        username: string;
        productName: string;
        daysRemaining: number;
        expirationDate: string;
        timesUsed: number;
        maxUsers: number;
        isBanned: boolean;
    };
}>;
export declare function loginClientService(input: ClientAuthInput): Promise<{
    message: string;
    user: {
        username: string;
        productName: string;
        daysRemaining: number;
        expirationDate: string;
        timesUsed: number;
        maxUsers: number;
        isBanned: boolean;
    };
}>;
