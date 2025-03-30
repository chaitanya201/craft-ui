import { Router } from "express";
import {
  loginController,
  logoutController,
  redirectionVerificationController,
  registerController,
} from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post("/verify", redirectionVerificationController);
authRouter.post("/logout", authMiddleware, logoutController);

export { authRouter };
