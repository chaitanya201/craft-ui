import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { ApiResponse } from "../utils/apiResponse";
import {
  createOAuthClient,
  generateClientAuthUrl,
  verifyClientCode,
} from "../config/google/oauth";

export const gmailAuthURLController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const oauth = await createOAuthClient();
    const authURL = await generateClientAuthUrl(oauth);
    const success = new ApiResponse({ data: { responseData: authURL } });
    res.status(200).json(success);
  }
);

export const googleCallbackHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const code = req.query.code as string;
    if (!code) {
      throw next(new Error("Code not found"));
    }
    const oauth = await createOAuthClient();
    await verifyClientCode(oauth, code);
    const success = new ApiResponse({
      data: { message: "Token verified successfully", responseData: null },
    });
    res.status(200).json(success);
    return;
  }
);
