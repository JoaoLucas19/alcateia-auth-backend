"use strict";
// Essa função foi modificada
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.logout = logout;
exports.me = me;
const auth_service_1 = require("./auth.service");
const logger_1 = require("../../utils/logger");
async function login(req, res, next) {
    try {
        const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.ip ||
            "unknown";
        const result = await (0, auth_service_1.loginService)({ ...req.body, ip });
        res.status(200).json({ data: result });
    }
    catch (err) {
        next(err);
    }
}
async function logout(req, res) {
    logger_1.logger.info("Logout", { adminId: req.admin?.id });
    res.status(200).json({ message: "Logout realizado com sucesso" });
}
// NOVO: valida o token e retorna os dados do admin autenticado
async function me(req, res) {
    res.status(200).json({ data: { admin: req.admin } });
}
//# sourceMappingURL=auth.controller.js.map