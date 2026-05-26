"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const notification_settings_schemas_1 = require("./notification-settings.schemas");
const notification_controller_1 = require("./notification.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get("/settings", notification_controller_1.getNotificationSettings);
router.put("/settings", (0, validate_middleware_1.validate)(notification_settings_schemas_1.updateNotificationSettingsSchema), notification_controller_1.putNotificationSettings);
router.post("/discord/test", notification_controller_1.testDiscord);
router.post("/discord/test-alert", notification_controller_1.sendTestAlert);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map