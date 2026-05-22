import prisma from "../../prisma/client";

export const clientRepository = {
  async findPaginated(filters: {
    page: number;
    limit: number;
    search?: string;
    status?: "active" | "banned" | "expired";
  }) {
    const { page, limit, search, status } = filters;
    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        { username: { contains: search } },
        { hwid: { contains: search } },
      ];
    }

    if (status === "banned") {
      where.isBanned = true;
    } else if (status === "active") {
      where.isBanned = false;
      where.expiresAt = { gt: new Date() };
    } else if (status === "expired") {
      where.isBanned = false;
      where.expiresAt = { lt: new Date() };
    }

    const [total, clients] = await Promise.all([
      prisma.client.count({ where }),
      prisma.client.findMany({
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

  async findById(id: string) {
    return prisma.client.findUnique({
      where: { id },
      include: { key: { include: { product: true } } },
    });
  },

  async ban(id: string) {
    return prisma.client.update({ where: { id }, data: { isBanned: true } });
  },

  async unban(id: string) {
    return prisma.client.update({ where: { id }, data: { isBanned: false } });
  },

  async resetHwid(id: string) {
    return prisma.client.update({ where: { id }, data: { hwid: null } });
  },

  async delete(id: string) {
    return prisma.client.delete({ where: { id } });
  },

  async countTotal() {
    return prisma.client.count();
  },

  async countActive() {
    return prisma.client.count({
      where: { isBanned: false, expiresAt: { gt: new Date() } },
    });
  },
};