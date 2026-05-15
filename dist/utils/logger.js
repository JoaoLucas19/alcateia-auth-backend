"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = __importDefault(require("winston"));
const env_1 = require("../config/env");
const fmt = winston_1.default.format;
exports.logger = winston_1.default.createLogger({
    level: env_1.env.NODE_ENV === "production" ? "info" : "debug",
    format: fmt.combine(fmt.timestamp(), fmt.errors({ stack: true })),
    transports: [
        new winston_1.default.transports.Console({
            format: env_1.env.NODE_ENV === "production"
                ? fmt.json()
                : fmt.combine(fmt.colorize(), fmt.simple()),
        }),
        new winston_1.default.transports.File({ filename: "logs/error.log", level: "error" }),
        new winston_1.default.transports.File({ filename: "logs/combined.log" }),
    ],
});
//# sourceMappingURL=logger.js.map