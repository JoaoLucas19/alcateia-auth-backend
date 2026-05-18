"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateKeyValue = generateKeyValue;
exports.generateUniqueKeys = generateUniqueKeys;
const crypto_1 = __importDefault(require("crypto"));
function generateSegment() {
    // Gera 4 dígitos numéricos aleatórios (1000–9999)
    const num = 1000 + (crypto_1.default.randomBytes(2).readUInt16BE(0) % 9000);
    return num.toString();
}
function generateKeyValue() {
    return `ALCATEIA-${generateSegment()}-${generateSegment()}`;
}
async function generateUniqueKeys(quantity, existingChecker) {
    const keys = [];
    while (keys.length < quantity) {
        const key = generateKeyValue();
        const exists = await existingChecker(key);
        if (!exists && !keys.includes(key))
            keys.push(key);
    }
    return keys;
}
//# sourceMappingURL=keyGenerator.js.map