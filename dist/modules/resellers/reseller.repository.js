"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resellerRepository = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const enums_1 = require("../../prisma/enums");
function mapUiStatus(status) {
    if (!status || status === "all")
        return undefined;
    if (status === "active")
        return enums_1.ResellerStatus.ACTIVE;
    if (status === "paused")
        return enums_1.ResellerStatus.PAUSED;
    if (status === "banned")
        return enums_1.ResellerStatus.BANNED;
    return undefined;
}
exports.resellerRepository = {
    create: (data) => client_1.default.reseller.create({
        data: {
            name: data.name,
            owner: data.owner,
            discord: data.discord ?? null,
            email: data.email ?? null,
            notes: data.notes ?? null,
            status: data.status ?? enums_1.ResellerStatus.ACTIVE,
        },
    }),
    update: (id, data) => client_1.default.reseller.update({
        where: { id },
        data,
    }),
    findById: (id) => client_1.default.reseller.findUnique({
        where: { id },
        include: {
            _count: { select: { keys: true } },
        },
    }),
    findPaginated: async ({ page, limit, status, search }) => {
        const mapped = mapUiStatus(status);
        const where = {
            ...(mapped ? { status: mapped } : {}),
            ...(search
                ? {
                    OR: [
                        { name: { contains: search } },
                        { owner: { contains: search } },
                        { discord: { contains: search } },
                        { email: { contains: search } },
                        { keys: { some: { value: { contains: search } } } },
                        { keys: { some: { product: { name: { contains: search } } } } },
                    ],
                }
                : {}),
        };
        const [data, total] = await Promise.all([
            client_1.default.reseller.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    keys: { select: { id: true, status: true } },
                },
            }),
            client_1.default.reseller.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            totalPages: Math.max(1, Math.ceil(total / limit)),
        };
    },
    findAllWithKeys: () => client_1.default.reseller.findMany({
        include: {
            keys: { select: { id: true, status: true } },
        },
        orderBy: { createdAt: "desc" },
    }),
    countAll: () => client_1.default.reseller.count(),
    countKeysByStatus: async () => {
        const rows = await client_1.default.key.groupBy({
            by: ["status"],
            _count: true,
            where: { resellerId: { not: null } },
        });
        return Object.fromEntries(rows.map((r) => [r.status, r._count]));
    },
    countAllKeysLinked: () => client_1.default.key.count({
        where: { resellerId: { not: null } },
    }),
    addHistory: (data) => client_1.default.resellerHistory.create({
        data: {
            resellerId: data.resellerId,
            type: data.type,
            description: data.description,
            actor: data.actor ?? "admin",
            metadata: data.metadata ?? null,
        },
    }),
    findHistory: async (resellerId, page, limit) => {
        const where = { resellerId };
        const [data, total] = await Promise.all([
            client_1.default.resellerHistory.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            client_1.default.resellerHistory.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            totalPages: Math.max(1, Math.ceil(total / limit)),
        };
    },
    findKeys: async (resellerId, page, limit) => {
        const where = { resellerId };
        const [data, total] = await Promise.all([
            client_1.default.key.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
                include: {
                    product: { select: { id: true, name: true } },
                    client: { select: { username: true } },
                },
            }),
            client_1.default.key.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            totalPages: Math.max(1, Math.ceil(total / limit)),
        };
    },
    findKeysByIds: (resellerId, keyIds) => client_1.default.key.findMany({
        where: {
            resellerId,
            id: { in: keyIds },
        },
        select: {
            id: true,
            status: true,
            activatedAt: true,
            client: { select: { id: true } },
        },
    }),
    updateKeysStatus: (keyIds, status) => client_1.default.key.updateMany({
        where: { id: { in: keyIds } },
        data: { status },
    }),
    countFailedLogins24hByReseller: async (since) => {
        const rows = await client_1.default.clientAccessLog.groupBy({
            by: ["clientId"],
            where: {
                success: false,
                createdAt: { gte: since },
                clientId: { not: null },
            },
            _count: true,
        });
        if (rows.length === 0)
            return new Map();
        const clientIds = rows
            .map((r) => r.clientId)
            .filter((id) => Boolean(id));
        const clients = await client_1.default.client.findMany({
            where: { id: { in: clientIds } },
            select: {
                id: true,
                key: { select: { resellerId: true } },
            },
        });
        const clientToReseller = new Map(clients
            .filter((c) => c.key.resellerId)
            .map((c) => [c.id, c.key.resellerId]));
        const map = new Map();
        for (const row of rows) {
            if (!row.clientId)
                continue;
            const resellerId = clientToReseller.get(row.clientId);
            if (!resellerId)
                continue;
            map.set(resellerId, (map.get(resellerId) ?? 0) + row._count);
        }
        return map;
    },
};
//# sourceMappingURL=reseller.repository.js.map