"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const notification_controller_1 = require("./notification.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.post("/discord/test", notification_controller_1.testDiscord);
router.post("/discord/test-alert", notification_controller_1.sendTestAlert);
exports.default = router;
//# sourceMappingURL=notification.routes.js.map