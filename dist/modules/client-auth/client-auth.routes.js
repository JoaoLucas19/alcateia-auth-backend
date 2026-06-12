"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_auth_controller_1 = require("./client-auth.controller");
const rate_limit_1 = require("../../config/rate-limit");
const auth_schemas_1 = require("../../utils/auth-schemas");
const security_middleware_1 = require("../../middlewares/security.middleware");
function validateClient(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const message = result.error.issues[0]?.message ?? "Dados invalidos";
            res.status(400).json({ success: false, message, code: "VALIDATION_ERROR" });
            return;
        }
        req.body = result.data;
        next();
    };
}
const clientAuthLimiter = (0, rate_limit_1.createClientAuthLimiter)();
const router = (0, express_1.Router)();
router.post("/register", security_middleware_1.ipBlockMiddleware, clientAuthLimiter, security_middleware_1.requireJsonContentType, security_middleware_1.rejectSuspiciousInput, validateClient(auth_schemas_1.clientRegisterSchema), client_auth_controller_1.clientRegister);
router.post("/login", security_middleware_1.ipBlockMiddleware, clientAuthLimiter, security_middleware_1.requireJsonContentType, security_middleware_1.rejectSuspiciousInput, validateClient(auth_schemas_1.clientLoginSchema), client_auth_controller_1.clientLogin);
exports.default = router;
//# sourceMappingURL=client-auth.routes.js.map