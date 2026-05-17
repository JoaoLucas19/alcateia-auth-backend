import crypto from "crypto";

function generateSegment(): string {
  // Gera 4 dígitos numéricos aleatórios (1000–9999)
  const num = 1000 + (crypto.randomBytes(2).readUInt16BE(0) % 9000);
  return num.toString();
}

export function generateKeyValue(): string {
  return `ALCATEIA-${generateSegment()}-${generateSegment()}`;
}

export async function generateUniqueKeys(
  quantity: number,
  existingChecker: (key: string) => Promise<boolean>
): Promise<string[]> {
  const keys: string[] = [];

  while (keys.length < quantity) {
    const key = generateKeyValue();
    const exists = await existingChecker(key);
    if (!exists && !keys.includes(key)) keys.push(key);
  }

  return keys;
}