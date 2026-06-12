"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAccessLogs = getAccessLogs;
exports.getKeyLogs = getKeyLogs;
exports.getDashboard = getDashboard;
exports.getSecurity = getSecurity;
exports.getFailedLogins = getFailedLogins;
exports.getLogOverview = getLogOverview;
exports.getLogFeed = getLogFeed;
exports.investigateIp = investigateIp;
exports.getClientAudit = getClientAudit;
exports.getClientAccessLogs = getClientAccessLogs;
exports.exportLogsJson = exportLogsJson;
const log_repository_1 = require("./log.repository");
const log_service_1 = require("./log.service");
const log_formatters_1 = require("./log.formatters");
function parseHours(value, fallback = 24) {
    const n = Number(value);
    if (!Number.isFinite(n) || n <= 0)
        return fallback;
    return Math.min(n, 24 * 90);
}
async function getAccessLogs(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const success = req.query.success !== undefined ? req.query.success === "true" : undefined;
        const ip = req.query.ip;
        const reason = req.query.reason;
        const hours = req.query.hours ? parseHours(req.query.hours) : undefined;
        const since = hours ? new Date(Date.now() - hours * 60 * 60 * 1000) : undefined;
        const result = await log_repository_1.logRepository.findAccessLogs({
            page,
            limit,
            success,
            ip,
            reason,
            since,
        });
        res.status(200).json({
            ...result,
            data: result.data.map((row) => ({
                ...(0, log_formatters_1.buildAdminAccessEntry)(row),
                raw: row,
            })),
        });
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
        const ip = req.query.ip;
        const hours = req.query.hours ? parseHours(req.query.hours) : undefined;
        const since = hours ? new Date(Date.now() - hours * 60 * 60 * 1000) : undefined;
        const result = await log_repository_1.logRepository.findKeyLogs({ page, limit, result: result_filter });
        const filtered = since
            ? result.data.filter((row) => row.attemptedAt >= since && (!ip || row.ipAddress.includes(ip)))
            : ip
                ? result.data.filter((row) => row.ipAddress.includes(ip))
                : result.data;
        res.status(200).json({
            ...result,
            data: filtered.map((row) => ({
                ...(0, log_formatters_1.buildKeyUsageEntry)(row),
                raw: row,
            })),
        });
    }
    catch (err) {
        next(err);
    }
}
async function getDashboard(req, res, next) {
    try {
        const stats = await log_service_1.logService.getDashboard();
        res.status(200).json({ success: true, data: stats });
    }
    catch (err) {
        next(err);
    }
}
async function getSecurity(req, res, next) {
    try {
        const days = Math.min(Math.max(Number(req.query.days) || 7, 1), 90);
        const data = await log_service_1.logService.getSecurity(days);
        res.status(200).json({ success: true, data });
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
        const hours = req.query.hours !== undefined ? parseHours(req.query.hours) : 24;
        const search = req.query.search;
        const result = await log_service_1.logService.getFailedLogins({ page, limit, source, ip, hours });
        const data = search?.trim()
            ? result.data.filter((row) => {
                const q = search.trim().toLowerCase();
                return [row.username, row.ip, row.reason, row.reasonLabel, row.event, row.detail]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase()
                    .includes(q);
            })
            : result.data;
        res.status(200).json({ success: true, ...result, data });
    }
    catch (err) {
        next(err);
    }
}
async function getLogOverview(req, res, next) {
    try {
        const hours = parseHours(req.query.hours, 24);
        const data = await log_service_1.logService.getLogOverview(hours);
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        next(err);
    }
}
async function getLogFeed(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 25, 100);
        const hours = parseHours(req.query.hours, 24);
        const category = req.query.category ?? "all";
        const status = req.query.status ?? "all";
        const ip = req.query.ip;
        const username = req.query.username;
        const search = req.query.search;
        const result = await log_service_1.logService.getLogFeed({
            page,
            limit,
            hours,
            category,
            status,
            ip,
            username,
            search,
        });
        res.status(200).json({ success: true, ...result });
    }
    catch (err) {
        next(err);
    }
}
async function investigateIp(req, res, next) {
    try {
        const ip = req.query.ip?.trim();
        if (!ip) {
            res.status(400).json({ success: false, code: "VALIDATION_ERROR", message: "Parâmetro ip obrigatório" });
            return;
        }
        const hours = parseHours(req.query.hours, 168);
        const data = await log_service_1.logService.investigateIpAddress(ip, hours);
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        next(err);
    }
}
async function getClientAudit(req, res, next) {
    try {
        const usernameParam = req.params.username;
        const username = (Array.isArray(usernameParam) ? usernameParam[0] : usernameParam)?.trim();
        if (!username) {
            res.status(400).json({ success: false, code: "VALIDATION_ERROR", message: "Username obrigatório" });
            return;
        }
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 25, 100);
        const hours = req.query.hours ? parseHours(req.query.hours) : undefined;
        const data = await log_service_1.logService.getClientAudit(username, { page, limit, hours });
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        next(err);
    }
}
async function getClientAccessLogs(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 25, 100);
        const hours = req.query.hours ? parseHours(req.query.hours) : undefined;
        const success = req.query.success !== undefined ? req.query.success === "true" : undefined;
        const ip = req.query.ip;
        const username = req.query.username;
        const action = req.query.action;
        const result = await log_service_1.logService.getClientAccessLogs({
            page,
            limit,
            hours,
            success,
            ip,
            username,
            action,
        });
        res.status(200).json({ success: true, ...result });
    }
    catch (err) {
        next(err);
    }
}
async function exportLogsJson(req, res, next) {
    try {
        const hours = parseHours(req.query.hours, 24);
        const category = req.query.category ?? "all";
        const status = req.query.status ?? "all";
        const result = await log_service_1.logService.getLogFeed({
            page: 1,
            limit: 500,
            hours,
            category,
            status,
            ip: req.query.ip,
            username: req.query.username,
            search: req.query.search,
        });
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Disposition", `attachment; filename="alcateia-logs-${Date.now()}.json"`);
        res.status(200).json({
            exportedAt: new Date().toISOString(),
            filters: result.filters,
            total: result.total,
            data: result.data,
        });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=log.controller.js.map