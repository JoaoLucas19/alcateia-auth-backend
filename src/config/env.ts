import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const env = {
    PORT: Number(process.env.PORT || 3000),

    NODE_ENV: process.env.NODE_ENV || "development",

    DATABASE_URL: required("DATABASE_URL"),

    JWT_SECRET: required("JWT_SECRET"),

    JWT_EXPIRES_IN: required("JWT_EXPIRES_IN"),

    RATE_LIMIT_WINDOW_MS: Number(
        process.env.RATE_LIMIT_WINDOW_MS || 60000
    ),

    RATE_LIMIT_MAX: Number(
        process.env.RATE_LIMIT_MAX || 30
    ),

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "*",

    /** Webhook Discord para alertas de segurança (nunca commitar a URL real) */
    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL || "",

    DISCORD_ALERTS_ENABLED: process.env.DISCORD_ALERTS_ENABLED !== "false",

    /** Intervalo do poller de segurança (ms) — padrão 5 min */
    DISCORD_ALERT_POLL_MS: Number(process.env.DISCORD_ALERT_POLL_MS || 5 * 60 * 1000),

    /** Cooldown por alerta para evitar spam (ms) — padrão 15 min */
    DISCORD_ALERT_COOLDOWN_MS: Number(process.env.DISCORD_ALERT_COOLDOWN_MS || 15 * 60 * 1000),

    DISCORD_NOTIFY_BRUTE_FORCE: process.env.DISCORD_NOTIFY_BRUTE_FORCE !== "false",
    DISCORD_NOTIFY_KEY_SCANNING: process.env.DISCORD_NOTIFY_KEY_SCANNING !== "false",
    DISCORD_NOTIFY_HIGH_THREAT: process.env.DISCORD_NOTIFY_HIGH_THREAT !== "false",

    /** Notificar login/logout de admin no Discord */
    DISCORD_NOTIFY_AUTH_SESSIONS: process.env.DISCORD_NOTIFY_AUTH_SESSIONS !== "false",

    /** Limite do body JSON (kb) */
    BODY_LIMIT_KB: Number(process.env.BODY_LIMIT_KB || 32),

    /** Janela de análise de tentativas suspeitas (ms) — padrão 15 min */
    SECURITY_WINDOW_MS: Number(process.env.SECURITY_WINDOW_MS || 15 * 60 * 1000),

    /** Bloqueio automático após N falhas de login admin na janela */
    ADMIN_LOGIN_BLOCK_THRESHOLD: Number(process.env.ADMIN_LOGIN_BLOCK_THRESHOLD || 5),

    /** Bloqueio automático após N falhas de login cliente na janela */
    CLIENT_LOGIN_BLOCK_THRESHOLD: Number(process.env.CLIENT_LOGIN_BLOCK_THRESHOLD || 10),

    /** Bloqueio após N keys inválidas testadas na janela */
    KEY_SCAN_BLOCK_THRESHOLD: Number(process.env.KEY_SCAN_BLOCK_THRESHOLD || 15),

    /** Duração do bloqueio por login (ms) — padrão 1h */
    IP_BLOCK_DURATION_MS: Number(process.env.IP_BLOCK_DURATION_MS || 60 * 60 * 1000),

    /** Duração do bloqueio por key scanning (ms) — padrão 2h */
    KEY_SCAN_BLOCK_DURATION_MS: Number(process.env.KEY_SCAN_BLOCK_DURATION_MS || 2 * 60 * 60 * 1000),

    /** Rate limit login admin */
    ADMIN_LOGIN_RATE_WINDOW_MS: Number(process.env.ADMIN_LOGIN_RATE_WINDOW_MS || 15 * 60 * 1000),
    ADMIN_LOGIN_RATE_MAX: Number(process.env.ADMIN_LOGIN_RATE_MAX || 5),

    /** Rate limit auth cliente */
    CLIENT_AUTH_RATE_WINDOW_MS: Number(process.env.CLIENT_AUTH_RATE_WINDOW_MS || 15 * 60 * 1000),
    CLIENT_AUTH_RATE_MAX: Number(process.env.CLIENT_AUTH_RATE_MAX || 15),

    /** Rate limit rotas autenticadas do painel */
    AUTH_API_RATE_WINDOW_MS: Number(process.env.AUTH_API_RATE_WINDOW_MS || 60 * 1000),
    AUTH_API_RATE_MAX: Number(process.env.AUTH_API_RATE_MAX || 120),

    /** Chave para /uid/add|remove|check do painel UID Bypass */
    UID_BYPASS_API_KEY: process.env.UID_BYPASS_API_KEY || "alcateia",
};