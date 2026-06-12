import { Router } from "express";
import { uidAdd, uidCheck, uidRemove } from "./uid-bypass.controller";

/** Compatível com painel TOXIC UID BYPASS (hostron/gtccheats) */
const router = Router();

router.get("/add", uidAdd);
router.get("/remove", uidRemove);
router.get("/check", uidCheck);

export default router;
