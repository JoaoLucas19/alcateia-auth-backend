import { keyRepository } from "./key.repository";
import { productRepository } from "../products/product.repository";
import { clientRepository } from "../clients/client.repository";
import { generateUniqueKeys } from "../../utils/keyGenerator";
import { AppError } from "../../utils/AppError";
import { KeyStatus } from "../../prisma/enums";
import { resellerRepository } from "../resellers/reseller.repository";
import { recordKeyGeneration } from "../resellers/reseller.service";

const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");

function parseExpiresAt(value?: Date | string): Date | undefined {
  if (value == null) return undefined;
  return value instanceof Date ? value : new Date(value);
}

function isPermanentKey(key: {
  isPermanent: boolean;
  expiresAt: Date | null;
}): boolean {
  if (key.isPermanent) return true;
  if (!key.expiresAt) return false;
  return key.expiresAt.getTime() >= LIFETIME_EXPIRY.getTime();
}

function canDeleteKey(key: {
  status: KeyStatus;
  activatedAt: Date | null;
  isPermanent: boolean;
  expiresAt: Date | null;
}): boolean {
  // Permanentes: admin pode excluir (remove cliente vinculado se houver)
  if (isPermanentKey(key)) return true;
  if (key.status === "USED" || key.status === "REVOKED" || key.status === "PAUSED") return true;
  return key.status === "ACTIVE" && !key.activatedAt;
}

function canPauseKey(key: { status: KeyStatus }): boolean {
  return key.status === "ACTIVE" || key.status === "USED";
}

function canUnpauseKey(key: { status: KeyStatus }): boolean {
  return key.status === "PAUSED";
}

function resolveStatusAfterUnpause(key: {
  activatedAt: Date | null;
  client?: { username: string } | null;
}): KeyStatus {
  if (key.client || key.activatedAt) return KeyStatus.USED;
  return KeyStatus.ACTIVE;
}

function withKeyFlags<T extends {
  status: KeyStatus;
  activatedAt: Date | null;
  isPermanent: boolean;
  expiresAt: Date | null;
  customerName: string | null;
  client?: { username: string } | null;
}>(key: T) {
  return {
    ...key,
    customerName: key.customerName ?? key.client?.username ?? null,
    registeredUsername: key.client?.username ?? null,
    canDelete: canDeleteKey(key),
    canPause: canPauseKey(key),
    canUnpause: canUnpauseKey(key),
  };
}

// Limpeza automática de keys expiradas
async function cleanupExpiredKeys() {
  await keyRepository.markExpiredKeys();
  await keyRepository.deleteExpiredKeys();
}

/** Limpeza explícita (bot/admin) — retorna contagens */
export async function runCleanupExpiredKeys() {
  const marked = await keyRepository.markExpiredKeys();
  const deleted = await keyRepository.deleteExpiredKeys();
  return {
    markedExpired: marked.count,
    deleted: deleted.count,
    message: "Limpeza de keys expiradas concluída",
  };
}

/** Remove todas as keys permanentes (inclui usadas/revogadas, com cliente se existir). */
export async function runCleanupPermanentKeys(onlyUnused = false) {
  const ids = await keyRepository.findPermanentKeyIds(onlyUnused);
  let deleted = 0;

  for (const id of ids) {
    await keyRepository.deleteWithDependencies(id);
    deleted++;
  }

  return {
    deleted,
    onlyUnused,
    message: onlyUnused
      ? "Keys permanentes não utilizadas removidas"
      : "Todas as keys permanentes foram removidas",
  };
}

