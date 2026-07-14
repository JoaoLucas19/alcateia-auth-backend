"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const zod_1 = require("zod");
const reseller_controller_1 = require("./reseller.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const createSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Nome da loja obrigatório").max(120),
    owner: zod_1.z.string().min(1, "Responsável obrigatório").max(120),
    discord: zod_1.z.string().max(120).optional().nullable(),
    email: zod_1.z.string().email("E-mail inválido").optional().nullable().or(zod_1.z.literal("")),
    notes: zod_1.z.string().max(2000).optional().nullable(),
});
const updateSchema = zod_1.z.object({
    name: zod_1.z.string().min(1).max(120).optional(),
    owner: zod_1.z.string().min(1).max(120).optional(),
    discord: zod_1.z.string().max(120).optional().nullable(),
    email: zod_1.z.string().email("E-mail inválido").optional().nullable().or(zod_1.z.literal("")),
    notes: zod_1.z.string().max(2000).optional().nullable(),
    status: zod_1.z.enum(["ACTIVE", "PAUSED", "BANNED", "INACTIVE"]).optional(),
});
const bulkSchema = zod_1.z.object({
    action: zod_1.z.enum(["pause", "ban", "unpause", "reactivate", "delete"]),
    keyIds: zod_1.z.array(zod_1.z.string().uuid()).min(1).max(200),
});
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get("/overview", reseller_controller_1.overview);
router.get("/", reseller_controller_1.list);
router.post("/", (0, validate_middleware_1.validate)(createSchema), reseller_controller_1.create);
router.get("/:id/keys", reseller_controller_1.listKeys);
router.post("/:id/keys/bulk", (0, validate_middleware_1.validate)(bulkSchema), reseller_controller_1.bulkKeys);
router.get("/:id/history", reseller_controller_1.history);
router.patch("/:id/ban", reseller_controller_1.ban);
router.patch("/:id/unban", reseller_controller_1.unban);
router.patch("/:id/pause", reseller_controller_1.pause);
router.patch("/:id/unpause", reseller_controller_1.unpause);
router.get("/:id", reseller_controller_1.getById);
router.patch("/:id", (0, validate_middleware_1.validate)(updateSchema), reseller_controller_1.update);
exports.default = router;
//# sourceMappingURL=reseller.routes.js.map