"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCleanupExpiredKeys = runCleanupExpiredKeys;
exports.generateKeys = generateKeys;
exports.listKeys = listKeys;
exports.getKey = getKey;
exports.revokeKey = revokeKey;
exports.updateKey = updateKey;
exports.deleteKey = deleteKey;
const key_repository_1 = require("./key.repository");
const product_repository_1 = require("../products/product.repository");
const client_repository_1 = require("../clients/client.repository");
const keyGenerator_1 = require("../../utils/keyGenerator");
const AppError_1 = require("../../utils/AppError");
const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");
function parseExpiresAt(value) {
    if (value == null)
        return undefined;
    return value instanceof Date ? value : new Date(value);
}
function isPermanentKey(key) {
    if (key.isPermanent)
        return true;
    if (!key.expiresAt)
        return false;
    return key.expiresAt.getTime() >= LIFETIME_EXPIRY.getTime();
}
function canDeleteKey(key) {
    if (isPermanentKey(key))
        return false;
    if (key.status === "USED" || key.status === "REVOKED")
        return true;
    return key.status === "ACTIVE" && !key.activatedAt;
}
// Limpeza automática de keys expiradas
async function cleanupExpiredKeys() {
    await key_repository_1.keyRepository.markExpiredKeys();
    await key_repository_1.keyRepository.deleteExpiredKeys();
}
/** Limpeza explícita (bot/admin) — retorna contagens */
async function runCleanupExpiredKeys() {
    const marked = await key_repository_1.keyRepository.markExpiredKeys();
    const deleted = await key_repository_1.keyRepository.deleteExpiredKeys();
    return {
        markedExpired: marked.count,
        deleted: deleted.count,
        message: "Limpeza de keys expiradas concluída",
    };
}
async function generateKeys(data) {
    const product = await product_repository_1.productRepository.findById(data.productId);
    if (!product)
        throw new AppError_1.AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");
    if (!product.isActive)
        throw new AppError_1.AppError("Produto inativo", 400, "PRODUCT_INACTIVE");
    const values = await (0, keyGenerator_1.generateUniqueKeys)(data.quantity, key_repository_1.keyRepository.valueExists);
    const isPermanent = data.isPermanent === true;
    const expiresAt = isPermanent
        ? LIFETIME_EXPIRY
        : parseExpiresAt(data.expiresAt);
    await key_repository_1.keyRepository.createMany(values.map((value) => ({
        value,
        productId: data.productId,
        createdById: data.createdById,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        isPermanent,
        expiresAt,
    })));
    return {
        generated: values.length,
        keys: values,
    };
}
async function listKeys(filters) {
    // Remove automaticamente keys expiradas
    await cleanupExpiredKeys();
    const result = await key_repository_1.keyRepository.findPaginated(filters);
    return {
        ...result,
        data: result.data.map((key) => ({
            ...key,
            canDelete: canDeleteKey(key),
        })),
    };
}
async function getKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    return { ...key, canDelete: canDeleteKey(key) };
}
async function revokeKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    if (key.status === "REVOKED" ||
        key.status === "USED") {
        throw new AppError_1.AppError("Key já inativa", 400, "KEY_ALREADY_INACTIVE");
    }
    return key_repository_1.keyRepository.revoke(id);
}
async function updateKey(id, data) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    const patch = { ...data };
    if (data.expiresAt !== undefined) {
        patch.expiresAt = parseExpiresAt(data.expiresAt);
    }
    if (data.isPermanent === true) {
        patch.isPermanent = true;
        patch.expiresAt = LIFETIME_EXPIRY;
    }
    const updated = await key_repository_1.keyRepository.update(id, patch);
    const linkedClient = await client_repository_1.clientRepository.findByKeyId(id);
    if (linkedClient && (data.expiresAt !== undefined || data.isPermanent === true)) {
        const clientExpiry = data.isPermanent === true
            ? LIFETIME_EXPIRY
            : patch.expiresAt instanceof Date
                ? patch.expiresAt
                : patch.expiresAt
                    ? new Date(patch.expiresAt)
                    : linkedClient.expiresAt;
        await client_repository_1.clientRepository.updateExpiresAt(linkedClient.id, clientExpiry);
    }
    return updated;
}
async function deleteKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    if (isPermanentKey(key)) {
        throw new AppError_1.AppError("Keys permanentes não podem ser deletadas", 409, "KEY_PERMANENT_CANNOT_DELETE");
    }
    if (!canDeleteKey(key)) {
        throw new AppError_1.AppError("Esta key não pode ser deletada", 409, "KEY_CANNOT_BE_DELETED");
    }
    return key_repository_1.keyRepository.deleteWithDependencies(id);
}
//# sourceMappingURL=key.service.js.map