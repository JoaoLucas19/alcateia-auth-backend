import { resellerRepository } from "./reseller.repository";
import { AppError } from "../../utils/AppError";
import { KeyStatus, ResellerStatus } from "../../prisma/enums";

type KeyLite = { id: string; status: KeyStatus };

function countKeys(keys: KeyLite[]) {
  let activeKeys = 0;
  let expiredKeys = 0;
  let bannedKeys = 0;
  let pausedKeys = 0;
  let usedKeys = 0;

  for (const key of keys) {
    if (key.status === KeyStatus.ACTIVE || key.status === KeyStatus.USED) activeKeys++;
    if (key.status === KeyStatus.USED) usedKeys++;
    if (key.status === KeyStatus.EXPIRED) expiredKeys++;
    if (key.status === KeyStatus.REVOKED) bannedKeys++;
    if (key.status === KeyStatus.PAUSED) pausedKeys++;
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

function mapStore(reseller: {
  id: string;
  name: string;
  owner: string;
  discord: string | null;
  email: string | null;
  notes: string | null;
  status: ResellerStatus;
  createdAt: Date;
  keys: KeyLite[];
}, failedLogins24h = 0) {
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

function topRanking(
  stores: ReturnType<typeof mapStore>[],
  metricKey: "totalKeys" | "failedLogins24h" | "bannedKeys" | "usedSales",
  salesMap?: Map<string, number>
) {
  const ranked = stores
    .map((s) => ({
      id: s.id,
      name: s.name,
      owner: s.owner,
      status: s.status,
      metric:
        metricKey === "usedSales"
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

export async function getOverview() {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [resellers, failuresMap, keyStatusMap, totalKeys] = await Promise.all([
    resellerRepository.findAllWithKeys(),
    resellerRepository.countFailedLogins24hByReseller(since),
    resellerRepository.countKeysByStatus(),
    resellerRepository.countAllKeysLinked(),
  ]);

  const stores = resellers.map((r) => mapStore(r, failuresMap.get(r.id) ?? 0));

  const salesMap = new Map<string, number>();
  for (const r of resellers) {
    const used = r.keys.filter((k) => k.status === KeyStatus.USED).length;
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

export async function listResellers(filters: {
  page: number;
  limit: number;
  status?: "all" | "active" | "paused" | "banned";
  search?: string;
}) {
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [result, failuresMap] = await Promise.all([
    resellerRepository.findPaginated(filters),
    resellerRepository.countFailedLogins24hByReseller(since),
  ]);

  return {
    data: result.data.map((r) => mapStore(r, failuresMap.get(r.id) ?? 0)),
    total: result.total,
    page: result.page,
    totalPages: result.totalPages,
  };
}

export async function getReseller(id: string) {
  const reseller = await resellerRepository.findById(id);
  if (!reseller) throw new AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");

  const withKeys = await resellerRepository.findAllWithKeys();
  const full = withKeys.find((r) => r.id === id);
  if (!full) throw new AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const failuresMap = await resellerRepository.countFailedLogins24hByReseller(since);
  return mapStore(full, failuresMap.get(id) ?? 0);
}

export async function createReseller(
  data: {
    name: string;
    owner: string;
    discord?: string;
    email?: string;
    notes?: string;
  },
  actor = "admin"
) {
  const created = await resellerRepository.create({
    name: data.name.trim(),
    owner: data.owner.trim(),
    discord: data.discord?.trim() || null,
    email: data.email?.trim() || null,
    notes: data.notes?.trim() || null,
  });

  await resellerRepository.addHistory({
    resellerId: created.id,
    type: "STORE_CREATED",
    description: `Loja "${created.name}" criada`,
    actor,
  });

  return mapStore({ ...created, keys: [] });
}

export async function updateReseller(
  id: string,
  data: {
    name?: string;
    owner?: string;
    discord?: string | null;
    email?: string | null;
    notes?: string | null;
    status?: ResellerStatus;
  },
  actor = "admin"
) {
  const existing = await resellerRepository.findById(id);
  if (!existing) throw new AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");

  const updated = await resellerRepository.update(id, {
    ...(data.name !== undefined ? { name: data.name.trim() } : {}),
    ...(data.owner !== undefined ? { owner: data.owner.trim() } : {}),
    ...(data.discord !== undefined ? { discord: data.discord?.trim() || null } : {}),
    ...(data.email !== undefined ? { email: data.email?.trim() || null } : {}),
    ...(data.notes !== undefined ? { notes: data.notes?.trim() || null } : {}),
    ...(data.status !== undefined ? { status: data.status } : {}),
  });

  await resellerRepository.addHistory({
    resellerId: id,
    type: "STORE_UPDATED",
    description: `Loja "${updated.name}" atualizada`,
    actor,
  });

  return getReseller(id);
}

async function setStatus(id: string, status: ResellerStatus, type: string, description: string, actor: string) {
  const existing = await resellerRepository.findById(id);
  if (!existing) throw new AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");

  await resellerRepository.update(id, { status });
  await resellerRepository.addHistory({
    resellerId: id,
    type,
    description,
    actor,
  });

  return getReseller(id);
}

export async function banReseller(id: string, actor = "admin") {
  const existing = await resellerRepository.findById(id);
  if (!existing) throw new AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");

  const storeName = existing.name;
  const result = await resellerRepository.deleteCompletely(id);

  return {
    deleted: true,
    id,
    name: storeName,
    deletedKeys: result.deletedKeys,
    deletedClients: result.deletedClients,
    message: `Loja "${storeName}" e todos os dados vinculados foram excluídos`,
    actor,
  };
}

export async function unbanReseller(id: string, actor = "admin") {
  return setStatus(id, ResellerStatus.ACTIVE, "STORE_UNBANNED", "Loja reativada (desbanida)", actor);
}

export async function pauseReseller(id: string, actor = "admin") {
  return setStatus(id, ResellerStatus.PAUSED, "STORE_PAUSED", "Loja pausada", actor);
}

export async function unpauseReseller(id: string, actor = "admin") {
  return setStatus(id, ResellerStatus.ACTIVE, "STORE_UNPAUSED", "Loja despausada", actor);
}

export async function listResellerKeys(id: string, page: number, limit: number) {
  const existing = await resellerRepository.findById(id);
  if (!existing) throw new AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");

  const result = await resellerRepository.findKeys(id, page, limit);
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

export async function bulkUpdateResellerKeys(
  resellerId: string,
  action: "pause" | "ban" | "unpause" | "reactivate" | "delete",
  keyIds: string[],
  actor = "admin"
) {
  if (!keyIds.length) {
    throw new AppError("Nenhuma key selecionada", 400, "VALIDATION_ERROR");
  }

  const existing = await resellerRepository.findById(resellerId);
  if (!existing) throw new AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");

  const keys = await resellerRepository.findKeysByIds(resellerId, keyIds);
  if (keys.length === 0) {
    throw new AppError("Nenhuma key válida encontrada para esta loja", 404, "KEYS_NOT_FOUND");
  }

  const ids = keys.map((k) => k.id);

  if (action === "delete") {
    const deleted = await resellerRepository.deleteKeysWithDependencies(ids);
    await resellerRepository.addHistory({
      resellerId,
      type: "KEYS_DELETED",
      description: `${deleted.deletedKeys} key(s) excluída(s)`,
      actor,
      metadata: JSON.stringify({ keyIds: ids, deletedClients: deleted.deletedClients }),
    });
    return listResellerKeys(resellerId, 1, 50);
  }

  if (action === "pause") {
    await resellerRepository.updateKeysStatus(ids, KeyStatus.PAUSED);
    await resellerRepository.addHistory({
      resellerId,
      type: "KEYS_PAUSED",
      description: `${ids.length} key(s) pausada(s)`,
      actor,
      metadata: JSON.stringify({ keyIds: ids }),
    });
  } else if (action === "ban") {
    await resellerRepository.updateKeysStatus(ids, KeyStatus.REVOKED);
    await resellerRepository.addHistory({
      resellerId,
      type: "KEYS_BANNED",
      description: `${ids.length} key(s) banida(s)`,
      actor,
      metadata: JSON.stringify({ keyIds: ids }),
    });
  } else {
    // unpause / reactivate: USED se tinha cliente/ativação, senão ACTIVE
    const usedIds = keys
      .filter((k) => k.client || k.activatedAt)
      .map((k) => k.id);
    const activeIds = keys
      .filter((k) => !k.client && !k.activatedAt)
      .map((k) => k.id);

    if (usedIds.length) await resellerRepository.updateKeysStatus(usedIds, KeyStatus.USED);
    if (activeIds.length) await resellerRepository.updateKeysStatus(activeIds, KeyStatus.ACTIVE);

    await resellerRepository.addHistory({
      resellerId,
      type: "KEYS_REACTIVATED",
      description: `${ids.length} key(s) reativada(s)`,
      actor,
      metadata: JSON.stringify({ keyIds: ids }),
    });
  }

  return listResellerKeys(resellerId, 1, 50);
}

export async function listResellerHistory(id: string, page: number, limit: number) {
  const existing = await resellerRepository.findById(id);
  if (!existing) throw new AppError("Loja não encontrada", 404, "RESELLER_NOT_FOUND");

  const result = await resellerRepository.findHistory(id, page, limit);
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

export async function recordKeyGeneration(
  resellerId: string,
  quantity: number,
  actor = "admin"
) {
  await resellerRepository.addHistory({
    resellerId,
    type: "KEY_GENERATED",
    description: `Geradas ${quantity} key(s) vinculadas à loja`,
    actor,
    metadata: JSON.stringify({ quantity }),
  });
}
