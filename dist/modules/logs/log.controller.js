"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessLogs = getAccessLogs;
exports.getKeyLogs = getKeyLogs;
exports.getDashboard = getDashboard;
exports.getSecurity = getSecurity;
exports.getFailedLogins = getFailedLogins;
const log_repository_1 = require("./log.repository");
const log_service_1 = require("./log.service");
async function getAccessLogs(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const success = req.query.success !== undefined ? req.query.success === "true" : undefined;
        const ip = req.query.ip;
        const reason = req.query.reason;
        const hours = req.query.hours ? Number(req.query.hours) : undefined;
        const since = hours ? new Date(Date.now() - hours * 60 * 60 * 1000) : undefined;
        const result = await log_repository_1.logRepository.findAccessLogs({
            page,
            limit,
            success,
            ip,
            reason,
            since,
        });
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
        const stats = await log_service_1.logService.getDashboard();
        res.status(200).json({ data: stats });
    }
    catch (err) {
        next(err);
    }
}
async function getSecurity(req, res, next) {
    try {
        const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 90);
        const data = await log_service_1.logService.getSecurity(days);
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
async function getFailedLogins(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 25, 100);
        const source = req.query.source ?? "all";
        const ip = req.query.ip;
        const hours = req.query.hours ? Number(req.query.hours) : undefined;
        const result = await log_service_1.logService.getFailedLogins({ page, limit, source, ip, hours });
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=log.controller.js.map