import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CONFIG } from "../../config/server-config";
import { APIError } from "../apiError";
import { Request } from "express";

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

export const generateJWTToken = ({
  data,
  expiresIn = "59mins",
}: {
  data: string;
  expiresIn?: string | number;
}) => {
  const token = jwt.sign({ data }, CONFIG.JWT_SECRETE, { expiresIn });
  return token;
};

export const verifyJWTToken = ({ token }: { token: string }) => {
  const data = jwt.verify(token, CONFIG.JWT_SECRETE);
  return data;
};

export const verifyUser = (req: Request) => {
  const user = req.headers["userInfo"];
  if (!user || user instanceof Array) {
    throw new APIError("Invalid user", 403);
  }
  const parsedUser = JSON.parse(user);
  return parsedUser;
};
