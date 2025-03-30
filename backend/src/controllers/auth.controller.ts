import express, { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync";
import { APIError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
import { loginSchema, registerSchema } from "../utils/validations/auth";
import {
  compareHash,
  generateAccessToken,
  generateHash,
  handleUserAuthentication,
  verifyRedirectionToken,
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

    const { accessToken, refreshToken, user } = await handleUserAuthentication({
      res,
      user: isUserExists,
    });
    return res.status(200).json(
      new ApiResponse({
        data: {
          responseData: {
            user,
            accessToken,
            refreshToken,
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
    const { accessToken, refreshToken, sessionId, user } =
      await handleUserAuthentication({ res, user: createdUser });

    return res.status(200).json(
      new ApiResponse({
        data: {
          responseData: { user, accessToken, refreshToken, sessionId },
        },
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

export const redirectionVerificationController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new APIError("Token not found", 403);
    }
    const verifiedData = await verifyRedirectionToken({ token });
    console.log("verified data", verifiedData);
    const sessionIdFromToken =
      typeof verifiedData === "string" ? verifiedData : verifiedData?.data;
    const isUserExists = await User.findOne({
      where: {
        redirectionToken: token,
        isActive: 1,
        sessionId: sessionIdFromToken,
      },
    });
    if (!isUserExists) {
      throw new APIError("User not found", 404);
    }
    const { accessToken, refreshToken, sessionId, user } =
      await handleUserAuthentication({ res, user: isUserExists });
    return res.json(
      new ApiResponse({
        metadata: { code: 200, message: "Verification successful" },
        data: {
          responseData: {
            user: user,
            accessToken,
          },
        },
      })
    );
  }
);
