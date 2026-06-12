"use strict";
// Essa função foi modificada
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = login;
exports.logout = logout;
exports.me = me;
const auth_service_1 = require("./auth.service");
const logger_1 = require("../../utils/logger");
const client_ip_1 = require("../../utils/client-ip");
const security_middleware_1 = require("../../middlewares/security.middleware");
async function login(req, res, next) {
    try {
        const ip = (0, client_ip_1.getClientIp)(req);
        const result = await (0, auth_service_1.loginService)({ ...req.body, ip });
        res.status(200).json({
            success: true,
            data: result,
            token: result.token,
            admin: result.admin,
            expiresIn: result.expiresIn,
        });
    }
    catch (err) {
        await (0, security_middleware_1.applyAuthFailureDelay)();
        next(err);
    }
}
async function logout(req, res) {
    logger_1.logger.info("Logout", { adminId: req.admin?.id });
    res.status(200).json({ success: true, message: "Logout realizado com sucesso" });
}
async function me(req, res) {
    res.status(200).json({
        success: true,
        authenticated: true,
        data: { admin: req.admin },
        admin: req.admin,
    });
}
//# sourceMappingURL=auth.controller.js.map