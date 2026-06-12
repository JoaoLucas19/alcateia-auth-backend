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
const auth_notifications_1 = require("./auth-notifications");
const log_alerts_service_1 = require("../logs/log-alerts.service");
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
            notification: (0, auth_notifications_1.buildLoginNotification)(result.admin.username),
        });
    }
    catch (err) {
        await (0, security_middleware_1.applyAuthFailureDelay)();
        next(err);
    }
}
async function logout(req, res) {
    const ip = (0, client_ip_1.getClientIp)(req);
    const admin = req.admin;
    const username = admin?.username ?? "Admin";
    if (admin) {
        await (0, auth_service_1.logoutService)({ adminId: admin.id, username: admin.username, ip });
        void (0, log_alerts_service_1.notifyAdminLogout)({ username: admin.username, ip });
    }
    logger_1.logger.info("Logout", { adminId: admin?.id, ip });
    res.status(200).json({
        success: true,
        message: "Logout realizado com sucesso",
        notification: (0, auth_notifications_1.buildLogoutNotification)(username),
    });
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