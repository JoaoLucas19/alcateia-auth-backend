import { Router } from "express";
import { z } from "zod";
import { generate, list, getById, revoke, update, remove } from "./key.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";

const generateSchema = z.object({
  productId: z.string().uuid("productId deve ser um UUID válido"),
  quantity: z.number().int().min(1).max(50),
  customerEmail: z.string().email().optional(),
  customerName: z.string().optional(),
  expiresAt: z.string().datetime().optional().refine(
    (v) => !v || new Date(v) > new Date(),
    { message: "expiresAt deve ser uma data futura" }
  ),
});

const updateSchema = z.object({
  customerEmail: z.string().email().optional(),
  customerName: z.string().optional(),
  expiresAt: z.string().datetime().optional(),
});

const router = Router();

router.use(authMiddleware);

router.post("/generate", validate(generateSchema), generate);
router.get("/", list);
router.get("/:id", getById);
router.patch("/:id/revoke", revoke);
router.patch("/:id", validate(updateSchema), update);
router.delete("/:id", remove);

export default router;