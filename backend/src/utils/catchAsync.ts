import { NextFunction, Request, Response } from "express";

export const catchAsync = (
  callback: (req: Request, res: Response, next: NextFunction) => any
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    callback(req, res, next).catch(next);
  };
};
