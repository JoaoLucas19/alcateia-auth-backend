"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveClientLookup = resolveClientLookup;
exports.listClients = listClients;
exports.getClientsSummary = getClientsSummary;
exports.getClient = getClient;
exports.getClientByDiscordId = getClientByDiscordId;
exports.getClientByKeyValue = getClientByKeyValue;
exports.getClientByUsername = getClientByUsername;
exports.banClient = banClient;
exports.unbanClient = unbanClient;
exports.resetClientHwid = resetClientHwid;
exports.resetClientHwidByLookup = resetClientHwidByLookup;
exports.changeClientPassword = changeClientPassword;
exports.changeClientPasswordByLookup = changeClientPasswordByLookup;
exports.linkClientDiscord = linkClientDiscord;
exports.linkClientDiscordByLookup = linkClientDiscordByLookup;
exports.unlinkClientDiscord = unlinkClientDiscord;
exports.deleteClient = deleteClient;
exports.repairInvalidClientHwids = repairInvalidClientHwids;
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_1 = __importDefault(require("../../prisma/client"));
const client_repository_1 = require("./client.repository");
const AppError_1 = require("../../utils/AppError");
const hwid_1 = require("../../utils/hwid");
const client_hwid_enrichment_1 = require("./client-hwid.enrichment");
const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");
const BCRYPT_ROUNDS = 10;
function formatClient(client, lastAttempt) {
    const isLifetime = client.key.isPermanent || !client.expiresAt || client.expiresAt >= LIFETIME_EXPIRY;
    const daysRemaining = isLifetime
        ? 99999
        : Math.max(0, Math.ceil((new Date(client.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
    const hwid = (0, hwid_1.normalizeHwid)(client.hwid);
    const hwidMeta = (0, client_hwid_enrichment_1.buildHwidEnrichment)(client.hwid, lastAttempt);
    const parsedStored = (0, hwid_1.parseHwid)(client.hwid);
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
async function resolveClientLookup(lookup) {
    if (lookup.clientId) {
        const client = await client_repository_1.clientRepository.findById(lookup.clientId);
        if (!client)
            throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
        return client;
    }
    if (lookup.username) {
        const client = await client_repository_1.clientRepository.findByUsername(lookup.username.trim());
        if (!client)
            throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
        return client;
    }
    if (lookup.key) {
        const client = await client_repository_1.clientRepository.findByKeyValue(lookup.key);
        if (!client)
            throw new AppError_1.AppError("Cliente não encontrado para esta key", 404, "CLIENT_NOT_FOUND");
        return client;
    }
    if (lookup.discordId) {
        const client = await client_repository_1.clientRepository.findByDiscordId(lookup.discordId.trim());
        if (!client)
            throw new AppError_1.AppError("Cliente não encontrado para este Discord", 404, "CLIENT_NOT_FOUND");
        return client;
    }
    throw new AppError_1.AppError("Informe clientId, username, key ou discordId", 400, "VALIDATION_ERROR");
}
async function enrichClients(clients) {
    const lastMap = await (0, client_hwid_enrichment_1.fetchLatestHwidAttemptsByClientIds)(clients.map((c) => c.id));
    return clients.map((c) => formatClient(c, lastMap.get(c.id)));
}
async function listClients(filters) {
    const result = await client_repository_1.clientRepository.findPaginated(filters);
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
async function getClientsSummary() {
    const [total, active, banned, expired, withoutHwid] = await Promise.all([
        client_repository_1.clientRepository.countTotal(),
        client_repository_1.clientRepository.countActive(),
        client_repository_1.clientRepository.countBanned(),
        client_repository_1.clientRepository.countExpired(),
        client_repository_1.clientRepository.countActiveWithoutHwid(),
    ]);
    return { total, active, banned, expired, withoutHwid };
}
async function formatClientEnriched(client) {
    const lastMap = await (0, client_hwid_enrichment_1.fetchLatestHwidAttemptsByClientIds)([client.id]);
    return formatClient(client, lastMap.get(client.id));
}
async function getClient(id) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return formatClientEnriched(client);
}
async function getClientByDiscordId(discordId) {
    const client = await client_repository_1.clientRepository.findByDiscordId(discordId.trim());
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return formatClientEnriched(client);
}
async function getClientByKeyValue(keyValue) {
    const client = await client_repository_1.clientRepository.findByKeyValue(keyValue);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return formatClientEnriched(client);
}
async function getClientByUsername(username) {
    const client = await client_repository_1.clientRepository.findByUsername(username.trim());
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return formatClientEnriched(client);
}
async function banClient(id) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    if (client.isBanned)
        throw new AppError_1.AppError("Cliente já está banido", 400, "ALREADY_BANNED");
    await client_repository_1.clientRepository.ban(id);
    return { message: "Cliente banido com sucesso" };
}
async function unbanClient(id) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    if (!client.isBanned)
        throw new AppError_1.AppError("Cliente não está banido", 400, "NOT_BANNED");
    await client_repository_1.clientRepository.unban(id);
    return { message: "Cliente desbanido com sucesso" };
}
async function resetClientHwid(id) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    await client_repository_1.clientRepository.resetHwid(id);
    return { message: "HWID resetado com sucesso" };
}
async function resetClientHwidByLookup(lookup) {
    const client = await resolveClientLookup(lookup);
    await client_repository_1.clientRepository.resetHwid(client.id);
    return {
        message: "HWID resetado com sucesso",
        data: formatClient({ ...client, hwid: null }, null),
    };
}
async function changeClientPassword(id, password) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    const passwordHash = await bcrypt_1.default.hash(password, BCRYPT_ROUNDS);
    await client_repository_1.clientRepository.updatePassword(id, passwordHash);
    return { message: "Senha alterada com sucesso" };
}
async function changeClientPasswordByLookup(lookup) {
    const { password, ...rest } = lookup;
    const client = await resolveClientLookup(rest);
    const passwordHash = await bcrypt_1.default.hash(password, BCRYPT_ROUNDS);
    await client_repository_1.clientRepository.updatePassword(client.id, passwordHash);
    return { message: "Senha alterada com sucesso", data: await formatClientEnriched(client) };
}
async function linkClientDiscord(id, discordId) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    const existing = await client_repository_1.clientRepository.findByDiscordId(discordId);
    if (existing && existing.id !== id) {
        throw new AppError_1.AppError("Este Discord já está vinculado a outro usuário", 409, "DISCORD_ALREADY_LINKED");
    }
    const updated = await client_repository_1.clientRepository.updateDiscordId(id, discordId);
    const full = await client_repository_1.clientRepository.findById(updated.id);
    return {
        message: "Discord vinculado com sucesso",
        data: await formatClientEnriched(full),
    };
}
async function linkClientDiscordByLookup(body) {
    const { discordId, ...rest } = body;
    const client = await resolveClientLookup(rest);
    return linkClientDiscord(client.id, discordId);
}
async function unlinkClientDiscord(id) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    await client_repository_1.clientRepository.updateDiscordId(id, null);
    return { message: "Discord desvinculado com sucesso" };
}
async function deleteClient(id) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    await client_repository_1.clientRepository.delete(id);
    return { message: "Cliente deletado com sucesso" };
}
/** Normaliza HWIDs inválidos/placeholder gravados antes da correção. */
async function repairInvalidClientHwids() {
    const clients = await client_1.default.client.findMany({
        where: { hwid: { not: null } },
        select: { id: true, hwid: true },
    });
    let fixed = 0;
    let cleared = 0;
    for (const row of clients) {
        const parsed = (0, hwid_1.parseHwid)(row.hwid);
        const next = parsed.canonical;
        if (row.hwid !== next) {
            await client_1.default.client.update({
                where: { id: row.id },
                data: { hwid: next },
            });
            fixed += 1;
            if (!next)
                cleared += 1;
        }
    }
    return {
        message: "HWIDs reparados (formato machine:/MAC: ou removidos se invalidos)",
        fixed,
        cleared,
        scanned: clients.length,
    };
}
//# sourceMappingURL=client.service.js.map