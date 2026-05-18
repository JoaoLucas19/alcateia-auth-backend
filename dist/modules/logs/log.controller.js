"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessLogs = getAccessLogs;
exports.getKeyLogs = getKeyLogs;
exports.getDashboard = getDashboard;
const log_repository_1 = require("./log.repository");
async function getAccessLogs(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const success = req.query.success !== undefined
            ? req.query.success === "true"
            : undefined;
        const result = await log_repository_1.logRepository.findAccessLogs({ page, limit, success });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function getKeyLogs(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const result_filter = req.query.result;
        const result = await log_repository_1.logRepository.findKeyLogs({ page, limit, result: result_filter });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function getDashboard(req, res, next) {
    try {
        const stats = await log_repository_1.logRepository.getDashboardStats();
        res.status(200).json({ data: stats });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=log.controller.js.map