export type AuthToastType = "success" | "info" | "warning" | "error";
export interface AuthToastNotification {
    type: AuthToastType;
    title: string;
    message: string;
}
export declare function buildLoginNotification(username: string): AuthToastNotification;
export declare function buildLogoutNotification(username: string): AuthToastNotification;
