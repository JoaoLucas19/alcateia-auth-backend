import { Request } from "express";

const IP_V4_REGEX =
  /^(?:(?:25[0-5]|2[0-4]\d|1?\d?\d)\.){3}(?:25[0-5]|2[0-4]\d|1?\d?\d)$/;

const IP_V6_REGEX =
  /^(?:[0-9a-fA-F]{0,4}:){2,7}[0-9a-fA-F]{0,4}$|^::1$|^::$/;

/** Extrai IP confiável da requisição (Railway/proxy com trust proxy). */
export function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.trim()) {
    const first = forwarded.split(",")[0]?.trim();
    if (first && isValidIp(first)) return first;
  }

  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string" && realIp.trim() && isValidIp(realIp.trim())) {
    return realIp.trim();
  }

  if (req.ip && isValidIp(req.ip)) return req.ip;

  return "unknown";
}

export function isValidIp(value: string): boolean {
  if (value === "unknown") return false;
  if (IP_V4_REGEX.test(value)) return true;
  if (IP_V6_REGEX.test(value)) return true;
  return false;
}

export function normalizeIp(value: string): string {
  return value.trim().slice(0, 45);
}
