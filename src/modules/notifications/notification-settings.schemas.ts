import { z } from "zod";
import { isValidDiscordWebhookUrl } from "./discord.validation";

export const updateNotificationSettingsSchema = z
  .object({
    discordWebhookUrl: z.string().max(4096).optional(),
    discordAlertsEnabled: z.boolean().optional(),
    discordNotifyBruteForce: z.boolean().optional(),
    discordNotifyKeyScanning: z.boolean().optional(),
    discordNotifyHighThreat: z.boolean().optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (data.discordWebhookUrl === undefined) return;
    const trimmed = data.discordWebhookUrl.trim();
    if (trimmed === "") return;
    if (!isValidDiscordWebhookUrl(trimmed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "URL inválida (use https://discord.com/api/webhooks/…)",
        path: ["discordWebhookUrl"],
      });
    }
  });
