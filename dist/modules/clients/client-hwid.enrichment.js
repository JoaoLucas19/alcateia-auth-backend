"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchLatestHwidAttemptsByClientIds = fetchLatestHwidAttemptsByClientIds;
exports.buildHwidEnrichment = buildHwidEnrichment;
const client_1 = __importDefault(require("../../prisma/client"));
const hwid_1 = require("../../utils/hwid");
async function fetchLatestHwidAttemptsByClientIds(clientIds) {
    const map = new Map();
    if (clientIds.length === 0)
        return map;
    const logs = await client_1.default.clientAccessLog.findMany({
        where: {
            clientId: { in: clientIds },
            hwid: { not: null },
        },
        orderBy: { createdAt: "desc" },
        select: {
            clientId: true,
            hwid: true,
            success: true,
            reason: true,
        },
        take: Math.min(clientIds.length * 20, 500),
    });
    for (const log of logs) {
        if (!log.clientId)
            continue;
        const hwid = (0, hwid_1.normalizeHwid)(log.hwid);
        if (!hwid)
            continue;
        if (!map.has(log.clientId)) {
            map.set(log.clientId, {
                hwid,
                success: log.success,
                reason: log.reason,
            });
        }
    }
    return map;
}
function buildHwidEnrichment(storedHwid, lastAttempt) {
    const bound = (0, hwid_1.normalizeHwid)(storedHwid);
    const lastAttemptHwid = lastAttempt?.hwid ?? null;
    let hwidSignal = "normal";
    if (!bound) {
        hwidSignal = lastAttemptHwid ? "pending_bind" : "no_hwid";
    }
    else if (lastAttempt &&
        !lastAttempt.success &&
        lastAttempt.reason === "HWID_MISMATCH" &&
        lastAttemptHwid &&
        !(0, hwid_1.hwidsEqual)(bound, lastAttemptHwid)) {
        hwidSignal = "mismatch_recent";
    }
    const hwidDisplay = (0, hwid_1.formatHwidDisplay)(storedHwid);
    const lastAttemptHwidDisplay = lastAttemptHwid ? (0, hwid_1.formatHwidDisplay)(lastAttemptHwid) : null;
    return {
        lastAttemptHwid,
        lastAttemptHwidDisplay,
        hwidDisplay,
        hwidBound: bound !== null,
        hwidSignal,
    };
}
//# sourceMappingURL=client-hwid.enrichment.js.map