import { RateLimitRequestHandler } from "express-rate-limit";
/** Rate limit global da API */
export declare function createGlobalRateLimiter(): RateLimitRequestHandler;
/** Login admin — máximo de tentativas por IP */
export declare function createAdminLoginLimiter(): RateLimitRequestHandler;
/** Login/cadastro cliente (cheat) */
export declare function createClientAuthLimiter(): RateLimitRequestHandler;
/** Rotas autenticadas do painel — evita abuso de token roubado */
export declare function createAuthenticatedApiLimiter(): RateLimitRequestHandler;
