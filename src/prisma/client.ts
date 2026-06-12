import dotenv from "dotenv";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client";

dotenv.config();

function requireDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("Missing environment variable: DATABASE_URL");
  }
  return url;
}

function createAdapter() {
  const parsed = new URL(requireDatabaseUrl());

  return new PrismaMariaDb({
    host: parsed.hostname,
    port: parsed.port ? Number(parsed.port) : 3306,
    user: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
    database: parsed.pathname.replace(/^\//, ""),
    connectionLimit: 10,
  });
}

const globalForPrisma = globalThis as typeof globalThis & {
  prisma?: PrismaClient;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter: createAdapter() });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
