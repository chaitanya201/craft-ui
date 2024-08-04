import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { ApiResponse } from "../utils/apiResponse";

const dashboardController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    return res
      .status(200)
      .json(new ApiResponse({ data: { responseData: user } }));
  }
);

export default dashboardController;
