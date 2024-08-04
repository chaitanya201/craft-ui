import express, { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { APIError } from "../utils/apiError";
import User from "../db/model/user.model";
import { ApiResponse } from "../utils/apiResponse";
import { loginSchema, registerSchema } from "../utils/validations/auth";
import {
  compareHash,
  generateHash,
  generateJWTToken,
} from "../utils/helpers/auth";

export const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = loginSchema.parse(req.body);
    const isUserExists = await User.findOne({
      where: {
        email: parsedData.email,
      },
    });
    if (!isUserExists) {
      throw new APIError("User not found", 404);
    }
    if (
      !compareHash({
        value: parsedData.password,
        hash: isUserExists.dataValues.password,
      })
    ) {
      throw new APIError("Invalid email or password", 404);
    }

    const token = generateJWTToken({ data: isUserExists.dataValues });
    return res.status(200).json(
      new ApiResponse({
        data: {
          responseData: {
            user: isUserExists,
            token,
          },
        },
      })
    );
  }
);

export const registerController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedBody = registerSchema.parse(req.body);

    const hashedPassword = generateHash(parsedBody.password);
    const createdUser = await User.create({
      name: parsedBody.name,
      email: parsedBody.email,
      password: hashedPassword,
    });

    return res
      .status(200)
      .json(new ApiResponse({ data: { responseData: createdUser } }));
  }
);
