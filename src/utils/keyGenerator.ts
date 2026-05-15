import crypto from "crypto";

// Charset sem 0/O/1/I para evitar confusão visual
const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function generateKey(): string {
  const randomSegment = (length: number) =>
    Array.from(crypto.randomBytes(length))
      .map((b) => CHARSET[b % CHARSET.length])
      .join("");

  return `ALCATEIA-${randomSegment(4)}-${randomSegment(4)}`;
}

export async function generateUniqueKeys(
  quantity: number,
  existingChecker: (key: string) => Promise<boolean>
): Promise<string[]> {
  const keys: string[] = [];

  while (keys.length < quantity) {
    const key = generateKey();
    const exists = await existingChecker(key);
    if (!exists && !keys.includes(key)) keys.push(key);
  }

  return keys;
}