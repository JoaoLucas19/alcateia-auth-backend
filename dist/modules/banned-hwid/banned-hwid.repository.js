"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bannedHwidRepository = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.bannedHwidRepository = {
    async findByHwid(hwid) {
        return client_1.default.bannedHwid.findUnique({ where: { hwid: hwid.trim() } });
    },
    async findPaginated(filters) {
        const { page, limit, search } = filters;
        const skip = (page - 1) * limit;
        const where = search
            ? {
                OR: [{ hwid: { contains: search } }, { reason: { contains: search } }],
            }
            : {};
        const [total, items] = await Promise.all([
            client_1.default.bannedHwid.count({ where }),
            client_1.default.bannedHwid.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
        ]);
        return { total, items, page, limit, totalPages: Math.ceil(total / limit) };
    },
    async create(hwid, reason) {
        return client_1.default.bannedHwid.create({
            data: { hwid: hwid.trim(), reason: reason ?? null },
        });
    },
    async deleteById(id) {
        return client_1.default.bannedHwid.delete({ where: { id } });
    },
    async deleteByHwid(hwid) {
        return client_1.default.bannedHwid.delete({ where: { hwid: hwid.trim() } });
    },
};
//# sourceMappingURL=banned-hwid.repository.js.map