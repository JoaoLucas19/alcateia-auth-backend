import { Router } from "express";
import {
  getAccessLogs,
  getDashboard,
  getFailedLogins,
  getKeyLogs,
  getSecurity,
} from "./log.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/dashboard", getDashboard);
router.get("/security", getSecurity);
router.get("/failed-logins", getFailedLogins);
router.get("/access", getAccessLogs);
router.get("/keys", getKeyLogs);

export default router;
