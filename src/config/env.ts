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
};