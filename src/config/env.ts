import dotenv from "dotenv";

dotenv.config();

function required(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }

    return value;
}

export const env = {
    PORT: Number(process.env.PORT || 3000),

    NODE_ENV: process.env.NODE_ENV || "development",

    DATABASE_URL: required("DATABASE_URL"),

    JWT_SECRET: required("JWT_SECRET"),

    JWT_EXPIRES_IN: required("JWT_EXPIRES_IN"),

    RATE_LIMIT_WINDOW_MS: Number(
        process.env.RATE_LIMIT_WINDOW_MS || 60000
    ),

    RATE_LIMIT_MAX: Number(
        process.env.RATE_LIMIT_MAX || 30
    ),

    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "*"
};