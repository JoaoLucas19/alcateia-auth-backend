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
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)({
    origin: ['http://localhost:5173', 'https://whitexcorporation.com.br'],
    credentials: true,
}));
app.use(express_1.default.json());
// Rate limiter global
app.use((0, express_rate_limit_1.default)({ windowMs: env_1.env.RATE_LIMIT_WINDOW_MS, max: env_1.env.RATE_LIMIT_MAX }));
app.get("/", (_req, res) => res.send("API AlcateiaAuth Online!"));
// Rotas
app.use("/api/auth", auth_routes_1.default);
// Handler global de erros — deve ser o último middleware
app.use(error_middleware_1.errorHandler);
app.listen(env_1.env.PORT, () => console.log(`API rodando na porta ${env_1.env.PORT}!`));
//# sourceMappingURL=server.js.map