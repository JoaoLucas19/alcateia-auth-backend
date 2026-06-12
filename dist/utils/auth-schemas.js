"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRegisterSchema = exports.clientLoginSchema = exports.clientPasswordSchema = exports.clientUsernameSchema = exports.adminLoginSchema = exports.adminPasswordSchema = exports.adminUsernameSchema = void 0;
const zod_1 = require("zod");
const USERNAME_REGEX = /^[a-zA-Z0-9_.-]+$/;
exports.adminUsernameSchema = zod_1.z
    .string()
    .trim()
    .min(3, "Username inválido")
    .max(32, "Username inválido")
    .regex(USERNAME_REGEX, "Username inválido");
exports.adminPasswordSchema = zod_1.z
    .string()
    .min(1, "Senha obrigatória")
    .max(128, "Senha inválida");
exports.adminLoginSchema = zod_1.z.object({
    username: exports.adminUsernameSchema,
    password: exports.adminPasswordSchema,
});
exports.clientUsernameSchema = zod_1.z
    .string()
    .trim()
    .min(3, "Usuario deve ter no minimo 3 caracteres")
    .max(32, "Usuario invalido")
    .regex(USERNAME_REGEX, "Usuario invalido");
exports.clientPasswordSchema = zod_1.z
    .string()
    .min(4, "Senha deve ter no minimo 4 caracteres")
    .max(128, "Senha invalida");
exports.clientLoginSchema = zod_1.z.object({
    username: exports.clientUsernameSchema,
    password: exports.clientPasswordSchema,
    hwid: zod_1.z.string().max(256).optional(),
    ipAddress: zod_1.z.string().max(45).optional(),
});
exports.clientRegisterSchema = zod_1.z.object({
    username: exports.clientUsernameSchema,
    password: exports.clientPasswordSchema,
    license: zod_1.z.string().trim().min(8, "Key invalida").max(128, "Key invalida"),
    hwid: zod_1.z.string().max(256).optional(),
    ipAddress: zod_1.z.string().max(45).optional(),
});
//# sourceMappingURL=auth-schemas.js.map