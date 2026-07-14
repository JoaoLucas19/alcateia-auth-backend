import { Router } from "express";
import { z } from "zod";
import {
  overview,
  list,
  getById,
  create,
  update,
  ban,
  unban,
  pause,
  unpause,
  listKeys,
  bulkKeys,
  history,
} from "./reseller.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";

const createSchema = z.object({
  name: z.string().min(1, "Nome da loja obrigatório").max(120),
  owner: z.string().min(1, "Responsável obrigatório").max(120),
  discord: z.string().max(120).optional().nullable(),
  email: z.string().email("E-mail inválido").optional().nullable().or(z.literal("")),
  notes: z.string().max(2000).optional().nullable(),
});

const updateSchema = z.object({
  name: z.string().min(1).max(120).optional(),
  owner: z.string().min(1).max(120).optional(),
  discord: z.string().max(120).optional().nullable(),
  email: z.string().email("E-mail inválido").optional().nullable().or(z.literal("")),
  notes: z.string().max(2000).optional().nullable(),
  status: z.enum(["ACTIVE", "PAUSED", "BANNED", "INACTIVE"]).optional(),
});

const bulkSchema = z.object({
  action: z.enum(["pause", "ban", "unpause", "reactivate"]),
  keyIds: z.array(z.string().uuid()).min(1).max(200),
});

const router = Router();

router.use(authMiddleware);

router.get("/overview", overview);
router.get("/", list);
router.post("/", validate(createSchema), create);
router.get("/:id/keys", listKeys);
router.post("/:id/keys/bulk", validate(bulkSchema), bulkKeys);
router.get("/:id/history", history);
router.patch("/:id/ban", ban);
router.patch("/:id/unban", unban);
router.patch("/:id/pause", pause);
router.patch("/:id/unpause", unpause);
router.get("/:id", getById);
router.patch("/:id", validate(updateSchema), update);

export default router;
