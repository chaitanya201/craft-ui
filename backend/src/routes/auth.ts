import { Router } from "express";
import {
  loginController,
  registerController,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.get("/login", loginController);
authRouter.post("/register", registerController);

export { authRouter };
