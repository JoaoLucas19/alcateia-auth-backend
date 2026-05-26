import { z } from "zod";
export declare const updateNotificationSettingsSchema: z.ZodObject<{
    discordWebhookUrl: z.ZodOptional<z.ZodString>;
    discordAlertsEnabled: z.ZodOptional<z.ZodBoolean>;
    discordNotifyBruteForce: z.ZodOptional<z.ZodBoolean>;
    discordNotifyKeyScanning: z.ZodOptional<z.ZodBoolean>;
    discordNotifyHighThreat: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strict>;
