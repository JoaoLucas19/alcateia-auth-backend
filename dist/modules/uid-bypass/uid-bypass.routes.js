"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uid_bypass_controller_1 = require("./uid-bypass.controller");
/** Compatível com painel TOXIC UID BYPASS (hostron/gtccheats) */
const router = (0, express_1.Router)();
router.get("/add", uid_bypass_controller_1.uidAdd);
router.get("/remove", uid_bypass_controller_1.uidRemove);
router.get("/check", uid_bypass_controller_1.uidCheck);
exports.default = router;
//# sourceMappingURL=uid-bypass.routes.js.map