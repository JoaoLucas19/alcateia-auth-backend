"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyRepository = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
const client_2 = require("@prisma/client");
const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");
exports.keyRepository = {
    create: (data) => client_1.default.key.create({ data }),
    createMany: (keys) => client_1.default.key.createMany({ data: keys }),
    findPaginated: async ({ page, limit, status, productId, search, }) => {
        const where = {
            // Painel: por padrão oculta keys já expiradas (período encerrado)
            ...(status ? { status } : { status: { not: client_2.KeyStatus.EXPIRED } }),
            ...(productId && { productId }),
            ...(search && {
                OR: [
                    { value: { contains: search } },
                    { customerEmail: { contains: search } },
                ],
            }),
        };
        const [data, total] = await Promise.all([
            client_1.default.key.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    product: { select: { name: true } },
                    createdBy: { select: { username: true } },
                },
                orderBy: { createdAt: "desc" },
            }),
            client_1.default.key.count({ where }),
        ]);
        return {
            data,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        };
    },
    findById: (id) => client_1.default.key.findUnique({
        where: { id },
        include: {
            product: true,
            createdBy: {
                select: {
                    id: true,
                    username: true,
                },
            },
            usageLogs: {
                orderBy: {
                    attemptedAt: "desc",
                },
            },
        },
    }),
    findByValue: (value) => client_1.default.key.findUnique({
        where: { value },
    }),
    valueExists: async (value) => !!(await client_1.default.key.findUnique({
        where: { value },
        select: { id: true },
    })),
    update: (id, data) => client_1.default.key.update({
        where: { id },
        data,
    }),
    revoke: (id) => client_1.default.key.update({
        where: { id },
        data: { status: "REVOKED" },
    }),
    activate: (id) => client_1.default.key.update({
        where: { id },
        data: {
            status: "USED",
            activatedAt: new Date(),
        },
    }),
    // Marca keys expiradas (permanentes e lifetime nunca entram)
    markExpiredKeys: () => client_1.default.key.updateMany({
        where: {
            isPermanent: false,
            expiresAt: {
                not: null,
                lt: new Date(),
            },
            status: {
                not: "EXPIRED",
            },
        },
        data: {
            status: "EXPIRED",
        },
    }),
    // Remove keys expiradas sem cliente; apaga logs antes (FK em KeyUsageLog)
    deleteExpiredKeys: async () => {
        const expiredFilter = {
            isPermanent: false,
            status: client_2.KeyStatus.EXPIRED,
            expiresAt: {
                not: null,
                lt: new Date(),
            },
            client: { is: null },
        };
        const keysToDelete = await client_1.default.key.findMany({
            where: expiredFilter,
            select: { id: true },
        });
        if (keysToDelete.length === 0) {
            return { count: 0 };
        }
        const ids = keysToDelete.map((k) => k.id);
        await client_1.default.keyUsageLog.deleteMany({
            where: { keyId: { in: ids } },
        });
        return client_1.default.key.deleteMany({
            where: { id: { in: ids } },
        });
    },
    /** Remove key e dependências (cliente do cheat + logs de uso). */
    deleteWithDependencies: (id) => client_1.default.$transaction(async (tx) => {
        await tx.keyUsageLog.deleteMany({ where: { keyId: id } });
        await tx.client.deleteMany({ where: { keyId: id } });
        return tx.key.delete({ where: { id } });
    }),
    /** IDs de keys permanentes (flag ou data sentinela 2099). */
    findPermanentKeyIds: async (onlyUnused = false) => {
        const permanentWhere = {
            OR: [{ isPermanent: true }, { expiresAt: { gte: LIFETIME_EXPIRY } }],
        };
        const where = onlyUnused
            ? {
                ...permanentWhere,
                status: client_2.KeyStatus.ACTIVE,
                activatedAt: null,
                client: { is: null },
            }
            : permanentWhere;
        const rows = await client_1.default.key.findMany({
            where,
            select: { id: true },
        });
        return rows.map((r) => r.id);
    },
};
//# sourceMappingURL=key.repository.js.map