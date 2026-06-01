import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import {
  changePasswordSchema,
  clientLookupSchema,
  linkDiscordLookupSchema,
  patchDiscordSchema,
  patchPasswordSchema,
} from "./client.schemas";
import {
  list,
  getOne,
  getByDiscord,
  getByKey,
  getByUsername,
  ban,
  unban,
  resetHwid,
  resetHwidLookup,
  changePassword,
  changePasswordLookup,
  patchDiscord,
  linkDiscordLookup,
  unlinkDiscord,
  remove,
  summary,
  repairHwids,
} from "./client.controller";

const router = Router();

router.use(authMiddleware);

// Rotas fixas antes de /:id
router.get("/by-discord/:discordId", getByDiscord);
router.get("/by-key/:keyValue", getByKey);
router.get("/by-username/:username", getByUsername);

router.post("/reset-hwid", validate(clientLookupSchema), resetHwidLookup);
router.post(
  "/change-password",
  validate(changePasswordSchema),
  changePasswordLookup
);
router.post("/link-discord", validate(linkDiscordLookupSchema), linkDiscordLookup);

router.get("/summary", summary);
router.post("/repair-hwids", repairHwids);

router.get("/", list);
router.get("/:id", getOne);

router.patch("/:id/password", validate(patchPasswordSchema), changePassword);
router.patch("/:id/discord", validate(patchDiscordSchema), patchDiscord);
router.delete("/:id/discord", unlinkDiscord);

router.post("/:id/ban", ban);
router.post("/:id/unban", unban);
router.post("/:id/reset-hwid", resetHwid);
router.delete("/:id", remove);

export default router;
