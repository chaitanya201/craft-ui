import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  addComponent,
  getAllComponents,
} from "../controllers/components.controller";
const componentRouter = Router();

componentRouter.post("/add", authMiddleware, addComponent);
componentRouter.get("/all", authMiddleware, getAllComponents);

export default componentRouter;
