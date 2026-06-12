"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const env_1 = require("./config/env");
const cors_2 = require("./config/cors");
const rate_limit_1 = require("./config/rate-limit");
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const client_auth_routes_1 = __importDefault(require("./modules/client-auth/client-auth.routes"));
const product_routes_1 = __importDefault(require("./modules/products/product.routes"));
const key_routes_1 = __importDefault(require("./modules/key/key.routes"));
const log_routes_1 = __importDefault(require("./modules/logs/log.routes"));
const client_routes_1 = __importDefault(require("./modules/clients/client.routes"));
const notification_routes_1 = __importDefault(require("./modules/notifications/notification.routes"));
const banned_hwid_routes_1 = __importDefault(require("./modules/banned-hwid/banned-hwid.routes"));
const discord_poller_1 = require("./modules/notifications/discord.poller");
const failed_login_cleanup_1 = require("./modules/logs/failed-login-cleanup");
const app = (0, express_1.default)();
/**
 * Obrigatório para Railway (proxy reverso)
 * Sem isso o rate limiter quebra em toda requisição
 */
app.set("trust proxy", 1);
/**
 * Configuração segura do Helmet
 */
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
    contentSecurityPolicy: env_1.env.NODE_ENV === "production" ? undefined : false,
}));
/**
 * Configuração do CORS
 */
const corsOptions = {
    origin: (origin, callback) => {
        if (!origin) {
            return callback(null, true);
        }
        if ((0, cors_2.isOriginAllowed)(origin)) {
            return callback(null, true);
        }
        console.warn(`[CORS] Origin bloqueado: ${origin}`);
        return callback(null, false);
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
    ],
};
app.use((0, cors_1.default)(corsOptions));
/**
 * Body parser com limite de tamanho (anti DoS)
 */
app.use(express_1.default.json({ limit: `${env_1.env.BODY_LIMIT_KB}kb` }));
app.use(express_1.default.urlencoded({ extended: false, limit: `${env_1.env.BODY_LIMIT_KB}kb` }));
/**
 * Rate Limiter global por IP
 */
app.use((0, rate_limit_1.createGlobalRateLimiter)());
/**
 * Health Check
 */
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "API AlcateiaAuth Online!",
    });
});
const authenticatedApiLimiter = (0, rate_limit_1.createAuthenticatedApiLimiter)();
/**
 * Rotas da API
 */
app.use("/api/auth", auth_routes_1.default);
/** Login/cadastro do cliente no cheat (NeverApi C++) */
app.use("/auth", client_auth_routes_1.default);
app.use("/api/products", authenticatedApiLimiter, product_routes_1.default);
app.use("/api/keys", authenticatedApiLimiter, key_routes_1.default);
app.use("/api/logs", authenticatedApiLimiter, log_routes_1.default);
app.use("/api/notifications", authenticatedApiLimiter, notification_routes_1.default);
app.use("/api/admin/banned-hwids", authenticatedApiLimiter, banned_hwid_routes_1.default);
app.use("/api/admin/clients", authenticatedApiLimiter, client_routes_1.default);
/**
 * 404 em rotas /api — sempre JSON (evita "Resposta inválida" no frontend)
 */
app.use("/api", (_req, res) => {
    res.status(404).json({
        success: false,
        code: "NOT_FOUND",
        message: "Rota da API não encontrada. Verifique se o backend está atualizado.",
    });
});
/**
 * Middleware global de erros
 * SEMPRE o último middleware
 */
app.use(error_middleware_1.errorHandler);
/**
 * Inicialização do servidor
 */
app.listen(env_1.env.PORT, () => {
    (0, discord_poller_1.startDiscordAlertPoller)();
    (0, failed_login_cleanup_1.startFailedLoginCleanup)();
    console.log(`
========================================
🚀 API AlcateiaAuth ONLINE
🌐 Porta: ${env_1.env.PORT}
🛡️ CORS: ATIVO
🔒 Segurança: rate limit + bloqueio IP + validação
🔥 Ambiente: ${env_1.env.NODE_ENV}
========================================
  `);
});
//# sourceMappingURL=server.js.map