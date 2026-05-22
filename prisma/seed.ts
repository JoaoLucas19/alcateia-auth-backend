import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  // ── Admins ──────────────────────────────────────────────
  const admins = [
    { username: "whitex",  password: process.env.ADMIN_PASSWORD_1 },
    { username: "juninho", password: process.env.ADMIN_PASSWORD_2 },
  ];

  for (const admin of admins) {
    if (!admin.password) {
      console.error(`❌ Senha não definida para "${admin.username}". Verifique o .env (ADMIN_PASSWORD_1 e ADMIN_PASSWORD_2).`);
      process.exit(1);
    }

    const existing = await prisma.admin.findUnique({ where: { username: admin.username } });

    if (existing) {
      console.log(`Admin "${admin.username}" já existe — pulando.`);
      continue;
    }

    const passwordHash = await bcrypt.hash(admin.password, 12);

    await prisma.admin.create({
      data: { username: admin.username, passwordHash },
    });

    console.log(`✓ Admin "${admin.username}" criado com sucesso.`);
  }

  // ── Produtos ─────────────────────────────────────────────
  const products = [
    { name: "Free Fire", description: "Keys de acesso para Free Fire" },
  ];

  for (const product of products) {
    const existing = await prisma.product.findFirst({ where: { name: product.name } });

    if (existing) {
      console.log(`Produto "${product.name}" já existe — pulando.`);
      continue;
    }

    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        isActive: true,
      },
    });

    console.log(`✓ Produto "${product.name}" criado com sucesso.`);
  }
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());