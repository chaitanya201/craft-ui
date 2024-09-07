import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  addComponent,
  getAllComponents,
  searchComponent,
} from "../controllers/components.controller";
const componentRouter = Router();

componentRouter.post("/add", authMiddleware, addComponent);
componentRouter.get("/all", authMiddleware, getAllComponents);
componentRouter.get("/search", authMiddleware, searchComponent);

export default componentRouter;
