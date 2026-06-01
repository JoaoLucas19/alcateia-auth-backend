"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summary = summary;
exports.repairHwids = repairHwids;
exports.list = list;
exports.getByDiscord = getByDiscord;
exports.getByKey = getByKey;
exports.getByUsername = getByUsername;
exports.getOne = getOne;
exports.ban = ban;
exports.unban = unban;
exports.resetHwid = resetHwid;
exports.resetHwidLookup = resetHwidLookup;
exports.changePassword = changePassword;
exports.changePasswordLookup = changePasswordLookup;
exports.patchDiscord = patchDiscord;
exports.linkDiscordLookup = linkDiscordLookup;
exports.unlinkDiscord = unlinkDiscord;
exports.remove = remove;
const client_service_1 = require("./client.service");
async function summary(req, res, next) {
    try {
        const data = await (0, client_service_1.getClientsSummary)();
        res.status(200).json({ data });
    }
    catch (err) {
        next(err);
    }
}
async function repairHwids(req, res, next) {
    try {
        const result = await (0, client_service_1.repairInvalidClientHwids)();
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function list(req, res, next) {
    try {
        const page = Math.max(1, parseInt(req.query.page) || 1);
        const limit = Math.min(100, parseInt(req.query.limit) || 20);
        const search = req.query.search || undefined;
        const status = req.query.status || undefined;
        const discordId = req.query.discordId || undefined;
        const result = await (0, client_service_1.listClients)({ page, limit, search, status, discordId });
        res.status(200).json({ data: result });
    }
    catch (err) {
        next(err);
    }
}
async function getByDiscord(req, res, next) {
    try {
        const discordId = req.params["discordId"];
        const client = await (0, client_service_1.getClientByDiscordId)(discordId);
        res.status(200).json({ data: client });
    }
    catch (err) {
        next(err);
    }
}
async function getByKey(req, res, next) {
    try {
        const keyValue = decodeURIComponent(req.params["keyValue"]);
        const client = await (0, client_service_1.getClientByKeyValue)(keyValue);
        res.status(200).json({ data: client });
    }
    catch (err) {
        next(err);
    }
}
async function getByUsername(req, res, next) {
    try {
        const username = decodeURIComponent(req.params["username"]);
        const client = await (0, client_service_1.getClientByUsername)(username);
        res.status(200).json({ data: client });
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
async function resetHwidLookup(req, res, next) {
    try {
        const result = await (0, client_service_1.resetClientHwidByLookup)(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function changePassword(req, res, next) {
    try {
        const id = req.params["id"];
        const result = await (0, client_service_1.changeClientPassword)(id, req.body.password);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function changePasswordLookup(req, res, next) {
    try {
        const result = await (0, client_service_1.changeClientPasswordByLookup)(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function patchDiscord(req, res, next) {
    try {
        const id = req.params["id"];
        if (req.body.discordId === null) {
            const result = await (0, client_service_1.unlinkClientDiscord)(id);
            res.status(200).json(result);
            return;
        }
        const result = await (0, client_service_1.linkClientDiscord)(id, req.body.discordId);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function linkDiscordLookup(req, res, next) {
    try {
        const result = await (0, client_service_1.linkClientDiscordByLookup)(req.body);
        res.status(200).json(result);
    }
    catch (err) {
        next(err);
    }
}
async function unlinkDiscord(req, res, next) {
    try {
        const id = req.params["id"];
        const result = await (0, client_service_1.unlinkClientDiscord)(id);
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