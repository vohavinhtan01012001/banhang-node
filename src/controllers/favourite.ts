import { NextFunction, Request, Response } from "express";
import {
  getFavouriteService,
  updateFavouriteService,
} from "../services/FavouriteService";
import { ApiResponse, customRequest } from "customDefinition";

export const addFavourite = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const productGroupId: number = parseInt(req.body.productGroupId);
    const userId: number = parseInt(req.user.id);
    const createdFavourite = await updateFavouriteService({
      productGroupId,
      userId,
    });
    const response: ApiResponse = {
      statusCode: 1,
      message: "Favourite created successfully",
    };
    res.status(200).json({ status: response, favourite: createdFavourite });
  } catch (err) {
    next(err);
  }
};

export const getFavourite = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const productGroupId: number = parseInt(req.params.id);
    const userId: number = parseInt(req.user.id);
    const checkFavourite = await getFavouriteService({
      productGroupId,
      userId,
    });
    const response: ApiResponse = {
      statusCode: 1,
      message: "Favourite created successfully",
    };
    res.status(200).json({ status: response, favourite: checkFavourite });
  } catch (err) {
    next(err);
  }
};
