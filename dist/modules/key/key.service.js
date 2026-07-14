"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runCleanupExpiredKeys = runCleanupExpiredKeys;
exports.runCleanupPermanentKeys = runCleanupPermanentKeys;
exports.generateKeys = generateKeys;
exports.listKeys = listKeys;
exports.getKey = getKey;
exports.revokeKey = revokeKey;
exports.pauseKey = pauseKey;
exports.unpauseKey = unpauseKey;
exports.updateKey = updateKey;
exports.deleteKey = deleteKey;
const key_repository_1 = require("./key.repository");
const product_repository_1 = require("../products/product.repository");
const client_repository_1 = require("../clients/client.repository");
const keyGenerator_1 = require("../../utils/keyGenerator");
const AppError_1 = require("../../utils/AppError");
const enums_1 = require("../../prisma/enums");
const reseller_repository_1 = require("../resellers/reseller.repository");
const reseller_service_1 = require("../resellers/reseller.service");
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
    // Permanentes: admin pode excluir (remove cliente vinculado se houver)
    if (isPermanentKey(key))
        return true;
    if (key.status === "USED" || key.status === "REVOKED" || key.status === "PAUSED")
        return true;
    return key.status === "ACTIVE" && !key.activatedAt;
}
function canPauseKey(key) {
    return key.status === "ACTIVE" || key.status === "USED";
}
function canUnpauseKey(key) {
    return key.status === "PAUSED";
}
function resolveStatusAfterUnpause(key) {
    if (key.client || key.activatedAt)
        return enums_1.KeyStatus.USED;
    return enums_1.KeyStatus.ACTIVE;
}
function withKeyFlags(key) {
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
/** Remove todas as keys permanentes (inclui usadas/revogadas, com cliente se existir). */
async function runCleanupPermanentKeys(onlyUnused = false) {
    const ids = await key_repository_1.keyRepository.findPermanentKeyIds(onlyUnused);
    let deleted = 0;
    for (const id of ids) {
        await key_repository_1.keyRepository.deleteWithDependencies(id);
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
async function generateKeys(data) {
    const product = await product_repository_1.productRepository.findById(data.productId);
    if (!product)
        throw new AppError_1.AppError("Produto não encontrado", 404, "PRODUCT_NOT_FOUND");
    if (!product.isActive)
        throw new AppError_1.AppError("Produto inativo", 400, "PRODUCT_INACTIVE");
    if (data.resellerId) {
        const reseller = await reseller_repository_1.resellerRepository.findById(data.resellerId);
        if (!reseller)
            throw new AppError_1.AppError("Loja/revendedor não encontrado", 404, "RESELLER_NOT_FOUND");
    }
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
        resellerId: data.resellerId,
    })));
    if (data.resellerId) {
        await (0, reseller_service_1.recordKeyGeneration)(data.resellerId, values.length, data.actorUsername ?? "admin");
    }
    return {
        generated: values.length,
        keys: values,
        resellerId: data.resellerId ?? null,
    };
}
async function listKeys(filters) {
    // Remove automaticamente keys expiradas
    await cleanupExpiredKeys();
    const result = await key_repository_1.keyRepository.findPaginated(filters);
    return {
        ...result,
        data: result.data.map((key) => withKeyFlags(key)),
    };
}
async function getKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    return withKeyFlags(key);
}
async function revokeKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    if (key.status === "REVOKED" || key.status === "USED") {
        throw new AppError_1.AppError("Key já inativa", 400, "KEY_ALREADY_INACTIVE");
    }
    return key_repository_1.keyRepository.revoke(id);
}
async function pauseKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    if (key.status === "PAUSED") {
        throw new AppError_1.AppError("Key já está pausada", 400, "KEY_ALREADY_PAUSED");
    }
    if (!canPauseKey(key)) {
        throw new AppError_1.AppError("Somente keys ativas ou usadas podem ser pausadas", 400, "KEY_CANNOT_BE_PAUSED");
    }
    const updated = await key_repository_1.keyRepository.setStatus(id, enums_1.KeyStatus.PAUSED);
    return withKeyFlags(updated);
}
async function unpauseKey(id) {
    const key = await key_repository_1.keyRepository.findById(id);
    if (!key)
        throw new AppError_1.AppError("Key não encontrada", 404, "KEY_NOT_FOUND");
    if (!canUnpauseKey(key)) {
        throw new AppError_1.AppError("Key não está pausada", 400, "KEY_NOT_PAUSED");
    }
    const nextStatus = resolveStatusAfterUnpause(key);
    const updated = await key_repository_1.keyRepository.setStatus(id, nextStatus);
    return withKeyFlags(updated);
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
    if (!canDeleteKey(key)) {
        throw new AppError_1.AppError("Esta key não pode ser deletada", 409, "KEY_CANNOT_BE_DELETED");
    }
    return key_repository_1.keyRepository.deleteWithDependencies(id);
}
//# sourceMappingURL=key.service.js.map