import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "ts-node prisma/seed.ts",
  },
  datasource: {
    // Placeholder permite `prisma generate` sem banco; migrate usa DATABASE_URL real.
    url: process.env.DATABASE_URL ?? "mysql://user:pass@localhost:3306/alcateia",
  },
});
