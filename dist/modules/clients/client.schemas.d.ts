import { z } from "zod";
export declare const clientLookupSchema: z.ZodObject<{
    clientId: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    key: z.ZodOptional<z.ZodString>;
    discordId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const changePasswordSchema: z.ZodObject<{
    password: z.ZodString;
    clientId: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    key: z.ZodOptional<z.ZodString>;
    discordId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const patchPasswordSchema: z.ZodObject<{
    password: z.ZodString;
}, z.core.$strip>;
export declare const patchDiscordSchema: z.ZodObject<{
    discordId: z.ZodUnion<readonly [z.ZodString, z.ZodNull]>;
}, z.core.$strip>;
/** Vincular Discord: localizar cliente por id/username/key e definir discordId */
export declare const linkDiscordLookupSchema: z.ZodObject<{
    clientId: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    key: z.ZodOptional<z.ZodString>;
    discordId: z.ZodString;
}, z.core.$strip>;
