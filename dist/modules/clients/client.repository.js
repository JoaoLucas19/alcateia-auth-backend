"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRepository = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const clientInclude = {
    key: { include: { product: true } },
};
exports.clientRepository = {
    async findPaginated(filters) {
        const { page, limit, search, status, discordId } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (discordId) {
            where.discordId = discordId;
        }
        if (search) {
            where.OR = [
                { username: { contains: search } },
                { hwid: { contains: search } },
                { discordId: { contains: search } },
                { key: { value: { contains: search } } },
            ];
        }
        if (status === "banned") {
            where.isBanned = true;
        }
        else if (status === "active") {
            where.isBanned = false;
            where.expiresAt = { gt: new Date() };
        }
        else if (status === "expired") {
            where.isBanned = false;
            where.expiresAt = { lt: new Date() };
        }
        const [total, clients] = await Promise.all([
            client_1.default.client.count({ where }),
            client_1.default.client.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: clientInclude,
            }),
        ]);
        return { total, clients, page, limit, totalPages: Math.ceil(total / limit) };
    },
    async findById(id) {
        return client_1.default.client.findUnique({
            where: { id },
            include: clientInclude,
        });
    },
    async findByUsername(username) {
        return client_1.default.client.findUnique({
            where: { username },
            include: clientInclude,
        });
    },
    async findByDiscordId(discordId) {
        return client_1.default.client.findFirst({
            where: { discordId },
            include: clientInclude,
        });
    },
    async findByKeyValue(keyValue) {
        return client_1.default.client.findFirst({
            where: { key: { value: keyValue.trim() } },
            include: clientInclude,
        });
    },
    async findByKeyId(keyId) {
        return client_1.default.client.findUnique({
            where: { keyId },
            include: clientInclude,
        });
    },
    async updatePassword(id, passwordHash) {
        return client_1.default.client.update({
            where: { id },
            data: { passwordHash },
        });
    },
    async updateDiscordId(id, discordId) {
        return client_1.default.client.update({
            where: { id },
            data: { discordId },
        });
    },
    async updateExpiresAt(id, expiresAt) {
        return client_1.default.client.update({
            where: { id },
            data: { expiresAt },
        });
    },
    async ban(id) {
        return client_1.default.client.update({ where: { id }, data: { isBanned: true } });
    },
    async unban(id) {
        return client_1.default.client.update({ where: { id }, data: { isBanned: false } });
    },
    async resetHwid(id) {
        return client_1.default.client.update({ where: { id }, data: { hwid: null } });
    },
    async delete(id) {
        return client_1.default.client.delete({ where: { id } });
    },
    async countTotal() {
        return client_1.default.client.count();
    },
    async countActive() {
        return client_1.default.client.count({
            where: { isBanned: false, expiresAt: { gt: new Date() } },
        });
    },
    async countBanned() {
        return client_1.default.client.count({ where: { isBanned: true } });
    },
    async countExpired() {
        return client_1.default.client.count({
            where: { isBanned: false, expiresAt: { lt: new Date() } },
        });
    },
    /** Ativos sem HWID vinculado (null ou vazio). */
    async countActiveWithoutHwid() {
        return client_1.default.client.count({
            where: {
                isBanned: false,
                expiresAt: { gt: new Date() },
                OR: [{ hwid: null }, { hwid: "" }],
            },
        });
    },
};
//# sourceMappingURL=client.repository.js.map