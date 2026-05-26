export declare const NOTIFICATION_SETTINGS_ID = "singleton";
/** Linha da tabela notification_settings (espelha o schema Prisma) */
export interface NotificationSettingsRow {
    id: string;
    discordWebhookUrl: string | null;
    discordAlertsEnabled: boolean;
    discordNotifyBruteForce: boolean;
    discordNotifyKeyScanning: boolean;
    discordNotifyHighThreat: boolean;
    createdAt: Date;
    updatedAt: Date;
}
type NotificationSettingsWriteData = {
    discordWebhookUrl?: string | null;
    discordAlertsEnabled?: boolean;
    discordNotifyBruteForce?: boolean;
    discordNotifyKeyScanning?: boolean;
    discordNotifyHighThreat?: boolean;
};
export declare function findNotificationSettings(): Promise<NotificationSettingsRow | null>;
export type NotificationSettingsPatch = NotificationSettingsWriteData;
export declare function upsertNotificationSettings(patch: NotificationSettingsPatch): Promise<NotificationSettingsRow>;
export {};
