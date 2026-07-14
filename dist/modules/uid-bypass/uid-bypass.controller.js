"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uidAdd = uidAdd;
exports.uidRemove = uidRemove;
exports.uidCheck = uidCheck;
const env_1 = require("../../config/env");
const AppError_1 = require("../../utils/AppError");
const uid_bypass_service_1 = require("./uid-bypass.service");
function assertApiKey(key) {
    if (!env_1.env.UID_BYPASS_API_KEY) {
        throw new AppError_1.AppError("UID bypass desativado no servidor", 503, "UID_BYPASS_DISABLED");
    }
    if (key !== env_1.env.UID_BYPASS_API_KEY) {
        throw new AppError_1.AppError("Chave invalida", 403, "INVALID_KEY");
    }
}
/** ToxicUidBypass.dll pode chamar /uid/check sem key. */
function assertApiKeyForCheck(key) {
    const k = String(key ?? "").trim();
    if (!k) {
        return;
    }
    assertApiKey(k);
}
function denyText(uid) {
    return ("ACCESS DENIED. Your UID " +
        uid +
        " is NOT whitelisted for UID Bypass. Please contact Owner for assistance.");
}
function sendError(res, err) {
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
        message: "Erro interno",
        code: "INTERNAL_ERROR",
    });
}
async function uidAdd(req, res) {
    try {
        assertApiKey(String(req.query.key ?? ""));
        const uid = String(req.query.uid ?? "");
        const validity = Number(req.query.validity ?? 30);
        const result = await (0, uid_bypass_service_1.addWhitelistedUid)(uid, Number.isFinite(validity) ? validity : 30);
        res.status(200).json({ success: true, message: "UID added", ...result });
    }
    catch (err) {
        sendError(res, err);
    }
}
async function uidRemove(req, res) {
    try {
        assertApiKey(String(req.query.key ?? ""));
        const uid = String(req.query.uid ?? "");
        const result = await (0, uid_bypass_service_1.removeWhitelistedUid)(uid);
        res.status(200).json({ success: true, message: "UID removed", ...result });
    }
    catch (err) {
        sendError(res, err);
    }
}
async function uidCheck(req, res) {
    try {
        assertApiKeyForCheck(String(req.query.key ?? ""));
        const uid = String(req.query.uid ?? "");
        const result = await (0, uid_bypass_service_1.checkWhitelistedUid)(uid);
        if (!result.whitelisted) {
            const plain = denyText(uid);
            const wantsPlain = !String(req.query.key ?? "").trim() ||
                String(req.headers.accept ?? "").includes("text/plain");
            if (wantsPlain) {
                res.status(403).type("text/plain; charset=utf-8").send(plain);
                return;
            }
            res.status(403).json({
                success: false,
                message: "NOT whitelisted",
                uid: result.uid,
                expiresAt: result.expiresAt,
                whitelisted: false,
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "OK",
            uid: result.uid,
            expiresAt: result.expiresAt,
            whitelisted: true,
        });
    }
    catch (err) {
        sendError(res, err);
    }
}
//# sourceMappingURL=uid-bypass.controller.js.map