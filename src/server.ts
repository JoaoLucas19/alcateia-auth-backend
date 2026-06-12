import express from "express";
import helmet from "helmet";
import cors, { CorsOptions } from "cors";

import { env } from "./config/env";
import { isOriginAllowed } from "./config/cors";
import { createAuthenticatedApiLimiter, createGlobalRateLimiter } from "./config/rate-limit";

import { errorHandler } from "./middlewares/error.middleware";

import authRoutes from "./modules/auth/auth.routes";
import clientAuthRoutes from "./modules/client-auth/client-auth.routes";
import productRoutes from "./modules/products/product.routes";
import keyRoutes from "./modules/key/key.routes";
import logRoutes from "./modules/logs/log.routes";
import clientRoutes from "./modules/clients/client.routes";
import notificationRoutes from "./modules/notifications/notification.routes";
import bannedHwidRoutes from "./modules/banned-hwid/banned-hwid.routes";
import uidBypassRoutes from "./modules/uid-bypass/uid-bypass.routes";
import { startDiscordAlertPoller } from "./modules/notifications/discord.poller";
import { startFailedLoginCleanup } from "./modules/logs/failed-login-cleanup";

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
    contentSecurityPolicy: env.NODE_ENV === "production" ? undefined : false,
  })
);

/**
 * Configuração do CORS
 */
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
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

  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
  ],
};

app.use(cors(corsOptions));

/**
 * Body parser com limite de tamanho (anti DoS)
 */
app.use(express.json({ limit: `${env.BODY_LIMIT_KB}kb` }));
app.use(express.urlencoded({ extended: false, limit: `${env.BODY_LIMIT_KB}kb` }));

/**
 * Rate Limiter global por IP
 */
app.use(createGlobalRateLimiter());

/**
 * Health Check
 */
app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "API AlcateiaAuth Online!",
  });
});

const authenticatedApiLimiter = createAuthenticatedApiLimiter();

/**
 * Rotas da API
 */
app.use("/api/auth", authRoutes);

/** Login/cadastro do cliente no cheat (NeverApi C++) */
app.use("/auth", clientAuthRoutes);

/** Whitelist UID Free Fire — painel TOXIC UID BYPASS */
app.use("/uid", uidBypassRoutes);

app.use("/api/products", authenticatedApiLimiter, productRoutes);
app.use("/api/keys", authenticatedApiLimiter, keyRoutes);
app.use("/api/logs", authenticatedApiLimiter, logRoutes);
app.use("/api/notifications", authenticatedApiLimiter, notificationRoutes);
app.use("/api/admin/banned-hwids", authenticatedApiLimiter, bannedHwidRoutes);
app.use("/api/admin/clients", authenticatedApiLimiter, clientRoutes);

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
  startFailedLoginCleanup();

  console.log(`
========================================
🚀 API AlcateiaAuth ONLINE
🌐 Porta: ${env.PORT}
🛡️ CORS: ATIVO
🔒 Segurança: rate limit + bloqueio IP + validação
🔥 Ambiente: ${env.NODE_ENV}
========================================
  `);
});
