import bcrypt from "bcrypt";
import prisma from "../../prisma/client";
import { clientRepository } from "./client.repository";
import { AppError } from "../../utils/AppError";
import { normalizeHwid, parseHwid } from "../../utils/hwid";
import {
  buildHwidEnrichment,
  fetchLatestHwidAttemptsByClientIds,
  type HwidEnrichment,
} from "./client-hwid.enrichment";

const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");
const BCRYPT_ROUNDS = 10;

export type ClientLookup = {
  clientId?: string;
  username?: string;
  key?: string;
  discordId?: string;
};

type ClientRow = {
  id: string;
  username: string;
  hwid: string | null;
  discordId: string | null;
  isBanned: boolean;
  loginCount: number;
  lastLoginAt: Date | null;
  createdAt: Date;
  expiresAt: Date;
  key: {
    id: string;
    value: string;
    isPermanent: boolean;
    status: string;
    product: { id: string; name: string };
  };
};

function formatClient(
  client: ClientRow,
  lastAttempt?: { hwid: string; success: boolean; reason: string | null } | null
) {
  const isLifetime =
    client.key.isPermanent || !client.expiresAt || client.expiresAt >= LIFETIME_EXPIRY;

  const daysRemaining = isLifetime
    ? 99999
    : Math.max(
        0,
        Math.ceil((new Date(client.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      );

  const hwid = normalizeHwid(client.hwid);
  const hwidMeta: HwidEnrichment = buildHwidEnrichment(client.hwid, lastAttempt);
  const parsedStored = parseHwid(client.hwid);

  return {
    id: client.id,
    username: client.username,
    hwid,
    hwidFormat: parsedStored.kind === "invalid" ? null : parsedStored.kind,
    hwidDisplay: hwidMeta.hwidDisplay,
    hwidBound: hwidMeta.hwidBound,
    hwidSignal: hwidMeta.hwidSignal,
    lastAttemptHwid: hwidMeta.lastAttemptHwid,
    lastAttemptHwidDisplay: hwidMeta.lastAttemptHwidDisplay,
    discordId: client.discordId ?? null,
    isBanned: client.isBanned,
    loginCount: client.loginCount,
    lastLoginAt: client.lastLoginAt,
    createdAt: client.createdAt,
    expiresAt: client.expiresAt,
    isLifetime,
    daysRemaining,
    status: client.isBanned ? "banned" : isLifetime ? "active" : daysRemaining > 0 ? "active" : "expired",
    key: {
      id: client.key.id,
      value: client.key.value,
      isPermanent: client.key.isPermanent,
      status: client.key.status,
    },
    product: {
      id: client.key.product.id,
      name: client.key.product.name,
    },
  };
}

export async function resolveClientLookup(lookup: ClientLookup) {
  if (lookup.clientId) {
    const client = await clientRepository.findById(lookup.clientId);
    if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return client;
  }

  if (lookup.username) {
    const client = await clientRepository.findByUsername(lookup.username.trim());
    if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return client;
  }

  if (lookup.key) {
    const client = await clientRepository.findByKeyValue(lookup.key);
    if (!client) throw new AppError("Cliente não encontrado para esta key", 404, "CLIENT_NOT_FOUND");
    return client;
  }

  if (lookup.discordId) {
    const client = await clientRepository.findByDiscordId(lookup.discordId.trim());
    if (!client) throw new AppError("Cliente não encontrado para este Discord", 404, "CLIENT_NOT_FOUND");
    return client;
  }

  throw new AppError("Informe clientId, username, key ou discordId", 400, "VALIDATION_ERROR");
}

async function enrichClients<T extends ClientRow>(clients: T[]) {
  const lastMap = await fetchLatestHwidAttemptsByClientIds(clients.map((c) => c.id));
  return clients.map((c) => formatClient(c, lastMap.get(c.id)));
}

export async function listClients(filters: {
  page: number;
  limit: number;
  search?: string;
  status?: "active" | "banned" | "expired";
  discordId?: string;
}) {
  const result = await clientRepository.findPaginated(filters);
  const [clients, summary] = await Promise.all([
    enrichClients(result.clients),
    getClientsSummary(),
  ]);
  return {
    ...result,
    clients,
    summary,
  };
}

export async function getClientsSummary() {
  const [total, active, banned, expired, withoutHwid] = await Promise.all([
    clientRepository.countTotal(),
    clientRepository.countActive(),
    clientRepository.countBanned(),
    clientRepository.countExpired(),
    clientRepository.countActiveWithoutHwid(),
  ]);

  return { total, active, banned, expired, withoutHwid };
}

async function formatClientEnriched(client: ClientRow) {
  const lastMap = await fetchLatestHwidAttemptsByClientIds([client.id]);
  return formatClient(client, lastMap.get(client.id));
}

export async function getClient(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  return formatClientEnriched(client);
}

export async function getClientByDiscordId(discordId: string) {
  const client = await clientRepository.findByDiscordId(discordId.trim());
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  return formatClientEnriched(client);
}

export async function getClientByKeyValue(keyValue: string) {
  const client = await clientRepository.findByKeyValue(keyValue);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  return formatClientEnriched(client);
}

export async function getClientByUsername(username: string) {
  const client = await clientRepository.findByUsername(username.trim());
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  return formatClientEnriched(client);
}

export async function banClient(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  if (client.isBanned) throw new AppError("Cliente já está banido", 400, "ALREADY_BANNED");
  await clientRepository.ban(id);
  return { message: "Cliente banido com sucesso" };
}

export async function unbanClient(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  if (!client.isBanned) throw new AppError("Cliente não está banido", 400, "NOT_BANNED");
  await clientRepository.unban(id);
  return { message: "Cliente desbanido com sucesso" };
}

export async function resetClientHwid(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  await clientRepository.resetHwid(id);
  return { message: "HWID resetado com sucesso" };
}

export async function resetClientHwidByLookup(lookup: ClientLookup) {
  const client = await resolveClientLookup(lookup);
  await clientRepository.resetHwid(client.id);
  return {
    message: "HWID resetado com sucesso",
    data: formatClient({ ...client, hwid: null }, null),
  };
}

export async function changeClientPassword(id: string, password: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  await clientRepository.updatePassword(id, passwordHash);
  return { message: "Senha alterada com sucesso" };
}

export async function changeClientPasswordByLookup(lookup: ClientLookup & { password: string }) {
  const { password, ...rest } = lookup;
  const client = await resolveClientLookup(rest);
  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);
  await clientRepository.updatePassword(client.id, passwordHash);
  return { message: "Senha alterada com sucesso", data: await formatClientEnriched(client) };
}

export async function linkClientDiscord(id: string, discordId: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");

  const existing = await clientRepository.findByDiscordId(discordId);
  if (existing && existing.id !== id) {
    throw new AppError("Este Discord já está vinculado a outro usuário", 409, "DISCORD_ALREADY_LINKED");
  }

  const updated = await clientRepository.updateDiscordId(id, discordId);
  const full = await clientRepository.findById(updated.id);
  return {
    message: "Discord vinculado com sucesso",
    data: await formatClientEnriched(full!),
  };
}

export async function linkClientDiscordByLookup(body: {
  clientId?: string;
  username?: string;
  key?: string;
  discordId: string;
}) {
  const { discordId, ...rest } = body;
  const client = await resolveClientLookup(rest);
  return linkClientDiscord(client.id, discordId);
}

export async function unlinkClientDiscord(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  await clientRepository.updateDiscordId(id, null);
  return { message: "Discord desvinculado com sucesso" };
}

export async function deleteClient(id: string) {
  const client = await clientRepository.findById(id);
  if (!client) throw new AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
  await clientRepository.delete(id);
  return { message: "Cliente deletado com sucesso" };
}

/** Normaliza HWIDs inválidos/placeholder gravados antes da correção. */
export async function repairInvalidClientHwids() {
  const clients = await prisma.client.findMany({
    where: { hwid: { not: null } },
    select: { id: true, hwid: true },
  });

  let fixed = 0;
  let cleared = 0;
  for (const row of clients) {
    const parsed = parseHwid(row.hwid);
    const next = parsed.canonical;
    if (row.hwid !== next) {
      await prisma.client.update({
        where: { id: row.id },
        data: { hwid: next },
      });
      fixed += 1;
      if (!next) cleared += 1;
    }
  }

  return {
    message: "HWIDs reparados (formato machine:/MAC: ou removidos se invalidos)",
    fixed,
    cleared,
    scanned: clients.length,
  };
}
