"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../utils/AppError");
const logger_1 = require("../utils/logger");
const env_1 = require("../config/env");
function errorHandler(err, _req, res, _next) {
    if (err instanceof AppError_1.AppError) {
        res.status(err.statusCode).json({
            success: false,
            code: err.code,
            message: err.message,
        });
        return;
    }
    // Erros inesperados: loga stack e nunca expõe detalhes em produção
    logger_1.logger.error(err.message, { stack: err.stack });
    res.status(500).json({
        code: "INTERNAL_ERROR",
        message: env_1.env.NODE_ENV === "production" ? "Erro interno" : err.message,
    });
}
//# sourceMappingURL=error.middleware.js.map