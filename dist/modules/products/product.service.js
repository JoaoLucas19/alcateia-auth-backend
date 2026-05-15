"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = createProduct;
exports.listProducts = listProducts;
exports.getProduct = getProduct;
exports.updateProduct = updateProduct;
exports.deleteProduct = deleteProduct;
const product_repository_1 = require("./product.repository");
const AppError_1 = require("../../utils/AppError");
async function createProduct(data) {
    return product_repository_1.productRepository.create(data);
}
async function listProducts() {
    return product_repository_1.productRepository.findAll();
}
async function getProduct(id) {
    const product = await product_repository_1.productRepository.findById(id);
    if (!product)
        throw new AppError_1.AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");
    // Agrupa contagem de keys por status
    const stats = product.keys.reduce((acc, k) => { acc[k.status] = (acc[k.status] || 0) + 1; return acc; }, {});
    return { ...product, keys: undefined, stats };
}
async function updateProduct(id, data) {
    const product = await product_repository_1.productRepository.findById(id);
    if (!product)
        throw new AppError_1.AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");
    return product_repository_1.productRepository.update(id, data);
}
async function deleteProduct(id) {
    const product = await product_repository_1.productRepository.findById(id);
    if (!product)
        throw new AppError_1.AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");
    const hasKeys = await product_repository_1.productRepository.hasKeys(id);
    if (hasKeys)
        throw new AppError_1.AppError("Produto possui keys associadas e não pode ser deletado", 409, "PRODUCT_HAS_KEYS");
    return product_repository_1.productRepository.delete(id);
}
//# sourceMappingURL=product.service.js.map