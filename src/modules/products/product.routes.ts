import { Router } from "express";
import { z } from "zod";
import { create, list, getById, update, remove } from "./product.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";

const createSchema = z.object({
  name: z.string().min(1, "Nome obrigatório"),
  description: z.string().optional(),
});

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  isActive: z.boolean().optional(),
});

const router = Router();

router.use(authMiddleware);

router.post("/", validate(createSchema), create);
router.get("/", list);
router.get("/:id", getById);
router.patch("/:id", validate(updateSchema), update);
router.delete("/:id", remove);

export default router;