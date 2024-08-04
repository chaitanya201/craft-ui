import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { APIError } from "../utils/apiError";
import { verifyJWTToken } from "../utils/helpers/auth";

const authMiddleware = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["x-auth-token"];
    if (!token || token instanceof Array) {
      throw new APIError("Unauthorized user", 401);
    }

    const data = verifyJWTToken({ token });

    (req as any).user = data;
    return next();
  }
);

export default authMiddleware;
