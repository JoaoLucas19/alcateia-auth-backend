import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { banHwidSchema, unbanHwidByValueSchema } from "./banned-hwid.schemas";
import { list, create, removeById, removeByHwid } from "./banned-hwid.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", list);
router.post("/", validate(banHwidSchema), create);
router.post("/remove", validate(unbanHwidByValueSchema), removeByHwid);
router.delete("/:id", removeById);

export default router;
