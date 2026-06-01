import prisma from "../../prisma/client";

const clientInclude = {
  key: { include: { product: true } },
} as const;

export const clientRepository = {
  async findPaginated(filters: {
    page: number;
    limit: number;
    search?: string;
    status?: "active" | "banned" | "expired";
    discordId?: string;
  }) {
    const { page, limit, search, status, discordId } = filters;
    const skip = (page - 1) * limit;

    const where: Record<string, unknown> = {};

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
        include: clientInclude,
      }),
    ]);

    return { total, clients, page, limit, totalPages: Math.ceil(total / limit) };
  },

  async findById(id: string) {
    return prisma.client.findUnique({
      where: { id },
      include: clientInclude,
    });
  },

  async findByUsername(username: string) {
    return prisma.client.findUnique({
      where: { username },
      include: clientInclude,
    });
  },

  async findByDiscordId(discordId: string) {
    return prisma.client.findFirst({
      where: { discordId },
      include: clientInclude,
    });
  },

  async findByKeyValue(keyValue: string) {
    return prisma.client.findFirst({
      where: { key: { value: keyValue.trim() } },
      include: clientInclude,
    });
  },

  async findByKeyId(keyId: string) {
    return prisma.client.findUnique({
      where: { keyId },
      include: clientInclude,
    });
  },

  async updatePassword(id: string, passwordHash: string) {
    return prisma.client.update({
      where: { id },
      data: { passwordHash },
    });
  },

  async updateDiscordId(id: string, discordId: string | null) {
    return prisma.client.update({
      where: { id },
      data: { discordId },
    });
  },

  async updateExpiresAt(id: string, expiresAt: Date) {
    return prisma.client.update({
      where: { id },
      data: { expiresAt },
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

  async countBanned() {
    return prisma.client.count({ where: { isBanned: true } });
  },

  async countExpired() {
    return prisma.client.count({
      where: { isBanned: false, expiresAt: { lt: new Date() } },
    });
  },

  /** Ativos sem HWID vinculado (null ou vazio). */
  async countActiveWithoutHwid() {
    return prisma.client.count({
      where: {
        isBanned: false,
        expiresAt: { gt: new Date() },
        OR: [{ hwid: null }, { hwid: "" }],
      },
    });
  },
};
