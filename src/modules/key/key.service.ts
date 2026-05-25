import { keyRepository } from "./key.repository";
import { productRepository } from "../products/product.repository";
import { generateUniqueKeys } from "../../utils/keyGenerator";
import { AppError } from "../../utils/AppError";
import { KeyStatus } from "@prisma/client";

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
  if (isPermanentKey(key)) return false;
  if (key.status === "USED" || key.status === "REVOKED") return true;
  return key.status === "ACTIVE" && !key.activatedAt;
}

// Limpeza automática de keys expiradas
async function cleanupExpiredKeys() {

  // Marca keys expiradas
  await keyRepository.markExpiredKeys();

  // Remove keys expiradas
  await keyRepository.deleteExpiredKeys();
}

export async function generateKeys(data: {
  productId: string;
  quantity: number;
  createdById: string;
  customerEmail?: string;
  customerName?: string;
  expiresAt?: Date;
  isPermanent?: boolean;
}) {

  const product = await productRepository.findById(data.productId);

  if (!product)
    throw new AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");

  if (!product.isActive)
    throw new AppError("Produto inativo", 400, "PRODUCT_INACTIVE");

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
    }))
  );

  return {
    generated: values.length,
    keys: values,
  };
}

export async function listKeys(filters: {
  page: number;
  limit: number;
  status?: KeyStatus;
  productId?: string;
  search?: string;
}) {

  // Remove automaticamente keys expiradas
  await cleanupExpiredKeys();

  const result = await keyRepository.findPaginated(filters);

  return {
    ...result,
    data: result.data.map((key) => ({
      ...key,
      canDelete: canDeleteKey(key),
    })),
  };
}

export async function getKey(id: string) {

  const key = await keyRepository.findById(id);

  if (!key)
    throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");

  return { ...key, canDelete: canDeleteKey(key) };
}

export async function revokeKey(id: string) {

  const key = await keyRepository.findById(id);

  if (!key)
    throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");

  if (
    key.status === "REVOKED" ||
    key.status === "USED"
  ) {
    throw new AppError(
      "Key já inativa",
      400,
      "KEY_ALREADY_INACTIVE"
    );
  }

  return keyRepository.revoke(id);
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

  return keyRepository.update(id, patch);
}

export async function deleteKey(id: string) {

  const key = await keyRepository.findById(id);

  if (!key)
    throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");

  if (isPermanentKey(key)) {
    throw new AppError(
      "Keys permanentes não podem ser deletadas",
      409,
      "KEY_PERMANENT_CANNOT_DELETE"
    );
  }

  if (!canDeleteKey(key)) {
    throw new AppError(
      "Esta key não pode ser deletada",
      409,
      "KEY_CANNOT_BE_DELETED"
    );
  }

  return keyRepository.deleteWithDependencies(id);
}