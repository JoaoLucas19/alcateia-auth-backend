/**
 * Corrige Lifetime no banco apontado pelo .env (confira se e Railway ou localhost).
 */
import { PrismaClient } from "@prisma/client";

const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");
const KEY_VALUE = process.env.FIX_KEY_VALUE ?? "ALCATEIA-1045-5971";
const USERNAME = process.env.FIX_USERNAME ?? "white";

function printDatabaseTarget() {
  const url = process.env.DATABASE_URL ?? "";
  const masked = url.replace(/:([^:@]+)@/, ":***@");
  console.log(`DATABASE_URL = ${masked || "(nao definido)"}`);
  if (url.includes("localhost") || url.includes("127.0.0.1")) {
    console.warn("ATENCAO: Voce esta no MySQL LOCAL, nao no Railway!");
    console.warn("Para corrigir producao, cole a DATABASE_URL do Railway no .env e rode de novo.");
  }
}

async function ensureIsPermanentColumn(prisma: PrismaClient) {
  const rows = await prisma.$queryRaw<{ cnt: bigint }[]>`
    SELECT COUNT(*) AS cnt
    FROM information_schema.COLUMNS
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME = 'Key'
      AND COLUMN_NAME = 'isPermanent'
  `;

  const exists = Number(rows[0]?.cnt ?? 0) > 0;
  if (exists) {
    console.log("Coluna isPermanent ja existe.");
    return;
  }

  console.log("Criando coluna isPermanent em Key...");
  await prisma.$executeRawUnsafe(
    "ALTER TABLE `Key` ADD COLUMN `isPermanent` TINYINT(1) NOT NULL DEFAULT 0"
  );
  console.log("Coluna isPermanent criada.");
}

async function listRecentKeys(prisma: PrismaClient) {
  const keys = await prisma.key.findMany({
    take: 15,
    orderBy: { createdAt: "desc" },
    select: { value: true, status: true, isPermanent: true, expiresAt: true },
  });
  console.log("\nKeys recentes neste banco:");
  for (const k of keys) {
    console.log(`  - ${k.value} | ${k.status} | permanent=${k.isPermanent}`);
  }
}

async function main() {
  printDatabaseTarget();
  const prisma = new PrismaClient();
  await ensureIsPermanentColumn(prisma);

  let key = await prisma.key.findUnique({
    where: { value: KEY_VALUE },
    include: { client: true },
  });

  if (!key) {
    console.warn(`Key nao encontrada pelo valor: ${KEY_VALUE}`);
    const client = await prisma.client.findUnique({
      where: { username: USERNAME },
      include: { key: true },
    });

    if (client?.key) {
      console.log(`Usando key vinculada ao usuario "${USERNAME}": ${client.key.value}`);
      key = await prisma.key.findUnique({
        where: { id: client.keyId },
        include: { client: true },
      });
    }
  }

  if (!key) {
    await listRecentKeys(prisma);
    console.error(
      "\nNenhuma key/cliente para corrigir. Use FIX_KEY_VALUE ou FIX_USERNAME ou aponte .env para o Railway."
    );
    process.exit(1);
  }

  await prisma.key.update({
    where: { id: key.id },
    data: { isPermanent: true, expiresAt: LIFETIME_EXPIRY },
  });
  console.log(`Key ${key.value} -> isPermanent=true, expiresAt=2099`);

  if (key.client) {
    await prisma.client.update({
      where: { id: key.client.id },
      data: { expiresAt: LIFETIME_EXPIRY },
    });
    console.log(`Cliente ${key.client.username} -> Lifetime`);
  } else {
    const client = await prisma.client.findUnique({ where: { username: USERNAME } });
    if (client && client.keyId === key.id) {
      await prisma.client.update({
        where: { id: client.id },
        data: { expiresAt: LIFETIME_EXPIRY },
      });
      console.log(`Cliente ${USERNAME} -> Lifetime`);
    }
  }

  await prisma.$disconnect();
  console.log("\nPronto. Faca login no cheat para ver Lifetime.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
