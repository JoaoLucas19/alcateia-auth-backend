"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWhitelistedUid = addWhitelistedUid;
exports.removeWhitelistedUid = removeWhitelistedUid;
exports.checkWhitelistedUid = checkWhitelistedUid;
const client_1 = __importDefault(require("../../prisma/client"));
const AppError_1 = require("../../utils/AppError");
function computeExpiry(validityDays) {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + Math.max(1, validityDays));
    return expiry;
}
function isEntryValid(entry) {
    if (!entry.isActive)
        return false;
    if (entry.expiresAt && entry.expiresAt < new Date())
        return false;
    return true;
}
async function addWhitelistedUid(uid, validityDays, note) {
    const cleanUid = uid.trim();
    if (!/^\d{8,15}$/.test(cleanUid)) {
        throw new AppError_1.AppError("UID invalido", 400, "INVALID_UID");
    }
    const expiresAt = computeExpiry(validityDays);
    const row = await client_1.default.whitelistedUid.upsert({
        where: { uid: cleanUid },
        create: {
            uid: cleanUid,
            validityDays,
            expiresAt,
            isActive: true,
            note: note ?? null,
        },
        update: {
            validityDays,
            expiresAt,
            isActive: true,
            note: note ?? null,
        },
    });
    return {
        uid: row.uid,
        expiresAt: row.expiresAt?.toISOString() ?? null,
        validityDays: row.validityDays,
    };
}
async function removeWhitelistedUid(uid) {
    const cleanUid = uid.trim();
    const row = await client_1.default.whitelistedUid.findUnique({ where: { uid: cleanUid } });
    if (!row) {
        throw new AppError_1.AppError("UID nao encontrado", 404, "UID_NOT_FOUND");
    }
    await client_1.default.whitelistedUid.update({
        where: { uid: cleanUid },
        data: { isActive: false },
    });
    return { uid: cleanUid };
}
async function checkWhitelistedUid(uid) {
    const cleanUid = uid.trim();
    const row = await client_1.default.whitelistedUid.findUnique({ where: { uid: cleanUid } });
    const whitelisted = row ? isEntryValid(row) : false;
    return {
        uid: cleanUid,
        whitelisted,
        expiresAt: row?.expiresAt?.toISOString() ?? null,
    };
}
//# sourceMappingURL=uid-bypass.service.js.map