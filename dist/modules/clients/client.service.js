"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveClientLookup = resolveClientLookup;
exports.listClients = listClients;
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
const bcrypt_1 = __importDefault(require("bcrypt"));
const client_repository_1 = require("./client.repository");
const AppError_1 = require("../../utils/AppError");
const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");
const BCRYPT_ROUNDS = 10;
function formatClient(client) {
    const isLifetime = client.key.isPermanent || !client.expiresAt || client.expiresAt >= LIFETIME_EXPIRY;
    const daysRemaining = isLifetime
        ? 99999
        : Math.max(0, Math.ceil((new Date(client.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
    return {
        id: client.id,
        username: client.username,
        hwid: client.hwid ?? null,
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
async function listClients(filters) {
    const result = await client_repository_1.clientRepository.findPaginated(filters);
    return {
        ...result,
        clients: result.clients.map(formatClient),
    };
}
async function getClient(id) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return formatClient(client);
}
async function getClientByDiscordId(discordId) {
    const client = await client_repository_1.clientRepository.findByDiscordId(discordId.trim());
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return formatClient(client);
}
async function getClientByKeyValue(keyValue) {
    const client = await client_repository_1.clientRepository.findByKeyValue(keyValue);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return formatClient(client);
}
async function getClientByUsername(username) {
    const client = await client_repository_1.clientRepository.findByUsername(username.trim());
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    return formatClient(client);
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
    return { message: "HWID resetado com sucesso", data: formatClient({ ...client, hwid: null }) };
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
    return { message: "Senha alterada com sucesso", data: formatClient(client) };
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
        data: formatClient(full),
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
//# sourceMappingURL=client.service.js.map