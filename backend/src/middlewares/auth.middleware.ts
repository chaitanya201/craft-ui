import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { APIError } from "../utils/apiError";
import { verifyJWTToken } from "../utils/helpers/auth";
import { getRedisClient } from "../db/redis-config";

const authMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-auth-token"];
    if (!token || token instanceof Array) {
      throw new APIError("Unauthorized user", 401);
    }

    const data: any = verifyJWTToken({ token });
    const redisClient = getRedisClient();

    let sessionId;
    if (data instanceof String) {
      sessionId = data;
    } else {
      sessionId = data.data;
    }
    const userData = await redisClient.get(sessionId);
    if (!userData) {
      throw new Error("User not found.");
    }
    req.headers["userInfo"] = JSON.stringify({
      ...JSON.parse(userData),
      sessionId,
    });

    return next();
  }
);

export default authMiddleware;
