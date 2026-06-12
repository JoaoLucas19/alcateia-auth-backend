/**
 * Corrige key permanente + conta do cliente (ex.: white / ALCATEIA-1045-5971).
 *
 * Uso local (cole DATABASE_URL do Railway no .env):
 *   npx ts-node scripts/fix-lifetime-key.ts
 *
 * Uso no Railway:
 *   railway run npx ts-node scripts/fix-lifetime-key.ts
 */
import prisma from "../src/prisma/client";

const LIFETIME_EXPIRY = new Date("2099-12-31T23:59:59.999Z");

const KEY_VALUE = process.env.FIX_KEY_VALUE ?? "ALCATEIA-1045-5971";
const USERNAME = process.env.FIX_USERNAME ?? "white";

async function main() {
  const key = await prisma.key.findUnique({
    where: { value: KEY_VALUE },
    include: { client: true },
  });

  if (!key) {
    console.error(`Key nao encontrada: ${KEY_VALUE}`);
    process.exit(1);
  }

  await prisma.key.update({
    where: { id: key.id },
    data: {
      isPermanent: true,
      expiresAt: LIFETIME_EXPIRY,
    },
  });
  console.log(`Key ${KEY_VALUE} -> isPermanent=true, expiresAt=2099`);

  if (key.client) {
    await prisma.client.update({
      where: { id: key.client.id },
      data: { expiresAt: LIFETIME_EXPIRY },
    });
    console.log(`Cliente ${key.client.username} -> expiresAt=2099 (Lifetime)`);
  } else {
    const client = await prisma.client.findUnique({ where: { username: USERNAME } });
    if (client && client.keyId === key.id) {
      await prisma.client.update({
        where: { id: client.id },
        data: { expiresAt: LIFETIME_EXPIRY },
      });
      console.log(`Cliente ${USERNAME} -> expiresAt=2099 (Lifetime)`);
    } else {
      console.warn(`Nenhum Client vinculado a esta key. Faca login apos cadastro.`);
    }
  }

  await prisma.$disconnect();
  console.log("Concluido. Faca login no cheat para ver Lifetime.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
