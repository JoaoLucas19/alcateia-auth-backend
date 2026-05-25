import prisma from "../../prisma/client";
import { KeyStatus } from "@prisma/client";

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
      prisma.key.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: {
          product: { select: { name: true } },
          createdBy: { select: { username: true } },
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

  // Marca keys expiradas
  markExpiredKeys: () =>
    prisma.key.updateMany({
      where: {
        // Nunca toca permanentes
        isPermanent: false,

        // Só keys com data válida
        expiresAt: {
          not: null,
          lt: new Date(),
        },

        // Não remarka expiradas
        status: {
          not: "EXPIRED",
        },
      },

      data: {
        status: "EXPIRED",
      },
    }),

  deleteExpiredKeys: () =>
    prisma.key.deleteMany({
      where: {
        isPermanent: false,

        status: "EXPIRED",

        expiresAt: {
          not: null,
          lt: new Date(),
        },
      },
    }),

  delete: (id: string) =>
    prisma.key.delete({
      where: { id },
    }),
};
