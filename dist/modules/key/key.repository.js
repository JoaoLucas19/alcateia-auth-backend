"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.keyRepository = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.keyRepository = {
    create: (data) => client_1.default.key.create({ data }),
    createMany: (keys) => client_1.default.key.createMany({ data: keys }),
    findPaginated: async ({ page, limit, status, productId, search }) => {
        const where = {
            ...(status && { status }),
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
                include: { product: { select: { name: true } }, createdBy: { select: { username: true } } },
                orderBy: { createdAt: "desc" },
            }),
            client_1.default.key.count({ where }),
        ]);
        return { data, total, page, totalPages: Math.ceil(total / limit) };
    },
    findById: (id) => client_1.default.key.findUnique({
        where: { id },
        include: {
            product: true,
            createdBy: { select: { id: true, username: true } },
            usageLogs: { orderBy: { attemptedAt: "desc" } },
        },
    }),
    findByValue: (value) => client_1.default.key.findUnique({ where: { value } }),
    valueExists: async (value) => !!(await client_1.default.key.findUnique({ where: { value }, select: { id: true } })),
    update: (id, data) => client_1.default.key.update({ where: { id }, data }),
    revoke: (id) => client_1.default.key.update({ where: { id }, data: { status: "REVOKED" } }),
    activate: (id) => client_1.default.key.update({ where: { id }, data: { status: "USED", activatedAt: new Date() } }),
    delete: (id) => client_1.default.key.delete({ where: { id } }),
};
//# sourceMappingURL=key.repository.js.map