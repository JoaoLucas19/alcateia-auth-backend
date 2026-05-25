"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRepository = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.clientRepository = {
    async findPaginated(filters) {
        const { page, limit, search, status } = filters;
        const skip = (page - 1) * limit;
        const where = {};
        if (search) {
            where.OR = [
                { username: { contains: search } },
                { hwid: { contains: search } },
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
                include: {
                    key: {
                        include: { product: true },
                    },
                },
            }),
        ]);
        return { total, clients, page, limit, totalPages: Math.ceil(total / limit) };
    },
    async findById(id) {
        return client_1.default.client.findUnique({
            where: { id },
            include: { key: { include: { product: true } } },
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
};
//# sourceMappingURL=client.repository.js.map