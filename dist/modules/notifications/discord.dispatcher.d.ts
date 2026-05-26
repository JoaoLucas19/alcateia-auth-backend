import type { SecurityAlert, ThreatLevel } from "../logs/log.types";
/**
 * Dispara alertas para o Discord com anti-spam (cooldown por fingerprint).
 */
export declare function dispatchSecurityAlerts(alerts: SecurityAlert[], context?: {
    threatLevel?: ThreatLevel;
    threatScore?: number;
}): Promise<{
    sent: number;
    skipped: number;
}>;
/** Evento imediato (ex.: HWID mismatch) — cooldown mais curto por tipo */
export declare function dispatchImmediateAlert(alert: SecurityAlert, cooldownMs?: number): Promise<boolean>;
