import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import dashboardController from "../controllers/dashboard.controller";

const dashboardRoutes = Router();

dashboardRoutes.get("/user", authMiddleware, dashboardController);

export default dashboardRoutes;
