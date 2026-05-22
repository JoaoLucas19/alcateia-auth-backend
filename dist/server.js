"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const env_1 = require("./config/env");
const error_middleware_1 = require("./middlewares/error.middleware");
const auth_routes_1 = __importDefault(require("./modules/auth/auth.routes"));
const client_auth_routes_1 = __importDefault(require("./modules/client-auth/client-auth.routes"));
const product_routes_1 = __importDefault(require("./modules/products/product.routes"));
const key_routes_1 = __importDefault(require("./modules/key/key.routes"));
const log_routes_1 = __importDefault(require("./modules/logs/log.routes"));
const app = (0, express_1.default)();
/**
 * Obrigatório para Railway (proxy reverso)
 * Sem isso o rate limiter quebra em toda requisição
 */
app.set("trust proxy", 1);
/**
 * Origins permitidos
 */
const allowedOrigins = [
    "https://whitexcorporation.com.br",
    "https://www.whitexcorporation.com.br",
    // DEV
    "http://localhost:5173",
    "http://localhost:4173",
];
/**
 * Configuração segura do Helmet
 */
app.use((0, helmet_1.default)({
    crossOriginResourcePolicy: false,
}));
/**
 * Configuração do CORS
 */
const corsOptions = {
    origin: (origin, callback) => {
        /**
         * Permite:
         * - Postman
         * - Curl
         * - Railway Health Check
         * - Requests server-to-server
         */
        if (!origin) {
            return callback(null, true);
        }
        /**
         * Verifica se origin está liberado
         */
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        console.warn(`[CORS] Origin bloqueado: ${origin}`);
        return callback(new Error(`CORS: Origin não permitido -> ${origin}`));
    },
    credentials: true,
    methods: [
        "GET",
        "POST",
        "PUT",
        "PATCH",
        "DELETE",
        "OPTIONS",
    ],
    allowedHeaders: [
        "Content-Type",
        "Authorization",
        "X-Requested-With",
        "Accept",
        "Origin",
    ],
};
/**
 * Aplica CORS globalmente
 */
app.use((0, cors_1.default)(corsOptions));
/**
 * Responde preflight requests
 * MUITO IMPORTANTE para Railway + Frontend externo
 */
app.options("*", (0, cors_1.default)(corsOptions));
/**
 * Body parser
 */
app.use(express_1.default.json());
/**
 * Rate Limiter global
 */
app.use((0, express_rate_limit_1.default)({
    windowMs: env_1.env.RATE_LIMIT_WINDOW_MS,
    max: env_1.env.RATE_LIMIT_MAX,
    standardHeaders: true,
    legacyHeaders: false,
}));
/**
 * Health Check
 */
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "API AlcateiaAuth Online!",
    });
});
/**
 * Rotas da API
 */
app.use("/api/auth", auth_routes_1.default);
/** Login/cadastro do cliente no cheat (NeverApi C++) */
app.use("/auth", client_auth_routes_1.default);
app.use("/api/products", product_routes_1.default);
app.use("/api/keys", key_routes_1.default);
app.use("/api/logs", log_routes_1.default);
/**
 * Middleware global de erros
 * SEMPRE o último middleware
 */
app.use(error_middleware_1.errorHandler);
/**
 * Inicialização do servidor
 */
app.listen(env_1.env.PORT, () => {
    console.log(`
========================================
🚀 API AlcateiaAuth ONLINE
🌐 Porta: ${env_1.env.PORT}
🛡️ CORS: ATIVO
🔥 Ambiente: ${env_1.env.NODE_ENV}
========================================
  `);
});
//# sourceMappingURL=server.js.map