"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listClients = listClients;
exports.getClient = getClient;
exports.banClient = banClient;
exports.unbanClient = unbanClient;
exports.resetClientHwid = resetClientHwid;
exports.deleteClient = deleteClient;
const client_repository_1 = require("./client.repository");
const AppError_1 = require("../../utils/AppError");
const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");
function formatClient(client) {
    const isLifetime = client.key.isPermanent ||
        !client.expiresAt ||
        client.expiresAt >= LIFETIME_EXPIRY;
    const daysRemaining = isLifetime
        ? 99999
        : Math.max(0, Math.ceil((new Date(client.expiresAt).getTime() - Date.now()) /
            (1000 * 60 * 60 * 24)));
    return {
        id: client.id,
        username: client.username,
        hwid: client.hwid ?? null,
        isBanned: client.isBanned,
        loginCount: client.loginCount,
        lastLoginAt: client.lastLoginAt,
        createdAt: client.createdAt,
        expiresAt: client.expiresAt,
        isLifetime,
        daysRemaining,
        status: client.isBanned
            ? "banned"
            : isLifetime
                ? "active"
                : daysRemaining > 0
                    ? "active"
                    : "expired",
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
async function deleteClient(id) {
    const client = await client_repository_1.clientRepository.findById(id);
    if (!client)
        throw new AppError_1.AppError("Cliente não encontrado", 404, "CLIENT_NOT_FOUND");
    await client_repository_1.clientRepository.delete(id);
    return { message: "Cliente deletado com sucesso" };
}
//# sourceMappingURL=client.service.js.map