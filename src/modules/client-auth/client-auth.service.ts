import bcrypt from "bcrypt";
import prisma from "../../prisma/client";
import { AppError } from "../../utils/AppError";
import { logger } from "../../utils/logger";
import { KeyStatus, ValidationResult } from "@prisma/client";

const DEFAULT_SUBSCRIPTION_DAYS = 30;
const BCRYPT_ROUNDS = 12;
/** Data sentinela para keys permanentes (expiresAt null no painel). */
const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");
const LIFETIME_DAYS_REMAINING = 99999;

export interface ClientAuthInput {
  username: string;
  password: string;
  hwid: string;
  ipAddress: string;
}

export interface ClientRegisterInput extends ClientAuthInput {
  license: string;
}

function isLifetimeExpiry(expiresAt: Date): boolean {
  return expiresAt.getTime() >= LIFETIME_EXPIRY.getTime();
}

/** Key permanente = flag isPermanent ou expiresAt null / sentinela 2099. */
function isLifetimeKey(key: { expiresAt: Date | null; isPermanent: boolean }): boolean {
  return key.isPermanent || key.expiresAt === null || isLifetimeExpiry(key.expiresAt);
}

function computeClientExpiry(key: { expiresAt: Date | null; isPermanent: boolean }): Date {
  if (isLifetimeKey(key)) {
    return LIFETIME_EXPIRY;
  }
  if (key.expiresAt && key.expiresAt > new Date()) {
    return key.expiresAt;
  }
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + DEFAULT_SUBSCRIPTION_DAYS);
  return expiry;
}

function daysRemaining(expiresAt: Date): number {
  if (isLifetimeExpiry(expiresAt)) {
    return LIFETIME_DAYS_REMAINING;
  }
  const diff = expiresAt.getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function formatUserPayload(client: {
  username: string;
  isBanned: boolean;
  expiresAt: Date;
  loginCount: number;
  key: { expiresAt: Date | null; isPermanent: boolean; product: { name: string } };
}) {
  const lifetime = isLifetimeKey(client.key) || isLifetimeExpiry(client.expiresAt);

  return {
    username: client.username,
    productName: client.key.product.name,
    daysRemaining: lifetime ? LIFETIME_DAYS_REMAINING : daysRemaining(client.expiresAt),
    expirationDate: lifetime ? "Lifetime" : client.expiresAt.toISOString().split("T")[0],
    isLifetime: lifetime,
    timesUsed: client.loginCount,
    maxUsers: 1,
    isBanned: client.isBanned,
  };
}

async function logKeyAttempt(
  keyId: string | null,
  ipAddress: string,
  result: ValidationResult,
  userAgent?: string
) {
  if (!keyId) return;
  await prisma.keyUsageLog.create({
    data: {
      keyId,
      ipAddress,
      userAgent: userAgent ?? "NeverClient/1.0",
      result,
    },
  });
}

export async function registerClientService(input: ClientRegisterInput) {
  const { username, password, license, hwid, ipAddress } = input;

  const key = await prisma.key.findUnique({
    where: { value: license.trim() },
    include: { product: true, client: true },
  });

  if (!key) {
    throw new AppError("Key invalida", 400, "INVALID_KEY");
  }

  if (key.status === KeyStatus.REVOKED) {
    await logKeyAttempt(key.id, ipAddress, ValidationResult.REVOKED);
    throw new AppError("Key revogada", 403, "KEY_REVOKED");
  }

  if (key.status === KeyStatus.USED || key.client) {
    await logKeyAttempt(key.id, ipAddress, ValidationResult.ALREADY_USED);
    throw new AppError("Key ja utilizada", 409, "KEY_ALREADY_USED");
  }

  if (key.status === KeyStatus.EXPIRED) {
    await logKeyAttempt(key.id, ipAddress, ValidationResult.EXPIRED);
    throw new AppError("Key expirada", 403, "KEY_EXPIRED");
  }

  if (key.expiresAt && key.expiresAt < new Date()) {
    await prisma.key.update({ where: { id: key.id }, data: { status: KeyStatus.EXPIRED } });
    await logKeyAttempt(key.id, ipAddress, ValidationResult.EXPIRED);
    throw new AppError("Key expirada", 403, "KEY_EXPIRED");
  }

  if (!key.product.isActive) {
    throw new AppError("Produto inativo", 400, "PRODUCT_INACTIVE");
  }

  const existingUser = await prisma.client.findUnique({ where: { username } });
  if (existingUser) {
    throw new AppError("Usuario ja cadastrado", 409, "USERNAME_TAKEN");
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const expiresAt = computeClientExpiry(key);

  const client = await prisma.$transaction(async (tx) => {
    const created = await tx.client.create({
      data: {
        username,
        passwordHash,
        hwid,
        expiresAt,
        keyId: key.id,
        loginCount: 1,
        lastLoginAt: new Date(),
      },
      include: { key: { include: { product: true } } },
    });

    await tx.key.update({
      where: { id: key.id },
      data: {
        status: KeyStatus.USED,
        activatedAt: new Date(),
        expiresAt,
        isPermanent: key.isPermanent,
      },
    });

    await tx.keyUsageLog.create({
      data: {
        keyId: key.id,
        ipAddress,
        userAgent: "NeverClient/1.0",
        result: ValidationResult.SUCCESS,
      },
    });

    return created;
  });

  logger.info("Cliente cadastrado", { clientId: client.id, username, keyId: key.id });

  return {
    message: "Conta criada com sucesso",
    user: formatUserPayload(client),
  };
}

export async function loginClientService(input: ClientAuthInput) {
  const { username, password, hwid, ipAddress } = input;

  const client = await prisma.client.findUnique({
    where: { username },
    include: { key: { include: { product: true } } },
  });

  if (!client) {
    throw new AppError("Credenciais invalidas", 401, "INVALID_CREDENTIALS");
  }

  if (client.isBanned) {
    throw new AppError("Conta banida", 403, "USER_BANNED");
  }

  const passwordMatch = await bcrypt.compare(password, client.passwordHash);
  if (!passwordMatch) {
    throw new AppError("Credenciais invalidas", 401, "INVALID_CREDENTIALS");
  }

  const lifetime = isLifetimeKey(client.key) || isLifetimeExpiry(client.expiresAt);

  if (!lifetime && client.expiresAt < new Date()) {
    throw new AppError("Assinatura expirada", 403, "SUBSCRIPTION_EXPIRED");
  }

  if (client.key.status === KeyStatus.REVOKED) {
    throw new AppError("Licenca revogada", 403, "KEY_REVOKED");
  }

  if (client.hwid && client.hwid !== hwid) {
    await logKeyAttempt(client.keyId, ipAddress, ValidationResult.INVALID_KEY);
    throw new AppError("HWID nao autorizado", 403, "HWID_MISMATCH");
  }

  const clientUpdate: { hwid: string; lastLoginAt: Date; loginCount: { increment: number }; expiresAt?: Date } = {
    hwid: client.hwid ?? hwid,
    lastLoginAt: new Date(),
    loginCount: { increment: 1 },
  };

  if (lifetime && !isLifetimeExpiry(client.expiresAt)) {
    clientUpdate.expiresAt = LIFETIME_EXPIRY;
  }

  const updated = await prisma.client.update({
    where: { id: client.id },
    data: clientUpdate,
    include: { key: { include: { product: true } } },
  });

  logger.info("Login cliente", { clientId: client.id, username, ipAddress });

  return {
    message: "Login bem-sucedido",
    user: formatUserPayload(updated),
  };
}
