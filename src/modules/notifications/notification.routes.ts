import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { updateNotificationSettingsSchema } from "./notification-settings.schemas";
import {
  getNotificationSettings,
  putNotificationSettings,
  sendTestAlert,
  testDiscord,
} from "./notification.controller";

const router = Router();

router.use(authMiddleware);

router.get("/settings", getNotificationSettings);
router.put("/settings", validate(updateNotificationSettingsSchema), putNotificationSettings);
router.post("/discord/test", testDiscord);
router.post("/discord/test-alert", sendTestAlert);

export default router;
