"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupExpired = cleanupExpired;
exports.cleanupPermanent = cleanupPermanent;
exports.generate = generate;
exports.list = list;
exports.getById = getById;
exports.revoke = revoke;
exports.update = update;
exports.remove = remove;
const keyService = __importStar(require("./key.service"));
async function cleanupExpired(req, res, next) {
    try {
        const result = await keyService.runCleanupExpiredKeys();
        res.status(200).json({ data: result });
    }
    catch (err) {
        next(err);
    }
}
async function cleanupPermanent(req, res, next) {
    try {
        const onlyUnused = req.query.onlyUnused === "true";
        const result = await keyService.runCleanupPermanentKeys(onlyUnused);
        res.status(200).json({ data: result });
    }
    catch (err) {
        next(err);
    }
}
async function generate(req, res, next) {
    try {
        const result = await keyService.generateKeys({ ...req.body, createdById: req.admin.id });
        res.status(201).json({ data: result });
    }
    catch (err) {
        next(err);
    }
}
async function list(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const status = req.query.status;
        const productId = req.query.productId;
        const search = req.query.search;
        const result = await keyService.listKeys({ page, limit, status, productId, search });
        res.status(200).json({ data: result });
    }
    catch (err) {
        next(err);
    }
}
async function getById(req, res, next) {
    try {
        const key = await keyService.getKey(String(req.params.id));
        res.status(200).json({ data: key });
    }
    catch (err) {
        next(err);
    }
}
async function revoke(req, res, next) {
    try {
        const key = await keyService.revokeKey(String(req.params.id));
        res.status(200).json({ data: key });
    }
    catch (err) {
        next(err);
    }
}
async function update(req, res, next) {
    try {
        const key = await keyService.updateKey(String(req.params.id), req.body);
        res.status(200).json({ data: key });
    }
    catch (err) {
        next(err);
    }
}
async function remove(req, res, next) {
    try {
        await keyService.deleteKey(String(req.params.id));
        res.status(200).json({ message: "Key deletada com sucesso" });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=key.controller.js.map