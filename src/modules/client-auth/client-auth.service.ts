import bcrypt from "bcrypt";
import prisma from "../../prisma/client";
import { AppError } from "../../utils/AppError";
import { logger } from "../../utils/logger";
import { KeyStatus, ValidationResult } from "../../prisma/enums";
import { notifyClientLoginFailed, notifyKeyScanning } from "../logs/log-alerts.service";
import { logRepository } from "../logs/log.repository";
import { evaluateAutoBlock } from "../security/ip-block.service";
import { isHwidBanned } from "../banned-hwid/banned-hwid.service";
import {
  hwidsEqual,
  isHwidBound,
  normalizeHwid,
  resolveHwidForBinding,
} from "../../utils/hwid";

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

async function afterClientFailure(params: {
  ipAddress: string;
  username: string;
  reason: string;
  action: "LOGIN" | "REGISTER";
  hwid?: string | null;
}): Promise<void> {
  await evaluateAutoBlock(params.ipAddress, params.action === "REGISTER" && params.reason === "INVALID_KEY" ? "KEY_SCANNING" : "CLIENT_LOGIN");

  const since = new Date(Date.now() - 15 * 60 * 1000);
  const attemptsFromIp = await logRepository.countRecentFailuresByIp(params.ipAddress, since, "client");

  if (params.reason === "INVALID_KEY") {
    const invalidKeys = await logRepository.countRecentInvalidKeysByIp(params.ipAddress, since);
    void notifyKeyScanning({ ip: params.ipAddress, invalidAttempts: invalidKeys });
  }

  void notifyClientLoginFailed({
    username: params.username,
    ip: params.ipAddress,
    reason: params.reason,
    action: params.action,
    hwid: params.hwid,
    attemptsFromIp,
  });
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

async function assertHwidNotBanned(
  hwid: string,
  ctx: { username: string; ipAddress: string; action: "LOGIN" | "REGISTER" }
): Promise<void> {
  if (!hwid?.trim()) return;
  if (await isHwidBanned(hwid)) {
    await logClientAccess({
      username: ctx.username,
      ipAddress: ctx.ipAddress,
      hwid,
      action: ctx.action,
      success: false,
      reason: "HWID_BANNED",
    });
    await afterClientFailure({
      ipAddress: ctx.ipAddress,
      username: ctx.username,
      reason: "HWID_BANNED",
      action: ctx.action,
      hwid,
    });
    throw new AppError("HWID banido", 403, "HWID_BANNED");
  }
}

async function logClientAccess(data: {
  clientId?: string | null;
  username: string;
  ipAddress: string;
  hwid?: string | null;
  action: "LOGIN" | "REGISTER";
  success: boolean;
  reason?: string;
}) {
  await prisma.clientAccessLog.create({
    data: {
      clientId: data.clientId ?? null,
      usernameAttempted: data.username,
      ipAddress: data.ipAddress,
      hwid: normalizeHwid(data.hwid) ?? null,
      action: data.action,
      success: data.success,
      reason: data.reason ?? null,
    },
  });
}

export async function registerClientService(input: ClientRegisterInput) {
  const { username, password, license, hwid, ipAddress } = input;

  const canonicalHwid = hwid.trim() ? resolveHwidForBinding(hwid) : null;
  await assertHwidNotBanned(canonicalHwid ?? "", { username, ipAddress, action: "REGISTER" });

  const key = await prisma.key.findUnique({
    where: { value: license.trim() },
    include: { product: true, client: true },
  });

  if (!key) {
    await logClientAccess({
      username,
      ipAddress,
      hwid,
      action: "REGISTER",
      success: false,
      reason: "INVALID_KEY",
    });
    await afterClientFailure({ ipAddress, username, reason: "INVALID_KEY", action: "REGISTER", hwid });
    throw new AppError("Key invalida", 400, "INVALID_KEY");
  }

  if (key.status === KeyStatus.REVOKED) {
    await logKeyAttempt(key.id, ipAddress, ValidationResult.REVOKED);
    await logClientAccess({
      username,
      ipAddress,
      hwid,
      action: "REGISTER",
      success: false,
      reason: "KEY_REVOKED",
    });
    throw new AppError("Key revogada", 403, "KEY_REVOKED");
  }

  if (key.status === KeyStatus.PAUSED) {
    await logClientAccess({
      username,
      ipAddress,
      hwid,
      action: "REGISTER",
      success: false,
      reason: "KEY_PAUSED",
    });
    throw new AppError("Key pausada", 403, "KEY_PAUSED");
  }

  if (key.status === KeyStatus.USED || key.client) {
    await logKeyAttempt(key.id, ipAddress, ValidationResult.ALREADY_USED);
    await logClientAccess({
      username,
      ipAddress,
      hwid,
      action: "REGISTER",
      success: false,
      reason: "KEY_ALREADY_USED",
    });
    throw new AppError("Key ja utilizada", 409, "KEY_ALREADY_USED");
  }

  if (key.status === KeyStatus.EXPIRED) {
    await logKeyAttempt(key.id, ipAddress, ValidationResult.EXPIRED);
    await logClientAccess({
      username,
      ipAddress,
      hwid,
      action: "REGISTER",
      success: false,
      reason: "KEY_EXPIRED",
    });
    throw new AppError("Key expirada", 403, "KEY_EXPIRED");
  }

  if (key.expiresAt && key.expiresAt < new Date()) {
    await prisma.key.update({ where: { id: key.id }, data: { status: KeyStatus.EXPIRED } });
    await logKeyAttempt(key.id, ipAddress, ValidationResult.EXPIRED);
    await logClientAccess({
      username,
      ipAddress,
      hwid,
      action: "REGISTER",
      success: false,
      reason: "KEY_EXPIRED",
    });
    throw new AppError("Key expirada", 403, "KEY_EXPIRED");
  }

  if (!key.product.isActive) {
    await logClientAccess({
      username,
      ipAddress,
      hwid,
      action: "REGISTER",
      success: false,
      reason: "PRODUCT_INACTIVE",
    });
    throw new AppError("Produto inativo", 400, "PRODUCT_INACTIVE");
  }

  const existingUser = await prisma.client.findUnique({ where: { username } });
  if (existingUser) {
    await logClientAccess({
      clientId: existingUser.id,
      username,
      ipAddress,
      hwid,
      action: "REGISTER",
      success: false,
      reason: "USERNAME_TAKEN",
    });
    throw new AppError("Usuario ja cadastrado", 409, "USERNAME_TAKEN");
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  const expiresAt = computeClientExpiry(key);

  const client = await prisma.$transaction(async (tx) => {
    const created = await tx.client.create({
      data: {
        username,
        passwordHash,
        hwid: canonicalHwid,
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
        // Vincula o nome do cliente que registrou a key (visível na listagem de usuários)
        customerName: key.customerName ?? username,
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

  await logClientAccess({
    clientId: client.id,
    username,
    ipAddress,
    hwid,
    action: "REGISTER",
    success: true,
  });

  logger.info("Cliente cadastrado", { clientId: client.id, username, keyId: key.id });

  return {
    message: "Conta criada com sucesso",
    user: formatUserPayload(client),
  };
}

export async function loginClientService(input: ClientAuthInput) {
  const { username, password, hwid, ipAddress } = input;

  const incomingHwid = hwid.trim() ? resolveHwidForBinding(hwid) : null;
  await assertHwidNotBanned(incomingHwid ?? "", { username, ipAddress, action: "LOGIN" });

  const client = await prisma.client.findUnique({
    where: { username },
    include: { key: { include: { product: true } } },
  });

  if (!client) {
    await logClientAccess({
      username,
      ipAddress,
      hwid,
      action: "LOGIN",
      success: false,
      reason: "USER_NOT_FOUND",
    });
    await afterClientFailure({ ipAddress, username, reason: "USER_NOT_FOUND", action: "LOGIN", hwid });
    throw new AppError("Credenciais invalidas", 401, "INVALID_CREDENTIALS");
  }

  if (client.isBanned) {
    await logClientAccess({
      clientId: client.id,
      username,
      ipAddress,
      hwid,
      action: "LOGIN",
      success: false,
      reason: "USER_BANNED",
    });
    await afterClientFailure({ ipAddress, username, reason: "USER_BANNED", action: "LOGIN", hwid });
    throw new AppError("Conta banida", 403, "USER_BANNED");
  }

  const passwordMatch = await bcrypt.compare(password, client.passwordHash);
  if (!passwordMatch) {
    await logClientAccess({
      clientId: client.id,
      username,
      ipAddress,
      hwid,
      action: "LOGIN",
      success: false,
      reason: "WRONG_PASSWORD",
    });
    await afterClientFailure({ ipAddress, username, reason: "WRONG_PASSWORD", action: "LOGIN", hwid });
    throw new AppError("Credenciais invalidas", 401, "INVALID_CREDENTIALS");
  }

  const lifetime = isLifetimeKey(client.key) || isLifetimeExpiry(client.expiresAt);

  if (!lifetime && client.expiresAt < new Date()) {
    await logClientAccess({
      clientId: client.id,
      username,
      ipAddress,
      hwid,
      action: "LOGIN",
      success: false,
      reason: "SUBSCRIPTION_EXPIRED",
    });
    throw new AppError("Assinatura expirada", 403, "SUBSCRIPTION_EXPIRED");
  }

  if (client.key.status === KeyStatus.REVOKED) {
    await logClientAccess({
      clientId: client.id,
      username,
      ipAddress,
      hwid,
      action: "LOGIN",
      success: false,
      reason: "KEY_REVOKED",
    });
    throw new AppError("Licenca revogada", 403, "KEY_REVOKED");
  }

  if (client.key.status === KeyStatus.PAUSED) {
    await logClientAccess({
      clientId: client.id,
      username,
      ipAddress,
      hwid,
      action: "LOGIN",
      success: false,
      reason: "KEY_PAUSED",
    });
    throw new AppError("Licenca pausada", 403, "KEY_PAUSED");
  }

  const storedHwid = normalizeHwid(client.hwid);

  if (isHwidBound(storedHwid) && incomingHwid && !hwidsEqual(storedHwid, incomingHwid)) {
    await logKeyAttempt(client.keyId, ipAddress, ValidationResult.INVALID_KEY);
    await logClientAccess({
      clientId: client.id,
      username,
      ipAddress,
      hwid: incomingHwid,
      action: "LOGIN",
      success: false,
      reason: "HWID_MISMATCH",
    });

    await afterClientFailure({ ipAddress, username, reason: "HWID_MISMATCH", action: "LOGIN", hwid: incomingHwid });
    throw new AppError("HWID nao autorizado", 403, "HWID_MISMATCH");
  }

  if (isHwidBound(storedHwid) && !incomingHwid) {
    await logClientAccess({
      clientId: client.id,
      username,
      ipAddress,
      hwid: null,
      action: "LOGIN",
      success: false,
      reason: "HWID_MISSING",
    });
    throw new AppError(
      "HWID nao enviado pelo cliente. Atualize o loader ou reinstale o cheat.",
      403,
      "HWID_MISSING"
    );
  }

  const clientUpdate: {
    hwid: string | null;
    lastLoginAt: Date;
    loginCount: { increment: number };
    expiresAt?: Date;
  } = {
    hwid: storedHwid ?? incomingHwid,
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

  await logClientAccess({
    clientId: client.id,
    username,
    ipAddress,
    hwid,
    action: "LOGIN",
    success: true,
  });

  logger.info("Login cliente", { clientId: client.id, username, ipAddress });

  return {
    message: "Login bem-sucedido",
    user: formatUserPayload(updated),
  };
}
