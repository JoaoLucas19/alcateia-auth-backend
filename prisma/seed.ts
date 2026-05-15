import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
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
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());