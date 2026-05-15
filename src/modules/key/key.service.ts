import { keyRepository } from "./key.repository";
import { productRepository } from "../products/product.repository";
import { generateUniqueKeys } from "../../utils/keyGenerator";
import { AppError } from "../../utils/AppError";
import { KeyStatus } from "@prisma/client";

export async function generateKeys(data: {
  productId: string;
  quantity: number;
  createdById: string;
  customerEmail?: string;
  customerName?: string;
  expiresAt?: Date;
}) {
  const product = await productRepository.findById(data.productId);
  if (!product) throw new AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");
  if (!product.isActive) throw new AppError("Produto inativo", 400, "PRODUCT_INACTIVE");

  const values = await generateUniqueKeys(data.quantity, keyRepository.valueExists);

  await keyRepository.createMany(
    values.map((value) => ({
      value,
      productId: data.productId,
      createdById: data.createdById,
      customerEmail: data.customerEmail,
      customerName: data.customerName,
      expiresAt: data.expiresAt,
    }))
  );

  return { generated: values.length, keys: values };
}

export async function listKeys(filters: {
  page: number;
  limit: number;
  status?: KeyStatus;
  productId?: string;
  search?: string;
}) {
  return keyRepository.findPaginated(filters);
}

export async function getKey(id: string) {
  const key = await keyRepository.findById(id);
  if (!key) throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
  return key;
}

export async function revokeKey(id: string) {
  const key = await keyRepository.findById(id);
  if (!key) throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
  if (key.status === "REVOKED" || key.status === "USED")
    throw new AppError("Key já inativa", 400, "KEY_ALREADY_INACTIVE");
  return keyRepository.revoke(id);
}

export async function updateKey(id: string, data: { customerEmail?: string; customerName?: string; expiresAt?: Date }) {
  const key = await keyRepository.findById(id);
  if (!key) throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
  return keyRepository.update(id, data);
}

export async function deleteKey(id: string) {
  const key = await keyRepository.findById(id);
  if (!key) throw new AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
  if (key.status !== "ACTIVE" || key.activatedAt)
    throw new AppError("Apenas keys ativas e não utilizadas podem ser deletadas", 409, "KEY_CANNOT_BE_DELETED");
  return keyRepository.delete(id);
}