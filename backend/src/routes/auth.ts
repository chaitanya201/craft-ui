import { Router } from "express";
import {
  loginController,
  logoutController,
  registerController,
} from "../controllers/auth.controller";
import authMiddleware from "../middlewares/auth.middleware";

const authRouter = Router();

authRouter.post("/login", loginController);
authRouter.post("/register", registerController);
authRouter.post("/logout", authMiddleware, logoutController);

export { authRouter };
