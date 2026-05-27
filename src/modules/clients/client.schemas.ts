import { z } from "zod";

export const clientLookupSchema = z
  .object({
    clientId: z.string().uuid().optional(),
    username: z.string().min(1).optional(),
    key: z.string().min(1).optional(),
    discordId: z.string().min(1).optional(),
  })
  .refine((d) => d.clientId || d.username || d.key || d.discordId, {
    message: "Informe clientId, username, key ou discordId",
  });

export const changePasswordSchema = z
  .object({
    password: z.string().min(4, "Senha deve ter no mínimo 4 caracteres").max(128),
    clientId: z.string().uuid().optional(),
    username: z.string().min(1).optional(),
    key: z.string().min(1).optional(),
    discordId: z.string().min(1).optional(),
  })
  .refine((d) => d.clientId || d.username || d.key || d.discordId, {
    message: "Informe clientId, username, key ou discordId",
  });

export const patchPasswordSchema = z.object({
  password: z.string().min(4).max(128),
});

export const patchDiscordSchema = z.object({
  discordId: z.union([z.string().regex(/^\d+$/, "discordId deve ser numérico"), z.null()]),
});

/** Vincular Discord: localizar cliente por id/username/key e definir discordId */
export const linkDiscordLookupSchema = z
  .object({
    clientId: z.string().uuid().optional(),
    username: z.string().min(1).optional(),
    key: z.string().min(1).optional(),
    discordId: z.string().min(1).regex(/^\d+$/, "discordId deve ser numérico"),
  })
  .refine((d) => d.clientId || d.username || d.key, {
    message: "Informe clientId, username ou key para localizar o cliente",
  });
