import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { env } from "./config/env";
import { errorHandler } from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

// Lista de origins permitidos — adicione aqui qualquer novo domínio/porta
const allowedOrigins = [
  "https://whitexcorporation.com.br",
  "https://www.whitexcorporation.com.br",
  "http://localhost:5173",  // dev Vite
  "http://localhost:4173",  // preview Vite (npm run preview)
];

app.use(helmet());

app.use(
  cors({
    origin: (origin, callback) => {
      // Permite requisições sem origin (Postman, curl, Railway health checks, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Loga o origin bloqueado para facilitar debug
      console.warn(`[CORS] Origin bloqueado: ${origin}`);
      return callback(new Error(`CORS: origin não permitido → ${origin}`));
    },
    credentials: true,
  })
);

app.use(express.json());

// Rate limiter global
app.use(rateLimit({ windowMs: env.RATE_LIMIT_WINDOW_MS, max: env.RATE_LIMIT_MAX }));

app.get("/", (_req, res) => res.send("API AlcateiaAuth Online!"));

// Rotas
app.use("/api/auth", authRoutes);

// Handler global de erros — deve ser o último middleware
app.use(errorHandler);

app.listen(env.PORT, () => console.log(`API rodando na porta ${env.PORT}!`));