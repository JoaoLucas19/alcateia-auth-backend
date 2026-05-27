"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const banned_hwid_schemas_1 = require("./banned-hwid.schemas");
const banned_hwid_controller_1 = require("./banned-hwid.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
router.get("/", banned_hwid_controller_1.list);
router.post("/", (0, validate_middleware_1.validate)(banned_hwid_schemas_1.banHwidSchema), banned_hwid_controller_1.create);
router.post("/remove", (0, validate_middleware_1.validate)(banned_hwid_schemas_1.unbanHwidByValueSchema), banned_hwid_controller_1.removeByHwid);
router.delete("/:id", banned_hwid_controller_1.removeById);
exports.default = router;
//# sourceMappingURL=banned-hwid.routes.js.map