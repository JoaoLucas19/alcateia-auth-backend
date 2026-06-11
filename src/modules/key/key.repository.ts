import prisma from "../../prisma/client";
import { KeyStatus, Prisma } from "@prisma/client";

const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");

interface KeyFilters {
  page: number;
  limit: number;
  status?: KeyStatus;
  productId?: string;
  search?: string;
}

export const keyRepository = {
  create: (data: {
    value: string;
    productId: string;
    createdById: string;
    customerEmail?: string;
    customerName?: string;
    expiresAt?: Date;
    isPermanent?: boolean;
  }) => prisma.key.create({ data }),

  createMany: (
    keys: {
      value: string;
      productId: string;
      createdById: string;
      customerEmail?: string;
      customerName?: string;
      expiresAt?: Date;
      isPermanent?: boolean;
    }[],
  ) => prisma.key.createMany({ data: keys }),

  findPaginated: async ({
    page,
    limit,
    status,
    productId,
    search,
  }: KeyFilters) => {
    const where = {
      // Painel: por padrão oculta keys já expiradas (período encerrado)
      ...(status ? { status } : { status: { not: KeyStatus.EXPIRED } }),
      ...(productId && { productId }),
      ...(search && {
        OR: [
          { value: { contains: search } },
          { customerEmail: { contains: search } },
          { customerName: { contains: search } },
          { client: { username: { contains: search } } },
        ],
      }),
    };

    const [data, total] = await Promise.all([
      prisma.key.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          product: { select: { name: true } },
          createdBy: { select: { username: true } },
          client: { select: { username: true } },
        },
        orderBy: { createdAt: "desc" },
      }),

      prisma.key.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  },

  findById: (id: string) =>
    prisma.key.findUnique({
      where: { id },
      include: {
        product: true,
        createdBy: {
          select: {
            id: true,
            username: true,
          },
        },
        client: { select: { username: true } },
        usageLogs: {
          orderBy: {
            attemptedAt: "desc",
          },
        },
      },
    }),

  findByValue: (value: string) =>
    prisma.key.findUnique({
      where: { value },
    }),

  valueExists: async (value: string) =>
    !!(await prisma.key.findUnique({
      where: { value },
      select: { id: true },
    })),

  update: (
    id: string,
    data: {
      customerEmail?: string;
      customerName?: string;
      expiresAt?: Date | null;
      isPermanent?: boolean;
    },
  ) =>
    prisma.key.update({
      where: { id },
      data,
    }),

  revoke: (id: string) =>
    prisma.key.update({
      where: { id },
      data: { status: "REVOKED" },
    }),

  activate: (id: string) =>
    prisma.key.update({
      where: { id },
      data: {
        status: "USED",
        activatedAt: new Date(),
      },
    }),

  // Marca keys expiradas (permanentes e lifetime nunca entram)
  markExpiredKeys: () =>
    prisma.key.updateMany({
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
      status: KeyStatus.EXPIRED,
      expiresAt: {
        not: null,
        lt: new Date(),
      },
      client: { is: null },
    } as const;

    const keysToDelete = await prisma.key.findMany({
      where: expiredFilter,
      select: { id: true },
    });

    if (keysToDelete.length === 0) {
      return { count: 0 };
    }

    const ids = keysToDelete.map((k) => k.id);

    await prisma.keyUsageLog.deleteMany({
      where: { keyId: { in: ids } },
    });

    return prisma.key.deleteMany({
      where: { id: { in: ids } },
    });
  },

  /** Remove key e dependências (cliente do cheat + logs de uso). */
  deleteWithDependencies: (id: string) =>
    prisma.$transaction(async (tx) => {
      await tx.keyUsageLog.deleteMany({ where: { keyId: id } });
      await tx.client.deleteMany({ where: { keyId: id } });
      return tx.key.delete({ where: { id } });
    }),

  /** IDs de keys permanentes (flag ou data sentinela 2099). */
  findPermanentKeyIds: async (onlyUnused = false) => {
    const permanentWhere: Prisma.KeyWhereInput = {
      OR: [{ isPermanent: true }, { expiresAt: { gte: LIFETIME_EXPIRY } }],
    };

    const where: Prisma.KeyWhereInput = onlyUnused
      ? {
          ...permanentWhere,
          status: KeyStatus.ACTIVE,
          activatedAt: null,
          client: { is: null },
        }
      : permanentWhere;

    const rows = await prisma.key.findMany({
      where,
      select: { id: true },
    });

    return rows.map((r) => r.id);
  },
};
