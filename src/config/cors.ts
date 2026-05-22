import { env } from "./env";

/** Origens fixas do painel e desenvolvimento local */
const DEFAULT_ORIGINS = [
  "https://whitexcorporation.com.br",
  "https://www.whitexcorporation.com.br",
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:4173",
];

/** Horizons / Hostinger / preview do editor */
const ORIGIN_PATTERNS: RegExp[] = [
  /^https:\/\/[\w-]+\.hostingersite\.com$/i,
  /^https:\/\/[\w-]+\.horizons\.hostinger\.(com|dev)$/i,
  /^https:\/\/[\w-]+\.app-preview\.(io|com)$/i,
  /^https:\/\/[\w-]+(\.[\w-]+)*\.hostinger\.(com|dev)$/i,
];

function parseEnvOrigins(): string[] {
  const raw = env.ALLOWED_ORIGINS?.trim();
  if (!raw || raw === "*") return [];
  return raw.split(",").map((o) => o.trim()).filter(Boolean);
}

export function getAllowedOriginList(): string[] {
  return [...new Set([...DEFAULT_ORIGINS, ...parseEnvOrigins()])];
}

export function isOriginAllowed(origin: string): boolean {
  const list = getAllowedOriginList();
  if (list.includes(origin)) return true;
  return ORIGIN_PATTERNS.some((pattern) => pattern.test(origin));
}
