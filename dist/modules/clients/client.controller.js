"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = list;
exports.getOne = getOne;
exports.ban = ban;
exports.unban = unban;
exports.resetHwid = resetHwid;
exports.remove = remove;
const client_service_1 = require("./client.service");
async function list(req, res, next) {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, parseInt(req.query.limit) || 20);
        const search = req.query.search || undefined;
        const status = req.query.status || undefined;
        const result = await (0, client_service_1.listClients)({ page, limit, search, status });
        res.status(200).json({ data: result });
    }
    catch (err) {
        next(err);
    }
}
async function getOne(req, res, next) {
    try {
        const id = req.params["id"];
        const client = await (0, client_service_1.getClient)(id);
        res.status(200).json({ data: client });
    }
    catch (err) {
        next(err);
    }
}
async function ban(req, res, next) {
    try {
        const id = req.params["id"];
        const result = await (0, client_service_1.banClient)(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function unban(req, res, next) {
    try {
        const id = req.params["id"];
        const result = await (0, client_service_1.unbanClient)(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function resetHwid(req, res, next) {
    try {
        const id = req.params["id"];
        const result = await (0, client_service_1.resetClientHwid)(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function remove(req, res, next) {
    try {
        const id = req.params["id"];
        const result = await (0, client_service_1.deleteClient)(id);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=client.controller.js.map