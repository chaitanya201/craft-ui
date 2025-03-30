import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { ApiResponse } from "../utils/apiResponse";
import {
  createOAuthClient,
  generateClientAuthUrl,
  getGoogleUser,
  verifyClientCode,
} from "../config/google/oauth";
import { CONFIG } from "../config/server-config";
import axios from "axios";
import {
  checkIfUserExistsOrCreateOne,
  generateRedirectionToken,
} from "../utils/helpers/auth";

export const gmailAuthURLController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const oauth = await createOAuthClient();
    const authURL = await generateClientAuthUrl(oauth);
    const success = new ApiResponse({ data: { responseData: authURL } });
    res.status(200).json(success);
  }
);

export const googleCallbackHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const code = req.query.code as string;
    if (!code) {
      throw next(new Error("Code not found"));
    }
    const oauth = await createOAuthClient();
    const tokens = await verifyClientCode(oauth, code);
    oauth.setCredentials(tokens);

    const googleUser = await getGoogleUser({
      accessToken: tokens.access_token,
    });

    const localUser = await checkIfUserExistsOrCreateOne({
      email: googleUser.email,
      name: googleUser.name,
      source: "google",
    });

    console.log("local user", localUser.dataValues);
    const redirectionToken = await generateRedirectionToken({
      user: localUser,
    });
    localUser.set("redirectionToken", redirectionToken);
    await localUser.save();
    console.log("final user", localUser.dataValues);
    res
      .status(200)
      .redirect(`${CONFIG.CLIENT_URL}/verify?token=${redirectionToken}`);
    return;
  } catch (error) {
    console.log("Error while authenticating google user", error);
    res.status(500);
    return;
  }
};
