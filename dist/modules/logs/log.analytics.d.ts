import type { SecurityAlert, SuspiciousIpEntry, ThreatLevel, TimelineHourBucket } from "./log.types";
export declare function buildTimeline24h(adminLogs: {
    createdAt: Date;
    success: boolean;
}[], clientLogs: {
    createdAt: Date;
    success: boolean;
}[], keyLogs: {
    attemptedAt: Date;
    result: string;
}[]): TimelineHourBucket[];
export declare function aggregateSuspiciousIps(input: {
    adminFailures: {
        ipAddress: string;
        createdAt: Date;
    }[];
    clientFailures: {
        ipAddress: string;
        createdAt: Date;
    }[];
    invalidKeyByIp: {
        ipAddress: string;
        _count: number;
    }[];
}): SuspiciousIpEntry[];
export declare function detectSecurityAlerts(input: {
    adminFailed24h: number;
    adminTotal24h: number;
    adminFailuresByIp: {
        ipAddress: string;
        _count: number;
    }[];
    adminFailuresByUsername: {
        usernameAttempted: string;
        _count: number;
    }[];
    invalidKeyByIp: {
        ipAddress: string;
        _count: number;
    }[];
    adminFailuresLastHour: number;
}): SecurityAlert[];
export declare function computeThreatLevel(alerts: SecurityAlert[], suspiciousIps: SuspiciousIpEntry[]): {
    level: ThreatLevel;
    score: number;
};
export declare function reasonLabel(reason: string | null | undefined): string;
