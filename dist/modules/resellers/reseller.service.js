"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOverview = getOverview;
exports.listResellers = listResellers;
exports.getReseller = getReseller;
exports.createReseller = createReseller;
exports.updateReseller = updateReseller;
exports.banReseller = banReseller;
exports.unbanReseller = unbanReseller;
exports.pauseReseller = pauseReseller;
exports.unpauseReseller = unpauseReseller;
exports.listResellerKeys = listResellerKeys;
exports.bulkUpdateResellerKeys = bulkUpdateResellerKeys;
exports.listResellerHistory = listResellerHistory;
exports.recordKeyGeneration = recordKeyGeneration;
const reseller_repository_1 = require("./reseller.repository");
const AppError_1 = require("../../utils/AppError");
const enums_1 = require("../../prisma/enums");
function countKeys(keys) {
    let activeKeys = 0;
    let expiredKeys = 0;
    let bannedKeys = 0;
    let pausedKeys = 0;
    let usedKeys = 0;
    for (const key of keys) {
        if (key.status === enums_1.KeyStatus.ACTIVE || key.status === enums_1.KeyStatus.USED)
            activeKeys++;
        if (key.status === enums_1.KeyStatus.USED)
            usedKeys++;
        if (key.status === enums_1.KeyStatus.EXPIRED)
            expiredKeys++;
        if (key.status === enums_1.KeyStatus.REVOKED)
            bannedKeys++;
        if (key.status === enums_1.KeyStatus.PAUSED)
            pausedKeys++;
    }
    return {
        activeKeys,
        expiredKeys,
        bannedKeys,
        pausedKeys,
        usedKeys,
        totalKeys: keys.length,
    };
}
function mapStore(reseller, failedLogins24h = 0) {
    const metrics = countKeys(reseller.keys);
    return {
        id: reseller.id,
        name: reseller.name,
        owner: reseller.owner,
        discord: reseller.discord,
        email: reseller.email,
        notes: reseller.notes,
        status: reseller.status,
        activeKeys: metrics.activeKeys,
        expiredKeys: metrics.expiredKeys,
        bannedKeys: metrics.bannedKeys,
        pausedKeys: metrics.pausedKeys,
        totalKeys: metrics.totalKeys,
        failedLogins24h,
        createdAt: reseller.createdAt.toISOString(),
    };
}
function topRanking(stores, metricKey, salesMap) {
    const ranked = stores
        .map((s) => ({
        id: s.id,
        name: s.name,
        owner: s.owner,
        status: s.status,
        metric: metricKey === "usedSales"
            ? salesMap?.get(s.id) ?? 0
            : metricKey === "totalKeys"
                ? s.totalKeys
                : metricKey === "failedLogins24h"
                    ? s.failedLogins24h
                    : s.bannedKeys,
    }))
        .filter((s) => s.metric > 0)
        .sort((a, b) => b.metric - a.metric)
        .slice(0, 5);
    return ranked;
}
async function getOverview() {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [resellers, failuresMap, keyStatusMap, totalKeys] = await Promise.all([
        reseller_repository_1.resellerRepository.findAllWithKeys(),
        reseller_repository_1.resellerRepository.countFailedLogins24hByReseller(since),
        reseller_repository_1.resellerRepository.countKeysByStatus(),
        reseller_repository_1.resellerRepository.countAllKeysLinked(),
    ]);
    const stores = resellers.map((r) => mapStore(r, failuresMap.get(r.id) ?? 0));
    const salesMap = new Map();
    for (const r of resellers) {
        const used = r.keys.filter((k) => k.status === enums_1.KeyStatus.USED).length;
        salesMap.set(r.id, used);
    }
    const metrics = {
        totalStores: resellers.length,
        totalKeys,
        activeKeys: (keyStatusMap.ACTIVE ?? 0) + (keyStatusMap.USED ?? 0),
        expiredKeys: keyStatusMap.EXPIRED ?? 0,
        bannedKeys: keyStatusMap.REVOKED ?? 0,
        pausedKeys: keyStatusMap.PAUSED ?? 0,
    };
    return {
        metrics,
        ranking: {
            bySales: topRanking(stores, "usedSales", salesMap),
            byFailures: topRanking(stores, "failedLogins24h"),
            byBanned: topRanking(stores, "bannedKeys"),
        },
        stores,
    };
}
async function listResellers(filters) {
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const [result, failuresMap] = await Promise.all([
        reseller_repository_1.resellerRepository.findPaginated(filters),
        reseller_repository_1.resellerRepository.countFailedLogins24hByReseller(since),
    ]);
    return {
        data: result.data.map((r) => mapStore(r, failuresMap.get(r.id) ?? 0)),
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
    };
}
async function getReseller(id) {
    const reseller = await reseller_repository_1.resellerRepository.findById(id);
    if (!reseller)
        throw new AppError_1.AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");
    const withKeys = await reseller_repository_1.resellerRepository.findAllWithKeys();
    const full = withKeys.find((r) => r.id === id);
    if (!full)
        throw new AppError_1.AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");
    const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const failuresMap = await reseller_repository_1.resellerRepository.countFailedLogins24hByReseller(since);
    return mapStore(full, failuresMap.get(id) ?? 0);
}
async function createReseller(data, actor = "admin") {
    const created = await reseller_repository_1.resellerRepository.create({
        name: data.name.trim(),
        owner: data.owner.trim(),
        discord: data.discord?.trim() || null,
        email: data.email?.trim() || null,
        notes: data.notes?.trim() || null,
    });
    await reseller_repository_1.resellerRepository.addHistory({
        resellerId: created.id,
        type: "STORE_CREATED",
        description: `Loja "${created.name}" criada`,
        actor,
    });
    return mapStore({ ...created, keys: [] });
}
async function updateReseller(id, data, actor = "admin") {
    const existing = await reseller_repository_1.resellerRepository.findById(id);
    if (!existing)
        throw new AppError_1.AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");
    const updated = await reseller_repository_1.resellerRepository.update(id, {
        ...(data.name !== undefined ? { name: data.name.trim() } : {}),
        ...(data.owner !== undefined ? { owner: data.owner.trim() } : {}),
        ...(data.discord !== undefined ? { discord: data.discord?.trim() || null } : {}),
        ...(data.email !== undefined ? { email: data.email?.trim() || null } : {}),
        ...(data.notes !== undefined ? { notes: data.notes?.trim() || null } : {}),
        ...(data.status !== undefined ? { status: data.status } : {}),
    });
    await reseller_repository_1.resellerRepository.addHistory({
        resellerId: id,
        type: "STORE_UPDATED",
        description: `Loja "${updated.name}" atualizada`,
        actor,
    });
    return getReseller(id);
}
async function setStatus(id, status, type, description, actor) {
    const existing = await reseller_repository_1.resellerRepository.findById(id);
    if (!existing)
        throw new AppError_1.AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");
    await reseller_repository_1.resellerRepository.update(id, { status });
    await reseller_repository_1.resellerRepository.addHistory({
        resellerId: id,
        type,
        description,
        actor,
    });
    return getReseller(id);
}
async function banReseller(id, actor = "admin") {
    return setStatus(id, enums_1.ResellerStatus.BANNED, "STORE_BANNED", "Loja banida", actor);
}
async function unbanReseller(id, actor = "admin") {
    return setStatus(id, enums_1.ResellerStatus.ACTIVE, "STORE_UNBANNED", "Loja reativada (desbanida)", actor);
}
async function pauseReseller(id, actor = "admin") {
    return setStatus(id, enums_1.ResellerStatus.PAUSED, "STORE_PAUSED", "Loja pausada", actor);
}
async function unpauseReseller(id, actor = "admin") {
    return setStatus(id, enums_1.ResellerStatus.ACTIVE, "STORE_UNPAUSED", "Loja despausada", actor);
}
async function listResellerKeys(id, page, limit) {
    const existing = await reseller_repository_1.resellerRepository.findById(id);
    if (!existing)
        throw new AppError_1.AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");
    const result = await reseller_repository_1.resellerRepository.findKeys(id, page, limit);
    return {
        data: result.data.map((key) => ({
            id: key.id,
            value: key.value,
            status: key.status,
            product: key.product,
            customerName: key.customerName ?? key.client?.username ?? null,
            customerEmail: key.customerEmail,
            isPermanent: key.isPermanent,
            activatedAt: key.activatedAt?.toISOString() ?? null,
            expiresAt: key.expiresAt?.toISOString() ?? null,
            createdAt: key.createdAt.toISOString(),
        })),
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
    };
}
async function bulkUpdateResellerKeys(resellerId, action, keyIds, actor = "admin") {
    if (!keyIds.length) {
        throw new AppError_1.AppError("Nenhuma key selecionada", 400, "VALIDATION_ERROR");
    }
    const existing = await reseller_repository_1.resellerRepository.findById(resellerId);
    if (!existing)
        throw new AppError_1.AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");
    const keys = await reseller_repository_1.resellerRepository.findKeysByIds(resellerId, keyIds);
    if (keys.length === 0) {
        throw new AppError_1.AppError("Nenhuma key válida encontrada para esta loja", 404, "KEYS_NOT_FOUND");
    }
    const ids = keys.map((k) => k.id);
    if (action === "pause") {
        await reseller_repository_1.resellerRepository.updateKeysStatus(ids, enums_1.KeyStatus.PAUSED);
        await reseller_repository_1.resellerRepository.addHistory({
            resellerId,
            type: "KEYS_PAUSED",
            description: `${ids.length} key(s) pausada(s)`,
            actor,
            metadata: JSON.stringify({ keyIds: ids }),
        });
    }
    else if (action === "ban") {
        await reseller_repository_1.resellerRepository.updateKeysStatus(ids, enums_1.KeyStatus.REVOKED);
        await reseller_repository_1.resellerRepository.addHistory({
            resellerId,
            type: "KEYS_BANNED",
            description: `${ids.length} key(s) banida(s)`,
            actor,
            metadata: JSON.stringify({ keyIds: ids }),
        });
    }
    else {
        // unpause / reactivate: USED se tinha cliente/ativação, senão ACTIVE
        const usedIds = keys
            .filter((k) => k.client || k.activatedAt)
            .map((k) => k.id);
        const activeIds = keys
            .filter((k) => !k.client && !k.activatedAt)
            .map((k) => k.id);
        if (usedIds.length)
            await reseller_repository_1.resellerRepository.updateKeysStatus(usedIds, enums_1.KeyStatus.USED);
        if (activeIds.length)
            await reseller_repository_1.resellerRepository.updateKeysStatus(activeIds, enums_1.KeyStatus.ACTIVE);
        await reseller_repository_1.resellerRepository.addHistory({
            resellerId,
            type: "KEYS_REACTIVATED",
            description: `${ids.length} key(s) reativada(s)`,
            actor,
            metadata: JSON.stringify({ keyIds: ids }),
        });
    }
    return listResellerKeys(resellerId, 1, 50);
}
async function listResellerHistory(id, page, limit) {
    const existing = await reseller_repository_1.resellerRepository.findById(id);
    if (!existing)
        throw new AppError_1.AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");
    const result = await reseller_repository_1.resellerRepository.findHistory(id, page, limit);
    return {
        data: result.data.map((item) => ({
            id: item.id,
            type: item.type,
            description: item.description,
            actor: item.actor,
            metadata: item.metadata,
            createdAt: item.createdAt.toISOString(),
        })),
        total: result.total,
        page: result.page,
        totalPages: result.totalPages,
    };
}
async function recordKeyGeneration(resellerId, quantity, actor = "admin") {
    await reseller_repository_1.resellerRepository.addHistory({
        resellerId,
        type: "KEY_GENERATED",
        description: `Geradas ${quantity} key(s) vinculadas à loja`,
        actor,
        metadata: JSON.stringify({ quantity }),
    });
}
//# sourceMappingURL=reseller.service.js.map