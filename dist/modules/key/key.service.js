"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKeys = generateKeys;
exports.listKeys = listKeys;
exports.getKey = getKey;
exports.revokeKey = revokeKey;
exports.updateKey = updateKey;
exports.deleteKey = deleteKey;
const key_repository_1 = require("./key.repository");
const product_repository_1 = require("../products/product.repository");
const keyGenerator_1 = require("../../utils/keyGenerator");
const AppError_1 = require("../../utils/AppError");
async function generateKeys(data) {
    const product = await product_repository_1.productRepository.findById(data.productId);
    if (!product)
        throw new AppError_1.AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");
    if (!product.isActive)
        throw new AppError_1.AppError("Produto inativo", 400, "PRODUCT_INACTIVE");
    const values = await (0, keyGenerator_1.generateUniqueKeys)(data.quantity, key_repository_1.keyRepository.valueExists);
    await key_repository_1.keyRepository.createMany(values.map((value) => ({
        value,
        productId: data.productId,
        createdById: data.createdById,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        expiresAt: data.expiresAt,
    })));
    return { generated: values.length, keys: values };
}
async function listKeys(filters) {
    return key_repository_1.keyRepository.findPaginated(filters);
}
async function getKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    return key;
}
async function revokeKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    if (key.status === "REVOKED" || key.status === "USED")
        throw new AppError_1.AppError("Key já inativa", 400, "KEY_ALREADY_INACTIVE");
    return key_repository_1.keyRepository.revoke(id);
}
async function updateKey(id, data) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    return key_repository_1.keyRepository.update(id, data);
}
async function deleteKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    if (key.status !== "ACTIVE" || key.activatedAt)
        throw new AppError_1.AppError("Apenas keys ativas e não utilizadas podem ser deletadas", 409, "KEY_CANNOT_BE_DELETED");
    return key_repository_1.keyRepository.delete(id);
}
//# sourceMappingURL=key.service.js.map