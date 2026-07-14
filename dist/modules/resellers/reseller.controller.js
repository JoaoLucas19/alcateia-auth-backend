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
exports.overview = overview;
exports.list = list;
exports.getById = getById;
exports.create = create;
exports.update = update;
exports.ban = ban;
exports.unban = unban;
exports.pause = pause;
exports.unpause = unpause;
exports.listKeys = listKeys;
exports.bulkKeys = bulkKeys;
exports.history = history;
const resellerService = __importStar(require("./reseller.service"));
function actorOf(req) {
    return req.admin?.username ?? "admin";
}
async function overview(_req, res, next) {
    try {
        const data = await resellerService.getOverview();
        res.status(200).json({
            success: true,
            data,
            // atalhos para o frontend (evita tabela vazia se o parser errar nested)
            metrics: data.metrics,
            ranking: data.ranking,
            stores: data.stores,
        });
    }
    catch (err) {
        next(err);
    }
}
async function list(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 20, 100);
        const rawStatus = typeof req.query.status === "string" ? req.query.status.trim().toLowerCase() : "all";
        const status = (["all", "active", "paused", "banned"].includes(rawStatus)
            ? rawStatus
            : "all");
        const search = typeof req.query.search === "string" ? req.query.search.trim() : undefined;
        const result = await resellerService.listResellers({ page, limit, status, search });
        // data = array de lojas (compatível com o painel)
        // também envia stores/items para parsers alternativos
        res.status(200).json({
            success: true,
            data: result.data,
            stores: result.data,
            items: result.data,
            total: result.total,
            page: result.page,
            totalPages: result.totalPages,
        });
    }
    catch (err) {
        next(err);
    }
}
async function getById(req, res, next) {
    try {
        const data = await resellerService.getReseller(String(req.params.id));
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        next(err);
    }
}
async function create(req, res, next) {
    try {
        const data = await resellerService.createReseller(req.body, actorOf(req));
        res.status(201).json({ success: true, data, message: "Loja criada com sucesso" });
    }
    catch (err) {
        next(err);
    }
}
async function update(req, res, next) {
    try {
        const body = { ...req.body };
        if (typeof body.status === "string") {
            body.status = body.status.toUpperCase();
        }
        const data = await resellerService.updateReseller(String(req.params.id), body, actorOf(req));
        res.status(200).json({ success: true, data, message: "Loja atualizada com sucesso" });
    }
    catch (err) {
        next(err);
    }
}
async function ban(req, res, next) {
    try {
        const data = await resellerService.banReseller(String(req.params.id), actorOf(req));
        res.status(200).json({ success: true, data, message: "Loja banida com sucesso" });
    }
    catch (err) {
        next(err);
    }
}
async function unban(req, res, next) {
    try {
        const data = await resellerService.unbanReseller(String(req.params.id), actorOf(req));
        res.status(200).json({ success: true, data, message: "Loja reativada com sucesso" });
    }
    catch (err) {
        next(err);
    }
}
async function pause(req, res, next) {
    try {
        const data = await resellerService.pauseReseller(String(req.params.id), actorOf(req));
        res.status(200).json({ success: true, data, message: "Loja pausada com sucesso" });
    }
    catch (err) {
        next(err);
    }
}
async function unpause(req, res, next) {
    try {
        const data = await resellerService.unpauseReseller(String(req.params.id), actorOf(req));
        res.status(200).json({ success: true, data, message: "Loja despausada com sucesso" });
    }
    catch (err) {
        next(err);
    }
}
async function listKeys(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 50, 100);
        const data = await resellerService.listResellerKeys(String(req.params.id), page, limit);
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        next(err);
    }
}
async function bulkKeys(req, res, next) {
    try {
        const { action, keyIds } = req.body;
        const data = await resellerService.bulkUpdateResellerKeys(String(req.params.id), action, keyIds, actorOf(req));
        res.status(200).json({ success: true, data, message: "Ação em massa concluída" });
    }
    catch (err) {
        next(err);
    }
}
async function history(req, res, next) {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Math.min(Number(req.query.limit) || 50, 100);
        const data = await resellerService.listResellerHistory(String(req.params.id), page, limit);
        res.status(200).json({ success: true, data });
    }
    catch (err) {
        next(err);
    }
}
//# sourceMappingURL=reseller.controller.js.map