"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const zod_1 = require("zod");
const client_auth_controller_1 = require("./client-auth.controller");
function validateClient(schema) {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            const message = result.error.issues[0]?.message ?? "Dados invalidos";
            res.status(400).json({ success: false, message });
            return;
        }
        req.body = result.data;
        next();
    };
}
/** Rotas públicas para o menu interno (cheat) — formato compatível com NeverApi C++ */
const clientRegisterSchema = zod_1.z.object({
    username: zod_1.z.string().min(3, "Usuario deve ter no minimo 3 caracteres").max(32),
    password: zod_1.z.string().min(4, "Senha deve ter no minimo 4 caracteres").max(128),
    license: zod_1.z.string().min(1, "Key obrigatoria"),
    hwid: zod_1.z.string().optional(),
    ipAddress: zod_1.z.string().optional(),
});
const clientLoginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, "Usuario obrigatorio"),
    password: zod_1.z.string().min(1, "Senha obrigatoria"),
    hwid: zod_1.z.string().optional(),
    ipAddress: zod_1.z.string().optional(),
});
const clientAuthLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: {
        success: false,
        message: "Muitas tentativas. Aguarde 15 minutos.",
        code: "RATE_LIMIT",
    },
});
const router = (0, express_1.Router)();
router.post("/register", clientAuthLimiter, validateClient(clientRegisterSchema), client_auth_controller_1.clientRegister);
router.post("/login", clientAuthLimiter, validateClient(clientLoginSchema), client_auth_controller_1.clientLogin);
exports.default = router;
//# sourceMappingURL=client-auth.routes.js.map