import { Request } from "express";
/** Extrai IP confiável da requisição (Railway/proxy com trust proxy). */
export declare function getClientIp(req: Request): string;
export declare function isValidIp(value: string): boolean;
export declare function normalizeIp(value: string): string;
