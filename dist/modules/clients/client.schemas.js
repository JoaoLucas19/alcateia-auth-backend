"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkDiscordLookupSchema = exports.patchDiscordSchema = exports.patchPasswordSchema = exports.changePasswordSchema = exports.clientLookupSchema = void 0;
const zod_1 = require("zod");
exports.clientLookupSchema = zod_1.z
    .object({
    clientId: zod_1.z.string().uuid().optional(),
    username: zod_1.z.string().min(1).optional(),
    key: zod_1.z.string().min(1).optional(),
    discordId: zod_1.z.string().min(1).optional(),
})
    .refine((d) => d.clientId || d.username || d.key || d.discordId, {
    message: "Informe clientId, username, key ou discordId",
});
exports.changePasswordSchema = zod_1.z
    .object({
    password: zod_1.z.string().min(4, "Senha deve ter no mínimo 4 caracteres").max(128),
    clientId: zod_1.z.string().uuid().optional(),
    username: zod_1.z.string().min(1).optional(),
    key: zod_1.z.string().min(1).optional(),
    discordId: zod_1.z.string().min(1).optional(),
})
    .refine((d) => d.clientId || d.username || d.key || d.discordId, {
    message: "Informe clientId, username, key ou discordId",
});
exports.patchPasswordSchema = zod_1.z.object({
    password: zod_1.z.string().min(4).max(128),
});
exports.patchDiscordSchema = zod_1.z.object({
    discordId: zod_1.z.union([zod_1.z.string().regex(/^\d+$/, "discordId deve ser numérico"), zod_1.z.null()]),
});
/** Vincular Discord: localizar cliente por id/username/key e definir discordId */
exports.linkDiscordLookupSchema = zod_1.z
    .object({
    clientId: zod_1.z.string().uuid().optional(),
    username: zod_1.z.string().min(1).optional(),
    key: zod_1.z.string().min(1).optional(),
    discordId: zod_1.z.string().min(1).regex(/^\d+$/, "discordId deve ser numérico"),
})
    .refine((d) => d.clientId || d.username || d.key, {
    message: "Informe clientId, username ou key para localizar o cliente",
});
//# sourceMappingURL=client.schemas.js.map