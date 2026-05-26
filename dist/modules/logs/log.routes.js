"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const log_controller_1 = require("./log.controller");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get("/dashboard", log_controller_1.getDashboard);
router.get("/security", log_controller_1.getSecurity);
router.get("/failed-logins", log_controller_1.getFailedLogins);
router.get("/access", log_controller_1.getAccessLogs);
router.get("/keys", log_controller_1.getKeyLogs);
exports.default = router;
//# sourceMappingURL=log.routes.js.map