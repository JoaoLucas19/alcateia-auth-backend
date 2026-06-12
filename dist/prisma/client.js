"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const adapter_mariadb_1 = require("@prisma/adapter-mariadb");
const client_1 = require("../generated/prisma/client");
dotenv_1.default.config();
function requireDatabaseUrl() {
    const url = process.env.DATABASE_URL;
    if (!url) {
        throw new Error("Missing environment variable: DATABASE_URL");
    }
    return url;
}
function createAdapter() {
    const parsed = new URL(requireDatabaseUrl());
    return new adapter_mariadb_1.PrismaMariaDb({
        host: parsed.hostname,
        port: parsed.port ? Number(parsed.port) : 3306,
        user: decodeURIComponent(parsed.username),
        password: decodeURIComponent(parsed.password),
        database: parsed.pathname.replace(/^\//, ""),
        connectionLimit: 10,
    });
}
const globalForPrisma = globalThis;
const prisma = globalForPrisma.prisma ?? new client_1.PrismaClient({ adapter: createAdapter() });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
exports.default = prisma;
//# sourceMappingURL=client.js.map