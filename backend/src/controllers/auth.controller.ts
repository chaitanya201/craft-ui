import express, { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { APIError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { loginSchema, registerSchema } from "../utils/validations/auth";
import {
  compareHash,
  generateHash,
  generateJWTToken,
  verifyUser,
} from "../utils/helpers/auth";
import { User } from "../db/model";
import { v4 as uuidv4 } from "uuid";
import { getRedisClient } from "../db/redis-config";

export const loginController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parsedData = loginSchema.parse(req.body);
    const isUserExists = await User.findOne({
      where: {
        email: parsedData.email,
      },
      attributes: {
        exclude: ["isActive", "createdAt", "updatedAt"],
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

    const { password, ...rest } = isUserExists.dataValues;
    const sessionId = uuidv4();

    const token = generateJWTToken({ data: sessionId, expiresIn: "59min" });
    isUserExists.set("sessionId", sessionId);
    await isUserExists.save();
    const redisClient = getRedisClient();
    await redisClient.set(sessionId, JSON.stringify(rest));
    return res.status(200).json(
      new ApiResponse({
        data: {
          responseData: {
            user: rest,
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
    const sessionId = uuidv4();
    const createdUser = await User.create({
      name: parsedBody.name,
      email: parsedBody.email,
      password: hashedPassword,
      sessionId,
    });
    const token = generateJWTToken({ data: sessionId });

    return res.status(200).json(
      new ApiResponse({
        data: { responseData: { ...createdUser.dataValues, token } },
      })
    );
  }
);

export const logoutController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = verifyUser(req);
    const redisClient = getRedisClient();
    await redisClient.del(user.sessionId);

    return res.json(
      new ApiResponse({ metadata: { code: 200, message: "Logout successful" } })
    );
  }
);
