import { z } from "zod";

const USERNAME_REGEX = /^[a-zA-Z0-9_.-]+$/;

export const adminUsernameSchema = z
  .string()
  .trim()
  .min(3, "Username inválido")
  .max(32, "Username inválido")
  .regex(USERNAME_REGEX, "Username inválido");

export const adminPasswordSchema = z
  .string()
  .min(1, "Senha obrigatória")
  .max(128, "Senha inválida");

export const adminLoginSchema = z.object({
  username: adminUsernameSchema,
  password: adminPasswordSchema,
});

export const clientUsernameSchema = z
  .string()
  .trim()
  .min(3, "Usuario deve ter no minimo 3 caracteres")
  .max(32, "Usuario invalido")
  .regex(USERNAME_REGEX, "Usuario invalido");

export const clientPasswordSchema = z
  .string()
  .min(4, "Senha deve ter no minimo 4 caracteres")
  .max(128, "Senha invalida");

export const clientLoginSchema = z.object({
  username: clientUsernameSchema,
  password: clientPasswordSchema,
  hwid: z.string().max(256).optional(),
  ipAddress: z.string().max(45).optional(),
});

export const clientRegisterSchema = z.object({
  username: clientUsernameSchema,
  password: clientPasswordSchema,
  license: z.string().trim().min(8, "Key invalida").max(128, "Key invalida"),
  hwid: z.string().max(256).optional(),
  ipAddress: z.string().max(45).optional(),
});
