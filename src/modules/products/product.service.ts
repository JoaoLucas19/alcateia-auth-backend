import { productRepository } from "./product.repository";
import { AppError } from "../../utils/AppError";

export async function createProduct(data: { name: string; description?: string }) {
  return productRepository.create(data);
}

export async function listProducts() {
  return productRepository.findAll();
}

export async function getProduct(id: string) {
  const product = await productRepository.findById(id);
  if (!product) throw new AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");

  // Agrupa contagem de keys por status
  const stats = product.keys.reduce(
    (acc, k) => { acc[k.status] = (acc[k.status] || 0) + 1; return acc; },
    {} as Record<string, number>
  );

  return { ...product, keys: undefined, stats };
}

export async function updateProduct(id: string, data: { name?: string; description?: string; isActive?: boolean }) {
  const product = await productRepository.findById(id);
  if (!product) throw new AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");
  return productRepository.update(id, data);
}

export async function deleteProduct(id: string) {
  const product = await productRepository.findById(id);
  if (!product) throw new AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");

  const hasKeys = await productRepository.hasKeys(id);
  if (hasKeys) throw new AppError("Produto possui keys associadas e não pode ser deletado", 409, "PRODUCT_HAS_KEYS");

  return productRepository.delete(id);
}