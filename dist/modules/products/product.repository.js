"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRepository = void 0;
const client_1 = __importDefault(require("../../prisma/client"));
exports.productRepository = {
    create: (data) => client_1.default.product.create({ data }),
    findAll: () => client_1.default.product.findMany({
        include: { _count: { select: { keys: true } } },
        orderBy: { createdAt: "desc" },
    }),
    findById: (id) => client_1.default.product.findUnique({
        where: { id },
        include: {
            _count: { select: { keys: true } },
            keys: { select: { status: true } },
        },
    }),
    update: (id, data) => client_1.default.product.update({ where: { id }, data }),
    delete: (id) => client_1.default.product.delete({ where: { id } }),
    hasKeys: async (id) => {
        const count = await client_1.default.key.count({ where: { productId: id } });
        return count > 0;
    },
};
//# sourceMappingURL=product.repository.js.map