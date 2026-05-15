import winston from "winston";
import { env } from "../config/env";

const fmt = winston.format;

export const logger = winston.createLogger({
  level: env.NODE_ENV === "production" ? "info" : "debug",
  format: fmt.combine(fmt.timestamp(), fmt.errors({ stack: true })),
  transports: [
    new winston.transports.Console({
      format: env.NODE_ENV === "production"
        ? fmt.json()
        : fmt.combine(fmt.colorize(), fmt.simple()),
    }),
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
    new winston.transports.File({ filename: "logs/combined.log" }),
  ],
});