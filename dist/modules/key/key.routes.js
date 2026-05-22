"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const key_controller_1 = require("./key.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const generateSchema = zod_1.z.object({
    productId: zod_1.z.string().uuid("productId deve ser um UUID válido"),
    quantity: zod_1.z.number().int().min(1).max(50),
    customerEmail: zod_1.z.string().email().optional(),
    customerName: zod_1.z.string().optional(),
    expiresAt: zod_1.z.string().datetime().optional().refine((v) => !v || new Date(v) > new Date(), { message: "expiresAt deve ser uma data futura" }),
    isPermanent: zod_1.z.boolean().optional(),
});
const updateSchema = zod_1.z.object({
    customerEmail: zod_1.z.string().email().optional(),
    customerName: zod_1.z.string().optional(),
    expiresAt: zod_1.z.string().datetime().optional(),
    isPermanent: zod_1.z.boolean().optional(),
});
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post("/generate", (0, validate_middleware_1.validate)(generateSchema), key_controller_1.generate);
router.get("/", key_controller_1.list);
router.get("/:id", key_controller_1.getById);
router.patch("/:id/revoke", key_controller_1.revoke);
router.patch("/:id", (0, validate_middleware_1.validate)(updateSchema), key_controller_1.update);
router.delete("/:id", key_controller_1.remove);
exports.default = router;
//# sourceMappingURL=key.routes.js.map