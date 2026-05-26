export declare const env: {
    PORT: number;
    NODE_ENV: string;
    DATABASE_URL: string;
    JWT_SECRET: string;
    JWT_EXPIRES_IN: string;
    RATE_LIMIT_WINDOW_MS: number;
    RATE_LIMIT_MAX: number;
    ALLOWED_ORIGINS: string;
    /** Webhook Discord para alertas de segurança (nunca commitar a URL real) */
    DISCORD_WEBHOOK_URL: string;
    DISCORD_ALERTS_ENABLED: boolean;
    /** Intervalo do poller de segurança (ms) — padrão 5 min */
    DISCORD_ALERT_POLL_MS: number;
    /** Cooldown por alerta para evitar spam (ms) — padrão 15 min */
    DISCORD_ALERT_COOLDOWN_MS: number;
    DISCORD_NOTIFY_BRUTE_FORCE: boolean;
    DISCORD_NOTIFY_KEY_SCANNING: boolean;
    DISCORD_NOTIFY_HIGH_THREAT: boolean;
};
