"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUniqueKeys = generateUniqueKeys;
const crypto_1 = __importDefault(require("crypto"));
// Charset sem 0/O/1/I para evitar confusão visual
const CHARSET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function generateKey() {
    const randomSegment = (length) => Array.from(crypto_1.default.randomBytes(length))
        .map((b) => CHARSET[b % CHARSET.length])
        .join("");
    return `ALCATEIA-${randomSegment(4)}-${randomSegment(4)}`;
}
async function generateUniqueKeys(quantity, existingChecker) {
    const keys = [];
    while (keys.length < quantity) {
        const key = generateKey();
        const exists = await existingChecker(key);
        if (!exists && !keys.includes(key))
            keys.push(key);
    }
    return keys;
}
//# sourceMappingURL=keyGenerator.js.map