import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import { addComponentSchema } from "../utils/validations/components";
import { verifyUser } from "../utils/helpers/auth";
import { ApiResponse } from "../utils/apiResponse";
import { APIError } from "../utils/apiError";
import { Component, User } from "../db/model";

export const addComponent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = verifyUser(req);
    const parsedData = addComponentSchema.parse(req.body);
    const comp = await Component.create({
      ...parsedData,
      userId: user.Id,
    });

    return res.json(
      new ApiResponse({
        data: { responseData: comp },
        metadata: { code: 200, message: "Component created successfully" },
      })
    );
  }
);

export const getAllComponents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = verifyUser(req);
    const components = await Component.findAll({
      where: {
        isActive: true,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["Id", "name", "email"],
        },
      ],
    });

    return res.json(new ApiResponse({ data: { responseData: components } }));
  }
);
