"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHwidBanned = isHwidBanned;
exports.listBannedHwids = listBannedHwids;
exports.banHwid = banHwid;
exports.unbanHwidById = unbanHwidById;
exports.unbanHwidByValue = unbanHwidByValue;
const banned_hwid_repository_1 = require("./banned-hwid.repository");
const AppError_1 = require("../../utils/AppError");
async function isHwidBanned(hwid) {
    if (!hwid?.trim())
        return false;
    const row = await banned_hwid_repository_1.bannedHwidRepository.findByHwid(hwid);
    return Boolean(row);
}
async function listBannedHwids(filters) {
    return banned_hwid_repository_1.bannedHwidRepository.findPaginated(filters);
}
async function banHwid(hwid, reason) {
    const normalized = hwid.trim();
    if (!normalized) {
        throw new AppError_1.AppError("HWID obrigatório", 400, "VALIDATION_ERROR");
    }
    const existing = await banned_hwid_repository_1.bannedHwidRepository.findByHwid(normalized);
    if (existing) {
        throw new AppError_1.AppError("HWID já está banido", 409, "HWID_ALREADY_BANNED");
    }
    const row = await banned_hwid_repository_1.bannedHwidRepository.create(normalized, reason);
    return { message: "HWID banido com sucesso", data: row };
}
async function unbanHwidById(id) {
    try {
        await banned_hwid_repository_1.bannedHwidRepository.deleteById(id);
        return { message: "HWID removido da lista de banidos" };
    }
    catch {
        throw new AppError_1.AppError("Registro não encontrado", 404, "BANNED_HWID_NOT_FOUND");
    }
}
async function unbanHwidByValue(hwid) {
    try {
        await banned_hwid_repository_1.bannedHwidRepository.deleteByHwid(hwid);
        return { message: "HWID removido da lista de banidos" };
    }
    catch {
        throw new AppError_1.AppError("HWID não encontrado na lista", 404, "BANNED_HWID_NOT_FOUND");
    }
}
//# sourceMappingURL=banned-hwid.service.js.map