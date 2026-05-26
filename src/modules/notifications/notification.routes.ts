import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { sendTestAlert, testDiscord } from "./notification.controller";

const router = Router();

router.use(authMiddleware);

router.post("/discord/test", testDiscord);
router.post("/discord/test-alert", sendTestAlert);

export default router;
