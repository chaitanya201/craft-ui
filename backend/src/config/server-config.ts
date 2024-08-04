import dotenv from "dotenv";

dotenv.config();

export const CURRENT_ENV = process.env.NODE_ENV;

export const CONFIG = {
  CURRENT_ENV,
  SERVER_PORT: process.env.SERVER_PORT,
  JWT_SECRETE: process.env.JWT_SECRETE || "",
};

export interface apiResponse {
  metadata: {
    code: number;
    message: string;
  };
  data: {
    message: string;
    responseData: any;
  };
}
