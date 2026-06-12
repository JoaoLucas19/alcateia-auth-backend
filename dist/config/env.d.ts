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
    /** Notificar login/logout de admin no Discord */
    DISCORD_NOTIFY_AUTH_SESSIONS: boolean;
    /** Limite do body JSON (kb) */
    BODY_LIMIT_KB: number;
    /** Janela de análise de tentativas suspeitas (ms) — padrão 15 min */
    SECURITY_WINDOW_MS: number;
    /** Bloqueio automático após N falhas de login admin na janela */
    ADMIN_LOGIN_BLOCK_THRESHOLD: number;
    /** Bloqueio automático após N falhas de login cliente na janela */
    CLIENT_LOGIN_BLOCK_THRESHOLD: number;
    /** Bloqueio após N keys inválidas testadas na janela */
    KEY_SCAN_BLOCK_THRESHOLD: number;
    /** Duração do bloqueio por login (ms) — padrão 1h */
    IP_BLOCK_DURATION_MS: number;
    /** Duração do bloqueio por key scanning (ms) — padrão 2h */
    KEY_SCAN_BLOCK_DURATION_MS: number;
    /** Rate limit login admin */
    ADMIN_LOGIN_RATE_WINDOW_MS: number;
    ADMIN_LOGIN_RATE_MAX: number;
    /** Rate limit auth cliente */
    CLIENT_AUTH_RATE_WINDOW_MS: number;
    CLIENT_AUTH_RATE_MAX: number;
    /** Rate limit rotas autenticadas do painel */
    AUTH_API_RATE_WINDOW_MS: number;
    AUTH_API_RATE_MAX: number;
    /** Chave para /uid/add|remove|check do painel UID Bypass */
    UID_BYPASS_API_KEY: string;
};
