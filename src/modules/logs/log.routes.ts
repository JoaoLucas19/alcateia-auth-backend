import { Router } from "express";
import { getAccessLogs, getKeyLogs, getDashboard } from "./log.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/dashboard", getDashboard);
router.get("/access",    getAccessLogs);
router.get("/keys",      getKeyLogs);

export default router;