"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientRegister = clientRegister;
exports.clientLogin = clientLogin;
const AppError_1 = require("../../utils/AppError");
const hwid_1 = require("../../utils/hwid");
const client_auth_service_1 = require("./client-auth.service");
function clientError(res, err) {
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            code: err.code,
        });
        return;
    }
    res.status(500).json({
        success: false,
        message: "Erro interno do servidor",
        code: "INTERNAL_ERROR",
    });
}
async function clientRegister(req, res, _next) {
    try {
        const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.ip ||
            "unknown";
        const result = await (0, client_auth_service_1.registerClientService)({
            username: req.body.username,
            password: req.body.password,
            license: req.body.license,
            hwid: (0, hwid_1.extractHwidFromBody)(req.body),
            ipAddress,
        });
        res.status(201).json({
            success: true,
            message: result.message,
            user: result.user,
        });
    }
    catch (err) {
        clientError(res, err);
    }
}
async function clientLogin(req, res, _next) {
    try {
        const ipAddress = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
            req.ip ||
            "unknown";
        const result = await (0, client_auth_service_1.loginClientService)({
            username: req.body.username,
            password: req.body.password,
            hwid: (0, hwid_1.extractHwidFromBody)(req.body),
            ipAddress,
        });
        res.status(200).json({
            success: true,
            message: result.message,
            user: result.user,
        });
    }
    catch (err) {
        clientError(res, err);
    }
}
//# sourceMappingURL=client-auth.controller.js.map