import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";
import { AppError } from "../../utils/AppError";
import { logger } from "../../utils/logger";
import { env } from "../../config/env";

interface LoginInput {
  username: string;
  password: string;
  ip: string;
}

export async function loginService({ username, password, ip }: LoginInput) {
  const admin = await prisma.admin.findUnique({ where: { username } });

  // Sempre registra tentativa — sucesso ou falha
  if (!admin) {
    await prisma.accessLog.create({
      data: { usernameAttempted: username, ipAddress: ip, success: false, reason: "USER_NOT_FOUND" },
    });
    logger.warn("Login falhou: usuário não encontrado", { username, ip });
    // Mensagem genérica — nunca revela qual campo errou
    throw new AppError("Credenciais inválidas", 401, "INVALID_CREDENTIALS");
  }

  const passwordMatch = await bcrypt.compare(password, admin.passwordHash);

  if (!passwordMatch) {
    await prisma.accessLog.create({
      data: { adminId: admin.id, usernameAttempted: username, ipAddress: ip, success: false, reason: "WRONG_PASSWORD" },
    });
    logger.warn("Login falhou: senha incorreta", { username, ip });
    throw new AppError("Credenciais inválidas", 401, "INVALID_CREDENTIALS");
  }

  // Login bem-sucedido: atualiza lastLoginAt e registra log
  await prisma.admin.update({ where: { id: admin.id }, data: { lastLoginAt: new Date() } });
  await prisma.accessLog.create({
    data: { adminId: admin.id, usernameAttempted: username, ipAddress: ip, success: true },
  });

  logger.info("Login bem-sucedido", { adminId: admin.id, ip });

  const token = jwt.sign(
    { id: admin.id, username: admin.username },
    env.JWT_SECRET,
    { expiresIn: env.JWT_EXPIRES_IN } as jwt.SignOptions
  );

  return { token, expiresIn: env.JWT_EXPIRES_IN, admin: { id: admin.id, username: admin.username } };
}