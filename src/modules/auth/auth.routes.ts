// Essa função foi modificada
import { Router } from "express";
import { login, logout, me } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { createAdminLoginLimiter } from "../../config/rate-limit";
import { adminLoginSchema } from "../../utils/auth-schemas";
import {
  ipBlockMiddleware,
  rejectSuspiciousInput,
  rejectSuspiciousUserAgent,
  requireJsonContentType,
} from "../../middlewares/security.middleware";

const loginLimiter = createAdminLoginLimiter();

const router = Router();

router.post(
  "/login",
  ipBlockMiddleware,
  loginLimiter,
  requireJsonContentType,
  rejectSuspiciousUserAgent,
  rejectSuspiciousInput,
  validate(adminLoginSchema),
  login
);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, me);

export default router;
