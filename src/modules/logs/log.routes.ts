import { Router } from "express";
import {
  exportLogsJson,
  getAccessLogs,
  getClientAccessLogs,
  getClientAudit,
  getDashboard,
  getFailedLogins,
  getKeyLogs,
  getLogFeed,
  getLogOverview,
  getSecurity,
  investigateIp,
} from "./log.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/overview", getLogOverview);
router.get("/feed", getLogFeed);
router.get("/export", exportLogsJson);
router.get("/investigate", investigateIp);
router.get("/clients/:username/audit", getClientAudit);
router.get("/client-access", getClientAccessLogs);

router.get("/dashboard", getDashboard);
router.get("/security", getSecurity);
router.get("/failed-logins", getFailedLogins);
router.get("/access", getAccessLogs);
router.get("/keys", getKeyLogs);

export default router;
