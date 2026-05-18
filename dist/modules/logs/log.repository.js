"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logRepository = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.logRepository = {
    // Logs de acesso paginados
    findAccessLogs: async ({ page, limit, success }) => {
        const where = success !== undefined ? { success } : {};
        const [data, total] = await Promise.all([
            client_1.default.accessLog.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
            }),
            client_1.default.accessLog.count({ where }),
        ]);
        return { data, total, page, totalPages: Math.ceil(total / limit) };
    },
    // Logs de uso de keys paginados
    findKeyLogs: async ({ page, limit, result }) => {
        const where = result ? { result: result } : {};
        const [data, total] = await Promise.all([
            client_1.default.keyUsageLog.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: { key: { select: { value: true } } },
                orderBy: { attemptedAt: "desc" },
            }),
            client_1.default.keyUsageLog.count({ where }),
        ]);
        return { data, total, page, totalPages: Math.ceil(total / limit) };
    },
    // Stats para o dashboard
    getDashboardStats: async () => {
        const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);
        const [keysByStatus, logins24h, validations24h, topInvalidIps] = await Promise.all([
            client_1.default.key.groupBy({ by: ["status"], _count: true }),
            client_1.default.accessLog.groupBy({ by: ["success"], where: { createdAt: { gte: since24h } }, _count: true }),
            client_1.default.keyUsageLog.groupBy({ by: ["result"], where: { attemptedAt: { gte: since24h } }, _count: true }),
            client_1.default.keyUsageLog.groupBy({
                by: ["ipAddress"],
                where: { result: "INVALID_KEY", attemptedAt: { gte: since24h } },
                _count: true,
                orderBy: { _count: { ipAddress: "desc" } },
                take: 5,
            }),
        ]);
        return { keysByStatus, logins24h, validations24h, topInvalidIps };
    },
};
//# sourceMappingURL=log.repository.js.map