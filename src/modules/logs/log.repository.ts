import prisma from "../../prisma/client";

export const logRepository = {

  // Logs de acesso paginados
  findAccessLogs: async ({ page, limit, success }: { page: number; limit: number; success?: boolean }) => {
    const where = success !== undefined ? { success } : {};
    const [data, total] = await Promise.all([
      prisma.accessLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.accessLog.count({ where }),
    ]);
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  },

  // Logs de uso de keys paginados
  findKeyLogs: async ({ page, limit, result }: { page: number; limit: number; result?: string }) => {
    const where = result ? { result: result as any } : {};
    const [data, total] = await Promise.all([
      prisma.keyUsageLog.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { key: { select: { value: true } } },
        orderBy: { attemptedAt: "desc" },
      }),
      prisma.keyUsageLog.count({ where }),
    ]);
    return { data, total, page, totalPages: Math.ceil(total / limit) };
  },

  // Stats para o dashboard
  getDashboardStats: async () => {
    const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [keysByStatus, logins24h, validations24h, topInvalidIps] = await Promise.all([
      prisma.key.groupBy({ by: ["status"], _count: true }),
      prisma.accessLog.groupBy({ by: ["success"], where: { createdAt: { gte: since24h } }, _count: true }),
      prisma.keyUsageLog.groupBy({ by: ["result"], where: { attemptedAt: { gte: since24h } }, _count: true }),
      prisma.keyUsageLog.groupBy({
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