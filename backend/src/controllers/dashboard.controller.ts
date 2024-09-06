import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { ApiResponse } from "../utils/apiResponse";
import { APIError } from "../utils/apiError";
import { verifyUser } from "../utils/helpers/auth";

const dashboardController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = verifyUser(req);
    return res
      .status(200)
      .json(new ApiResponse({ data: { responseData: user } }));
  }
);

export default dashboardController;
