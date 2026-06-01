import prisma from "../../prisma/client";
import { maskHwid, normalizeHwid } from "../../utils/hwid";

export type HwidEnrichment = {
  lastAttemptHwid: string | null;
  hwidDisplay: string | null;
  hwidBound: boolean;
  hwidSignal: "normal" | "no_hwid" | "pending_bind" | "mismatch_recent";
};

export async function fetchLatestHwidAttemptsByClientIds(
  clientIds: string[]
): Promise<Map<string, { hwid: string; success: boolean; reason: string | null }>> {
  const map = new Map<string, { hwid: string; success: boolean; reason: string | null }>();
  if (clientIds.length === 0) return map;

  const logs = await prisma.clientAccessLog.findMany({
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
    if (!log.clientId) continue;
    const hwid = normalizeHwid(log.hwid);
    if (!hwid) continue;
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

export function buildHwidEnrichment(
  storedHwid: string | null | undefined,
  lastAttempt?: { hwid: string; success: boolean; reason: string | null } | null
): HwidEnrichment {
  const bound = normalizeHwid(storedHwid);
  const lastAttemptHwid = lastAttempt?.hwid ?? null;

  let hwidSignal: HwidEnrichment["hwidSignal"] = "normal";
  if (!bound) {
    hwidSignal = lastAttemptHwid ? "pending_bind" : "no_hwid";
  } else if (
    lastAttempt &&
    !lastAttempt.success &&
    lastAttempt.reason === "HWID_MISMATCH" &&
    lastAttemptHwid &&
    !hwidsEqualQuiet(bound, lastAttemptHwid)
  ) {
    hwidSignal = "mismatch_recent";
  }

  const displaySource = bound ?? lastAttemptHwid;
  const hwidDisplay = displaySource ? maskHwid(displaySource) : null;

  return {
    lastAttemptHwid,
    hwidDisplay,
    hwidBound: bound !== null,
    hwidSignal,
  };
}

function hwidsEqualQuiet(a: string, b: string): boolean {
  return a.toLowerCase() === b.toLowerCase();
}
