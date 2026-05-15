// Essa função foi modificada
import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { login, logout, me } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5,
  message: { code: "RATE_LIMIT", message: "Muitas tentativas. Tente novamente em 15 minutos." },
});

const loginSchema = z.object({
  username: z.string().min(1, "Username obrigatório"),
  password: z.string().min(1, "Senha obrigatória"),
});

const router = Router();

router.post("/login", loginLimiter, validate(loginSchema), login);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, me); // NOVO: valida token e retorna admin

export default router;