export type HwidEnrichment = {
    lastAttemptHwid: string | null;
    lastAttemptHwidDisplay: string | null;
    hwidDisplay: string | null;
    hwidBound: boolean;
    hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
};
export declare function fetchLatestHwidAttemptsByClientIds(clientIds: string[]): Promise<Map<string, {
    hwid: string;
    success: boolean;
    reason: string | null;
}>>;
export declare function buildHwidEnrichment(storedHwid: string | null | undefined, lastAttempt?: {
    hwid: string;
    success: boolean;
    reason: string | null;
} | null): HwidEnrichment;
