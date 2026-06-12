"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Essa função foi modificada
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const rate_limit_1 = require("../../config/rate-limit");
const auth_schemas_1 = require("../../utils/auth-schemas");
const security_middleware_1 = require("../../middlewares/security.middleware");
const loginLimiter = (0, rate_limit_1.createAdminLoginLimiter)();
const router = (0, express_1.Router)();
router.post("/login", security_middleware_1.ipBlockMiddleware, loginLimiter, security_middleware_1.requireJsonContentType, security_middleware_1.rejectSuspiciousUserAgent, security_middleware_1.rejectSuspiciousInput, (0, validate_middleware_1.validate)(auth_schemas_1.adminLoginSchema), auth_controller_1.login);
router.post("/logout", auth_middleware_1.authMiddleware, auth_controller_1.logout);
router.get("/me", auth_middleware_1.authMiddleware, auth_controller_1.me);
exports.default = router;
//# sourceMappingURL=auth.routes.js.map