import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

import { ValidationError, BaseError, DatabaseError } from "sequelize";
import { apiResponse, CONFIG } from "./config/server-config";
import { APIError } from "./utils/apiError";
import { authRouter } from "./routes/auth";

const app = express();

import "./db/sequelize-config";
import { ZodError } from "zod";
import dashboardRoutes from "./routes/dashboard";
import { initRedis } from "./db/redis-config";
import componentRouter from "./routes/component";

app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(`/auth`, authRouter);
app.use(`/user`, dashboardRoutes);
app.use(`/component`, componentRouter);

initRedis();

app.all("*", (req, res, next) => {
  const msg = `${req.method} is not available for this server`;
  next(new APIError(msg, 500)); // Pass an Error object to next
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("error in final middleware ", err);
  if (err instanceof APIError) {
    const response: apiResponse = {
      metadata: { code: err.errorCode, message: err.message },
      data: { message: "", responseData: null },
    };
    res.status(err.errorCode).json(response);
  } else if (err instanceof TokenExpiredError) {
    res.status(401).json({
      metadata: { code: 401, message: "Session Expired. Login Again" },
      data: { message: "Session Expired", responseData: null },
    });
  } else if (err instanceof JsonWebTokenError) {
    res.status(500).json({
      metadata: { code: 500, message: err.message },
      data: { message: "Internal Server Error", responseData: null },
    });
  } else if (err instanceof ZodError) {
    res.status(500).json({
      metadata: { code: 500, message: err.errors?.[0].message },
      data: { message: "Internal Server Error", responseData: null },
    });
  } else if (err instanceof ValidationError) {
    res.status(500).json({
      metadata: { code: 500, message: err.errors[0].message },
      data: { message: "Internal Server Error", responseData: null },
    });
  } else if (err instanceof DatabaseError) {
    res.status(500).json({
      metadata: { code: 500, message: err.message },
      data: { message: "Internal Server Error", responseData: null },
    });
  } else if (err instanceof BaseError) {
    res.status(500).json({
      metadata: { code: 500, message: err.message },
      data: { message: "Internal Server Error", responseData: null },
    });
  } else {
    res.status(500).json({
      metadata: { code: 500, message: err.message },
      data: { message: "Internal Server Error", responseData: null },
    });
  }
});

app.listen(CONFIG.SERVER_PORT, () => {
  console.log("server started on port ", CONFIG.SERVER_PORT);
});
