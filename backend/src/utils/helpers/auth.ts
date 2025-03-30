import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { CONFIG } from "../../config/server-config";
import { APIError } from "../apiError";
import { Request, Response } from "express";
import { User } from "../../db/model";
import { getRedisClient } from "../../db/redis-config";
import { v4 as uuidv4 } from "uuid";

export const generateHash = (val: string) => {
  const salt = bcrypt.genSaltSync();
  const hashedItem = bcrypt.hashSync(val, salt);
  return hashedItem;
};

export const compareHash = ({
  value,
  hash,
}: {
  value: string;
  hash: string;
}) => {
  const result = bcrypt.compareSync(value, hash);
  return result;
};

export const generateSessionId = () => {
  const sessionId = uuidv4();
  return sessionId;
};

const generateJWTToken = ({
  data,
  expiresIn = "59mins",
  secret,
}: {
  data: string;
  expiresIn?: SignOptions["expiresIn"];
  secret: string;
}) => {
  const token = jwt.sign({ data }, secret, { expiresIn });
  return token;
};

export const generateAccessToken = ({ data }: { data: string }) => {
  const token = generateJWTToken({
    data,
    expiresIn: "1h",
    secret: CONFIG.JWT_ACCESS_SECRETE,
  });
  return token;
};

export const generateRefreshToken = ({ data }: { data: string }) => {
  const token = generateJWTToken({
    data,
    expiresIn: "3h",
    secret: CONFIG.JWT_REFRESH_SECRETE,
  });
  return token;
};

const verifyJWTToken = ({
  token,
  secret,
}: {
  token: string;
  secret: string;
}) => {
  const data = jwt.verify(token, secret);
  return data;
};

export const verifyAccessToken = ({ token }: { token: string }) => {
  const data = verifyJWTToken({ token, secret: CONFIG.JWT_ACCESS_SECRETE });
  if (!data) {
    throw new APIError("Invalid access token", 401);
  }
  return data;
};

export const verifyRefreshToken = ({ token }: { token: string }) => {
  const data = verifyJWTToken({ token, secret: CONFIG.JWT_REFRESH_SECRETE });
  if (!data) {
    throw new APIError("Invalid refresh token", 401);
  }
  return data;
};

export const handleUserAuthentication = async ({
  user,
  res,
}: {
  user: User;
  res: Response;
}) => {
  const sessionId = uuidv4();
  const accessToken = generateAccessToken({ data: sessionId });
  const refreshToken = generateRefreshToken({
    data: sessionId,
  });
  const { password, ...rest } = user.dataValues;
  user.set("sessionId", sessionId);
  await user.save();
  await saveToRedis({
    key: user.dataValues.sessionId,
    value: JSON.stringify({ ...rest, refreshToken }),
  });
  setAuthCookies({
    res,
    accessToken,
    refreshToken,
  });

  return { accessToken, refreshToken, sessionId, user };
};

const setAuthCookies = ({
  res,
  accessToken,
  refreshToken,
}: {
  res: Response;
  accessToken: string;
  refreshToken: string;
}) => {
  const oneHr = 60 * 60 * 1000;
  const threeHr = 3 * oneHr;
  res.cookie("accessToken", accessToken, {
    maxAge: oneHr,
    secure: true,
    sameSite: "lax",
  });
  res.cookie("refreshToken", refreshToken, {
    maxAge: threeHr,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
  });
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("accessToken", { httpOnly: true, secure: true, maxAge: 0 });
  res.clearCookie("refreshToken", { httpOnly: true, secure: true, maxAge: 0 });
};

export const saveToRedis = async ({
  key,
  value,
  expiry = 60 * 60 * 3,
}: {
  key: string;
  value: string;
  expiry?: number;
}) => {
  const redisClient = getRedisClient();
  redisClient.set(key, value, "EX", expiry); // 3 hrs expiry
};

export const verifyUser = (req: Request) => {
  const user = req.headers["userInfo"];
  if (!user || user instanceof Array) {
    throw new APIError("Invalid user", 403);
  }
  const parsedUser = JSON.parse(user);
  return parsedUser;
};

export const checkIfUserExistsOrCreateOne = async ({
  email,
  source,
  name,
}: {
  email: string;
  source: "local" | "google" | "github";
  name: string;
}) => {
  const sessionId = generateSessionId();
  const [user] = await User.findOrCreate({
    where: { email, source, isActive: 1 },
    defaults: {
      name,
      email,
      source,
      sessionId,
      isVerified: true,
    },
  });
  return user;
};

export const generateRedirectionToken = async ({ user }: { user: User }) => {
  const sessionId = user.dataValues.sessionId || generateSessionId();
  const redirectionToken = generateJWTToken({
    data: sessionId,
    secret: CONFIG.JWT_REDIRECTION_SECRETE,
    expiresIn: "5min",
  });
  return redirectionToken;
};

export const verifyRedirectionToken = async ({ token }: { token: string }) => {
  const data = verifyJWTToken({
    token,
    secret: CONFIG.JWT_REDIRECTION_SECRETE,
  });
  if (!data) {
    throw new APIError("Invalid redirection token", 401);
  }
  return data;
};
