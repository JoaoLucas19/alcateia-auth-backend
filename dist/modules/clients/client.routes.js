"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const client_controller_1 = require("./client.controller");
const router = (0, express_1.Router)();
// Todas as rotas exigem admin autenticado
router.use(auth_middleware_1.authMiddleware);
// GET  /api/admin/clients?page=1&limit=20&search=xxx&status=active|banned|expired
router.get("/", client_controller_1.list);
// GET  /api/admin/clients/:id
router.get("/:id", client_controller_1.getOne);
// POST /api/admin/clients/:id/ban
router.post("/:id/ban", client_controller_1.ban);
// POST /api/admin/clients/:id/unban
router.post("/:id/unban", client_controller_1.unban);
// POST /api/admin/clients/:id/reset-hwid
router.post("/:id/reset-hwid", client_controller_1.resetHwid);
// DELETE /api/admin/clients/:id
router.delete("/:id", client_controller_1.remove);
exports.default = router;
//# sourceMappingURL=client.routes.js.map