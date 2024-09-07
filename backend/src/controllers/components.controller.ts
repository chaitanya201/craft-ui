import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import {
  addComponentSchema,
  searchComponentSchema,
} from "../utils/validations/components";
import { verifyUser } from "../utils/helpers/auth";
import { ApiResponse } from "../utils/apiResponse";
import { APIError } from "../utils/apiError";
import { Component, User } from "../db/model";
import { Op } from "sequelize";

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
    const componentId = req.query.componentId;

    if (componentId) {
      const component = await Component.findOne({
        where: {
          Id: Number(componentId),
        },
        include: [
          { model: User, attributes: ["Id", "name", "email"], as: "user" },
        ],
      });
      return res.json(
        new ApiResponse({ data: { responseData: { component } } })
      );
    }

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

export const searchComponent = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const parseData = searchComponentSchema.parse(req.query);
    const components = await Component.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${parseData.searchText}%` } },
          { description: { [Op.like]: `%${parseData.searchText}%` } },
        ],
      },
    });
    return res.json(new ApiResponse({ data: { responseData: components } }));
  }
);
