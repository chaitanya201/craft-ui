import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import dashboardController from "../controllers/dashboard.controller";

const dashboardRoutes = Router();

dashboardRoutes.get("/dashboard", authMiddleware, dashboardController);

export default dashboardRoutes;
