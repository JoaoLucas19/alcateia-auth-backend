"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const client_schemas_1 = require("./client.schemas");
const client_controller_1 = require("./client.controller");
const router = (0, express_1.Router)();
router.use(auth_middleware_1.authMiddleware);
// Rotas fixas antes de /:id
router.get("/by-discord/:discordId", client_controller_1.getByDiscord);
router.get("/by-key/:keyValue", client_controller_1.getByKey);
router.get("/by-username/:username", client_controller_1.getByUsername);
router.post("/reset-hwid", (0, validate_middleware_1.validate)(client_schemas_1.clientLookupSchema), client_controller_1.resetHwidLookup);
router.post("/change-password", (0, validate_middleware_1.validate)(client_schemas_1.changePasswordSchema), client_controller_1.changePasswordLookup);
router.post("/link-discord", (0, validate_middleware_1.validate)(client_schemas_1.linkDiscordLookupSchema), client_controller_1.linkDiscordLookup);
router.get("/", client_controller_1.list);
router.get("/:id", client_controller_1.getOne);
router.patch("/:id/password", (0, validate_middleware_1.validate)(client_schemas_1.patchPasswordSchema), client_controller_1.changePassword);
router.patch("/:id/discord", (0, validate_middleware_1.validate)(client_schemas_1.patchDiscordSchema), client_controller_1.patchDiscord);
router.delete("/:id/discord", client_controller_1.unlinkDiscord);
router.post("/:id/ban", client_controller_1.ban);
router.post("/:id/unban", client_controller_1.unban);
router.post("/:id/reset-hwid", client_controller_1.resetHwid);
router.delete("/:id", client_controller_1.remove);
exports.default = router;
//# sourceMappingURL=client.routes.js.map