import { Router } from "express";
import { validateSchema } from "../middlewares/validator.js";
import { createBiteSchema } from "../schemas/bite.schema.js";
import { authRequired } from "../middlewares/verifyToken.js";

import * as biteController from "../controllers/bite.controller.js";

const router = Router();

// Public
router.get("/u/:username", biteController.getUserPublicBites);

router.use(authRequired);
// Private
router.get("/", biteController.getBites);
router.get("/:id", biteController.getBite);
router.post("/", validateSchema(createBiteSchema), biteController.createBite);
router.put("/:id", biteController.updatebite);
router.delete("/:id", biteController.deleteBite);

export default router;
