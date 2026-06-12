import prisma from "../../prisma/client";
import { AppError } from "../../utils/AppError";

function computeExpiry(validityDays: number): Date {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + Math.max(1, validityDays));
  return expiry;
}

function isEntryValid(entry: {
  isActive: boolean;
  expiresAt: Date | null;
}): boolean {
  if (!entry.isActive) return false;
  if (entry.expiresAt && entry.expiresAt < new Date()) return false;
  return true;
}

export async function addWhitelistedUid(uid: string, validityDays: number, note?: string) {
  const cleanUid = uid.trim();
  if (!/^\d{8,15}$/.test(cleanUid)) {
    throw new AppError("UID invalido", 400, "INVALID_UID");
  }

  const expiresAt = computeExpiry(validityDays);

  const row = await prisma.whitelistedUid.upsert({
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

export async function removeWhitelistedUid(uid: string) {
  const cleanUid = uid.trim();
  const row = await prisma.whitelistedUid.findUnique({ where: { uid: cleanUid } });
  if (!row) {
    throw new AppError("UID nao encontrado", 404, "UID_NOT_FOUND");
  }

  await prisma.whitelistedUid.update({
    where: { uid: cleanUid },
    data: { isActive: false },
  });

  return { uid: cleanUid };
}

export async function checkWhitelistedUid(uid: string) {
  const cleanUid = uid.trim();
  const row = await prisma.whitelistedUid.findUnique({ where: { uid: cleanUid } });
  const whitelisted = row ? isEntryValid(row) : false;

  return {
    uid: cleanUid,
    whitelisted,
    expiresAt: row?.expiresAt?.toISOString() ?? null,
  };
}
