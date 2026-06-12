"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startFailedLoginCleanup = startFailedLoginCleanup;
const logger_1 = require("../../utils/logger");
const log_service_1 = require("./log.service");
const ip_block_service_1 = require("../security/ip-block.service");
const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hora
let cleanupStarted = false;
function startFailedLoginCleanup() {
    if (cleanupStarted)
        return;
    cleanupStarted = true;
    logger_1.logger.info("Limpeza de logins falhos: agendada", {
        intervalMs: CLEANUP_INTERVAL_MS,
        retentionHours: 24,
    });
    setTimeout(() => {
        log_service_1.logService.cleanupOldFailedLogins().catch(() => undefined);
        (0, ip_block_service_1.cleanupExpiredIpBlocks)().catch(() => undefined);
    }, 30000);
    setInterval(() => {
        log_service_1.logService.cleanupOldFailedLogins().catch(() => undefined);
        (0, ip_block_service_1.cleanupExpiredIpBlocks)().catch(() => undefined);
    }, CLEANUP_INTERVAL_MS);
}
//# sourceMappingURL=failed-login-cleanup.js.map