export async function generateKeys(data: {
  productId: string;
  quantity: number;
  createdById: string;
  customerEmail?: string;
  customerName?: string;
  expiresAt?: Date;
  isPermanent?: boolean;
  resellerId?: string;
  actorUsername?: string;
}) {

  const product = await productRepository.findById(data.productId);

  if (!product)
    throw new AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");

  if (!product.isActive)
    throw new AppError("Produto inativo", 400, "PRODUCT_INACTIVE");

  if (data.resellerId) {
    const reseller = await resellerRepository.findById(data.resellerId);
    if (!reseller) throw new AppError("Loja/revendedor não encontrado", 404, "RESELLER_NOT_FOUND");
  }

  const values = await generateUniqueKeys(
    data.quantity,
    keyRepository.valueExists
  );

  const isPermanent = data.isPermanent === true;

  const expiresAt = isPermanent
    ? LIFETIME_EXPIRY
    : parseExpiresAt(data.expiresAt);

  await keyRepository.createMany(
    values.map((value) => ({
      value,
      productId: data.productId,
      createdById: data.createdById,
      customerEmail: data.customerEmail,
      customerName: data.customerName,
      isPermanent,
      expiresAt,
      resellerId: data.resellerId,
    }))
  );

  if (data.resellerId) {
    await recordKeyGeneration(
      data.resellerId,
      values.length,
      data.actorUsername ?? "admin"
    );
  }

  return {
    generated: values.length,
    keys: values,
    resellerId: data.resellerId ?? null,
  };
}

export async function listKeys(filters: {
  page: number;
  limit: number;
  status?: KeyStatus;
  productId?: string;
  search?: string;
  resellerId?: string;
}) {

  // Remove automaticamente keys expiradas
  await cleanupExpiredKeys();

  const result = await keyRepository.findPaginated(filters);

  return {
    ...result,
    data: result.data.map((key) => withKeyFlags(key)),
  };
}

export async function getKey(id: string) {

  const key = await keyRepository.findById(id);

  if (!key)
    throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");

  return withKeyFlags(key);
}

export async function revokeKey(id: string) {
  const key = await keyRepository.findById(id);

  if (!key) throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");

  if (key.status === "REVOKED" || key.status === "USED") {
    throw new AppError("Key já inativa", 400, "KEY_ALREADY_INACTIVE");
  }

  return keyRepository.revoke(id);
}

export async function pauseKey(id: string) {
  const key = await keyRepository.findById(id);

  if (!key) throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");

  if (key.status === "PAUSED") {
    throw new AppError("Key já está pausada", 400, "KEY_ALREADY_PAUSED");
  }

  if (!canPauseKey(key)) {
    throw new AppError(
      "Somente keys ativas ou usadas podem ser pausadas",
      400,
      "KEY_CANNOT_BE_PAUSED"
    );
  }

  const updated = await keyRepository.setStatus(id, KeyStatus.PAUSED);
  return withKeyFlags(updated);
}

export async function unpauseKey(id: string) {
  const key = await keyRepository.findById(id);

  if (!key) throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");

  if (!canUnpauseKey(key)) {
    throw new AppError("Key não está pausada", 400, "KEY_NOT_PAUSED");
  }

  const nextStatus = resolveStatusAfterUnpause(key);
  const updated = await keyRepository.setStatus(id, nextStatus);
  return withKeyFlags(updated);
}

export async function updateKey(
  id: string,
  data: {
    customerEmail?: string;
    customerName?: string;
    expiresAt?: Date;
    isPermanent?: boolean;
  }
) {

  const key = await keyRepository.findById(id);

  if (!key)
    throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");

  const patch: {
    customerEmail?: string;
    customerName?: string;
    expiresAt?: Date | null;
    isPermanent?: boolean;
  } = { ...data };

  if (data.expiresAt !== undefined) {
    patch.expiresAt = parseExpiresAt(data.expiresAt);
  }

  if (data.isPermanent === true) {
    patch.isPermanent = true;
    patch.expiresAt = LIFETIME_EXPIRY;
  }

  const updated = await keyRepository.update(id, patch);

  const linkedClient = await clientRepository.findByKeyId(id);
  if (linkedClient && (data.expiresAt !== undefined || data.isPermanent === true)) {
    const clientExpiry =
      data.isPermanent === true
        ? LIFETIME_EXPIRY
        : patch.expiresAt instanceof Date
          ? patch.expiresAt
          : patch.expiresAt
            ? new Date(patch.expiresAt as Date)
            : linkedClient.expiresAt;
    await clientRepository.updateExpiresAt(linkedClient.id, clientExpiry);
  }

  return updated;
}

export async function deleteKey(id: string) {
  const key = await keyRepository.findById(id);

  if (!key) throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");

  if (!canDeleteKey(key)) {
    throw new AppError("Esta key não pode ser deletada", 409, "KEY_CANNOT_BE_DELETED");
  }

  return keyRepository.deleteWithDependencies(id);
}