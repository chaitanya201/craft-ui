import express, { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { APIError } from "../utils/apiError";
import User from "../db/model/user.model";
import { ApiResponse } from "../utils/apiResponse";

export const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
      method: "Login",
    });
  }
);

export const registerController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const createdUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res
      .status(200)
      .json(new ApiResponse({ data: { responseData: createdUser } }));
  }
);
