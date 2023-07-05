import { Router } from "express";
import { validateSchema } from "../middlewares/validator.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post(
  "/register",
  validateSchema(registerSchema),
  authController.register
);
router.post("/login", validateSchema(loginSchema), authController.login);
router.post("/logout", authController.logout);
router.get("/verify", authController.verifyToken);

export default router;
