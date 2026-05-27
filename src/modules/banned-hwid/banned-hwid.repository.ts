import prisma from "../../prisma/client";

export const bannedHwidRepository = {
  async findByHwid(hwid: string) {
    return prisma.bannedHwid.findUnique({ where: { hwid: hwid.trim() } });
  },

  async findPaginated(filters: { page: number; limit: number; search?: string }) {
    const { page, limit, search } = filters;
    const skip = (page - 1) * limit;

    const where = search
      ? {
          OR: [{ hwid: { contains: search } }, { reason: { contains: search } }],
        }
      : {};

    const [total, items] = await Promise.all([
      prisma.bannedHwid.count({ where }),
      prisma.bannedHwid.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return { total, items, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async create(hwid: string, reason?: string) {
    return prisma.bannedHwid.create({
      data: { hwid: hwid.trim(), reason: reason ?? null },
    });
  },

  async deleteById(id: string) {
    return prisma.bannedHwid.delete({ where: { id } });
  },

  async deleteByHwid(hwid: string) {
    return prisma.bannedHwid.delete({ where: { hwid: hwid.trim() } });
  },
};
