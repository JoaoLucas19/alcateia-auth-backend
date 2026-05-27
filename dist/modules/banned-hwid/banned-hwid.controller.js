"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.create = create;
exports.removeById = removeById;
exports.removeByHwid = removeByHwid;
const banned_hwid_service_1 = require("./banned-hwid.service");
async function list(req, res, next) {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, parseInt(req.query.limit) || 20);
        const search = req.query.search || undefined;
        const result = await (0, banned_hwid_service_1.listBannedHwids)({ page, limit, search });
        res.status(200).json({ data: result });
    }
    catch (err) {
        next(err);
    }
}
async function create(req, res, next) {
    try {
        const result = await (0, banned_hwid_service_1.banHwid)(req.body.hwid, req.body.reason);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function removeById(req, res, next) {
    try {
        const id = req.params["id"];
        const result = await (0, banned_hwid_service_1.unbanHwidById)(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function removeByHwid(req, res, next) {
    try {
        const result = await (0, banned_hwid_service_1.unbanHwidByValue)(req.body.hwid);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=banned-hwid.controller.js.map