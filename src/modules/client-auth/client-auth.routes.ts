import { Request, Response, NextFunction, Router } from "express";
import { z, ZodSchema } from "zod";
import { clientLogin, clientRegister } from "./client-auth.controller";
import { createClientAuthLimiter } from "../../config/rate-limit";
import { clientLoginSchema, clientRegisterSchema } from "../../utils/auth-schemas";
import {
  ipBlockMiddleware,
  rejectSuspiciousInput,
  requireJsonContentType,
} from "../../middlewares/security.middleware";

function validateClient(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const message = result.error.issues[0]?.message ?? "Dados invalidos";
      res.status(400).json({ success: false, message, code: "VALIDATION_ERROR" });
      return;
    }
    req.body = result.data;
    next();
  };
}

const clientAuthLimiter = createClientAuthLimiter();

const router = Router();

router.post(
  "/register",
  ipBlockMiddleware,
  clientAuthLimiter,
  requireJsonContentType,
  rejectSuspiciousInput,
  validateClient(clientRegisterSchema),
  clientRegister
);
router.post(
  "/login",
  ipBlockMiddleware,
  clientAuthLimiter,
  requireJsonContentType,
  rejectSuspiciousInput,
  validateClient(clientLoginSchema),
  clientLogin
);

export default router;
