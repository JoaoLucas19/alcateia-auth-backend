import { logger } from "../../utils/logger";
import { logService } from "./log.service";

const CLEANUP_INTERVAL_MS = 60 * 60 * 1000; // 1 hora

let cleanupStarted = false;

export function startFailedLoginCleanup(): void {
  if (cleanupStarted) return;
  cleanupStarted = true;

  logger.info("Limpeza de logins falhos: agendada", {
    intervalMs: CLEANUP_INTERVAL_MS,
    retentionHours: 24,
  });

  setTimeout(() => {
    logService.cleanupOldFailedLogins().catch(() => undefined);
  }, 30_000);

  setInterval(() => {
    logService.cleanupOldFailedLogins().catch(() => undefined);
  }, CLEANUP_INTERVAL_MS);
}
