import prisma from "../../prisma/client";
import { KeyStatus, ResellerStatus, Prisma } from "../../prisma/enums";

export type ResellerListFilters = {
  page: number;
  limit: number;
  status?: "all" | "active" | "paused" | "banned";
  search?: string;
};

function mapUiStatus(status?: ResellerListFilters["status"]): ResellerStatus | undefined {
  if (!status || status === "all") return undefined;
  if (status === "active") return ResellerStatus.ACTIVE;
  if (status === "paused") return ResellerStatus.PAUSED;
  if (status === "banned") return ResellerStatus.BANNED;
  return undefined;
}

export const resellerRepository = {
  create: (data: {
    name: string;
    owner: string;
    discord?: string | null;
    email?: string | null;
    notes?: string | null;
    status?: ResellerStatus;
  }) =>
    prisma.reseller.create({
      data: {
        name: data.name,
        owner: data.owner,
        discord: data.discord ?? null,
        email: data.email ?? null,
        notes: data.notes ?? null,
        status: data.status ?? ResellerStatus.ACTIVE,
      },
    }),

  update: (
    id: string,
    data: {
      name?: string;
      owner?: string;
      discord?: string | null;
      email?: string | null;
      notes?: string | null;
      status?: ResellerStatus;
    }
  ) =>
    prisma.reseller.update({
      where: { id },
      data,
    }),

  findById: (id: string) =>
    prisma.reseller.findUnique({
      where: { id },
      include: {
        _count: { select: { keys: true } },
      },
    }),

  findPaginated: async ({ page, limit, status, search }: ResellerListFilters) => {
    const mapped = mapUiStatus(status);
    const where: Prisma.ResellerWhereInput = {
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
      prisma.reseller.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          keys: { select: { id: true, status: true } },
        },
      }),
      prisma.reseller.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  },

  findAllWithKeys: () =>
    prisma.reseller.findMany({
      include: {
        keys: { select: { id: true, status: true } },
      },
      orderBy: { createdAt: "desc" },
    }),

  countAll: () => prisma.reseller.count(),

  countKeysByStatus: async () => {
    const rows = await prisma.key.groupBy({
      by: ["status"],
      _count: true,
      where: { resellerId: { not: null } },
    });
    return Object.fromEntries(rows.map((r) => [r.status, r._count])) as Record<string, number>;
  },

  countAllKeysLinked: () =>
    prisma.key.count({
      where: { resellerId: { not: null } },
    }),

  addHistory: (data: {
    resellerId: string;
    type: string;
    description: string;
    actor?: string;
    metadata?: string | null;
  }) =>
    prisma.resellerHistory.create({
      data: {
        resellerId: data.resellerId,
        type: data.type,
        description: data.description,
        actor: data.actor ?? "admin",
        metadata: data.metadata ?? null,
      },
    }),

  findHistory: async (resellerId: string, page: number, limit: number) => {
    const where = { resellerId };
    const [data, total] = await Promise.all([
      prisma.resellerHistory.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.resellerHistory.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  },

  findKeys: async (resellerId: string, page: number, limit: number) => {
    const where = { resellerId };
    const [data, total] = await Promise.all([
      prisma.key.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          product: { select: { id: true, name: true } },
          client: { select: { username: true } },
        },
      }),
      prisma.key.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.max(1, Math.ceil(total / limit)),
    };
  },

  findKeysByIds: (resellerId: string, keyIds: string[]) =>
    prisma.key.findMany({
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

  updateKeysStatus: (keyIds: string[], status: KeyStatus) =>
    prisma.key.updateMany({
      where: { id: { in: keyIds } },
      data: { status },
    }),

  /** Banir loja = apagar loja + histórico + keys + clientes vinculados */
  deleteCompletely: async (resellerId: string) => {
    return prisma.$transaction(async (tx) => {
      const keys = await tx.key.findMany({
        where: { resellerId },
        select: { id: true },
      });
      const keyIds = keys.map((k) => k.id);
      let deletedClients = 0;

      if (keyIds.length > 0) {
        await tx.keyUsageLog.deleteMany({ where: { keyId: { in: keyIds } } });

        const clients = await tx.client.findMany({
          where: { keyId: { in: keyIds } },
          select: { id: true },
        });
        const clientIds = clients.map((c) => c.id);
        deletedClients = clientIds.length;

        if (clientIds.length > 0) {
          await tx.clientAccessLog.deleteMany({ where: { clientId: { in: clientIds } } });
          await tx.client.deleteMany({ where: { id: { in: clientIds } } });
        }

        await tx.key.deleteMany({ where: { id: { in: keyIds } } });
      }

      await tx.resellerHistory.deleteMany({ where: { resellerId } });
      await tx.reseller.delete({ where: { id: resellerId } });

      return {
        deletedKeys: keyIds.length,
        deletedClients,
      };
    });
  },

  countFailedLogins24hByReseller: async (since: Date) => {
    const rows = await prisma.clientAccessLog.groupBy({
      by: ["clientId"],
      where: {
        success: false,
        createdAt: { gte: since },
        clientId: { not: null },
      },
      _count: true,
    });

    if (rows.length === 0) return new Map<string, number>();

    const clientIds = rows
      .map((r) => r.clientId)
      .filter((id): id is string => Boolean(id));

    const clients = await prisma.client.findMany({
      where: { id: { in: clientIds } },
      select: {
        id: true,
        key: { select: { resellerId: true } },
      },
    });

    const clientToReseller = new Map(
      clients
        .filter((c) => c.key.resellerId)
        .map((c) => [c.id, c.key.resellerId as string])
    );

    const map = new Map<string, number>();
    for (const row of rows) {
      if (!row.clientId) continue;
      const resellerId = clientToReseller.get(row.clientId);
      if (!resellerId) continue;
      map.set(resellerId, (map.get(resellerId) ?? 0) + row._count);
    }
    return map;
  },
};
