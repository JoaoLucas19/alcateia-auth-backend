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
const product_routes_1 = __importDefault(require("./modules/products/product.routes")); // ROTA ADICIONADA
const key_routes_1 = __importDefault(require("./modules/key/key.routes")); // ROTA ADICIONADA
const log_routes_1 = __importDefault(require("./modules/logs/log.routes")); // ← ADICIONA
const app = (0, express_1.default)();
// Lista de origins permitidos — adicione aqui qualquer novo domínio/porta
const allowedOrigins = [
    "https://whitexcorporation.com.br",
    "https://www.whitexcorporation.com.br",
    "http://localhost:5173", // dev Vite
    "http://localhost:4173", // preview Vite (npm run preview)
];
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        // Permite requisições sem origin (Postman, curl, Railway health checks, etc.)
        if (!origin)
            return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        // Loga o origin bloqueado para facilitar debug
        console.warn(`[CORS] Origin bloqueado: ${origin}`);
        return callback(new Error(`CORS: origin não permitido → ${origin}`));
    },
    credentials: true,
}));
app.use(express_1.default.json());
// Rate limiter global
app.use((0, express_rate_limit_1.default)({ windowMs: env_1.env.RATE_LIMIT_WINDOW_MS, max: env_1.env.RATE_LIMIT_MAX }));
app.get("/", (_req, res) => res.send("API AlcateiaAuth Online!"));
// Rotas
app.use("/api/auth", auth_routes_1.default);
app.use("/api/products", product_routes_1.default); // NOVA ROTA ADICIONADA
app.use("/api/keys", key_routes_1.default); // NOVA ROTA ADICIONADA
// Na seção de Rotas:
app.use("/api/logs", log_routes_1.default); // ← ADICIONA
// Handler global de erros — deve ser o último middleware
app.use(error_middleware_1.errorHandler);
app.listen(env_1.env.PORT, () => console.log(`API rodando na porta ${env_1.env.PORT}!`));
//# sourceMappingURL=server.js.map