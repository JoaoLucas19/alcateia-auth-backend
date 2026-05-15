import prisma from "../../prisma/client";

export const productRepository = {
  create: (data: { name: string; description?: string }) =>
    prisma.product.create({ data }),

  findAll: () =>
    prisma.product.findMany({
      include: { _count: { select: { keys: true } } },
      orderBy: { createdAt: "desc" },
    }),

  findById: (id: string) =>
    prisma.product.findUnique({
      where: { id },
      include: {
        _count: { select: { keys: true } },
        keys: { select: { status: true } },
      },
    }),

  update: (id: string, data: { name?: string; description?: string; isActive?: boolean }) =>
    prisma.product.update({ where: { id }, data }),

  delete: (id: string) =>
    prisma.product.delete({ where: { id } }),

  hasKeys: async (id: string) => {
    const count = await prisma.key.count({ where: { productId: id } });
    return count > 0;
  },
};