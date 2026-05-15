"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Essa função foi modificada
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const zod_1 = require("zod");
const auth_controller_1 = require("./auth.controller");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5,
    message: { code: "RATE_LIMIT", message: "Muitas tentativas. Tente novamente em 15 minutos." },
});
const loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Username obrigatório"),
    password: zod_1.z.string().min(1, "Senha obrigatória"),
});
const router = (0, express_1.Router)();
router.post("/login", loginLimiter, (0, validate_middleware_1.validate)(loginSchema), auth_controller_1.login);
router.post("/logout", auth_middleware_1.authMiddleware, auth_controller_1.logout);
router.get("/me", auth_middleware_1.authMiddleware, auth_controller_1.me); // NOVO: valida token e retorna admin
exports.default = router;
//# sourceMappingURL=auth.routes.js.map