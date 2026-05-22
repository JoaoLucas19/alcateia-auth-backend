import { Request, Response, NextFunction, Router } from "express";
import rateLimit from "express-rate-limit";
import { z, ZodSchema } from "zod";
import { clientLogin, clientRegister } from "./client-auth.controller";

function validateClient(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Dados invalidos";
      res.status(400).json({ success: false, message });
      return;
    }
    req.body = result.data;
    next();
  };
}

/** Rotas públicas para o menu interno (cheat) — formato compatível com NeverApi C++ */
const clientRegisterSchema = z.object({
  username: z.string().min(3, "Usuario deve ter no minimo 3 caracteres").max(32),
  password: z.string().min(4, "Senha deve ter no minimo 4 caracteres").max(128),
  license: z.string().min(1, "Key obrigatoria"),
  hwid: z.string().optional(),
  ipAddress: z.string().optional(),
});

const clientLoginSchema = z.object({
  username: z.string().min(1, "Usuario obrigatorio"),
  password: z.string().min(1, "Senha obrigatoria"),
  hwid: z.string().optional(),
  ipAddress: z.string().optional(),
});

const clientAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: {
    success: false,
    message: "Muitas tentativas. Aguarde 15 minutos.",
    code: "RATE_LIMIT",
  },
});

const router = Router();

router.post("/register", clientAuthLimiter, validateClient(clientRegisterSchema), clientRegister);
router.post("/login", clientAuthLimiter, validateClient(clientLoginSchema), clientLogin);

export default router;
