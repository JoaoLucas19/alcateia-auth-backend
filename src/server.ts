import express from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";
import rateLimit from "express-rate-limit";

import { env } from "./config/env";
import { isOriginAllowed } from "./config/cors";

import { errorHandler } from "./middlewares/error.middleware";

import authRoutes from "./modules/auth/auth.routes";
import clientAuthRoutes from "./modules/client-auth/client-auth.routes";
import productRoutes from "./modules/products/product.routes";
import keyRoutes from "./modules/key/key.routes";
import logRoutes from "./modules/logs/log.routes";
import clientRoutes from "./modules/clients/client.routes"; // Nova rota adicionada para clientes
import notificationRoutes from "./modules/notifications/notification.routes";
import { startDiscordAlertPoller } from "./modules/notifications/discord.poller";

const app = express();

/**
 * Obrigatório para Railway (proxy reverso)
 * Sem isso o rate limiter quebra em toda requisição
 */
app.set("trust proxy", 1);

/**
 * Configuração segura do Helmet
 */
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

/**
 * Configuração do CORS
 */
const corsOptions: CorsOptions = {
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

    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }

    console.warn(`[CORS] Origin bloqueado: ${origin}`);
    return callback(null, false);
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
 * Aplica CORS globalmente (inclui resposta automatica a preflight OPTIONS).
 * Nao usar app.options("*") — Express 5 + path-to-regexp nao aceita "*" solto.
 */
app.use(cors(corsOptions));

/**
 * Body parser
 */
app.use(express.json());

/**
 * Rate Limiter global
 */
app.use(
  rateLimit({
    windowMs: env.RATE_LIMIT_WINDOW_MS,
    max: env.RATE_LIMIT_MAX,

    standardHeaders: true,
    legacyHeaders: false,

    handler: (_req, res) => {
      res.status(429).json({
        success: false,
        code: "RATE_LIMIT",
        message: "Muitas requisições. Aguarde e tente novamente.",
      });
    },
  })
);

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
app.use("/api/auth", authRoutes);

/** Login/cadastro do cliente no cheat (NeverApi C++) */
app.use("/auth", clientAuthRoutes);

app.use("/api/products", productRoutes);

app.use("/api/keys", keyRoutes);

app.use("/api/logs", logRoutes);

app.use("/api/notifications", notificationRoutes);

// Rota para clientes
app.use("/api/admin/clients", clientRoutes);

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
app.use(errorHandler);

/**
 * Inicialização do servidor
 */
app.listen(env.PORT, () => {
  startDiscordAlertPoller();

  console.log(`
========================================
🚀 API AlcateiaAuth ONLINE
🌐 Porta: ${env.PORT}
🛡️ CORS: ATIVO
🔥 Ambiente: ${env.NODE_ENV}
========================================
  `);
});