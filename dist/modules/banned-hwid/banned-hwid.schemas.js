"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unbanHwidByValueSchema = exports.banHwidSchema = void 0;
const zod_1 = require("zod");
exports.banHwidSchema = zod_1.z.object({
    hwid: zod_1.z.string().min(1, "HWID obrigatório").max(256),
    reason: zod_1.z.string().max(500).optional(),
});
exports.unbanHwidByValueSchema = zod_1.z.object({
    hwid: zod_1.z.string().min(1).max(256),
});
//# sourceMappingURL=banned-hwid.schemas.js.map