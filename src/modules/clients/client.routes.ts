import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { list, getOne, ban, unban, resetHwid, remove } from "./client.controller";

const router = Router();

// Todas as rotas exigem admin autenticado
router.use(authMiddleware);

// GET  /api/admin/clients?page=1&limit=20&search=xxx&status=active|banned|expired
router.get("/", list);

// GET  /api/admin/clients/:id
router.get("/:id", getOne);

// POST /api/admin/clients/:id/ban
router.post("/:id/ban", ban);

// POST /api/admin/clients/:id/unban
router.post("/:id/unban", unban);

// POST /api/admin/clients/:id/reset-hwid
router.post("/:id/reset-hwid", resetHwid);

// DELETE /api/admin/clients/:id
router.delete("/:id", remove);

export default router;