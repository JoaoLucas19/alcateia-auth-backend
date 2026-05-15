"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const product_controller_1 = require("./product.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const createSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome obrigatório"),
    description: zod_1.z.string().optional(),
});
const updateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).optional(),
    description: zod_1.z.string().optional(),
    isActive: zod_1.z.boolean().optional(),
});
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post("/", (0, validate_middleware_1.validate)(createSchema), product_controller_1.create);
router.get("/", product_controller_1.list);
router.get("/:id", product_controller_1.getById);
router.patch("/:id", (0, validate_middleware_1.validate)(updateSchema), product_controller_1.update);
router.delete("/:id", product_controller_1.remove);
exports.default = router;
//# sourceMappingURL=product.routes.js.map