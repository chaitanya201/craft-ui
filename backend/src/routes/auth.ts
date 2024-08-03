import { Router } from "express";
import { loginController } from "../controllers/auth.controller";

export const authRouter = Router()

authRouter.get('/login',loginController)

