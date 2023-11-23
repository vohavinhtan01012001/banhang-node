import { ApiResponse } from "customDefinition";
import { NextFunction, Request, Response } from "express";
import {
  addPromotionProService,
  createPromotionService,
  deletePromotionService,
  getAllPromotionService,
  updatePromotionService,
  updateStatusPromotionService,
} from "../services/promotionService";

export const addPromotion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const promotion = req.body;
    const createdPromotion = await createPromotionService(promotion);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Promotion created successfully",
    };
    res.status(200).json({ status: response, promotion: createdPromotion });
  } catch (err) {
    next(err);
  }
};

export const listPromotion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const promotions = await getAllPromotionService();
    res.status(200).json({
      promotion: promotions,
    });
  } catch (error) {
    next(error);
  }
};

export const updateStatusPromotion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const status = req.body.status;
    const promotion = await updateStatusPromotionService(id, status);
    const response: ApiResponse = {
      statusCode: 1,
      message: `${promotion.title} ${
        promotion.status == 1 ? "activity" : "pause"
      } successfully`,
    };
    res.status(200).json({ status: response });
  } catch (error) {
    next(error);
  }
};

export const updatePromotion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const promotion = req.body;
    const updatePromotion = await updatePromotionService(id, promotion);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Promotion update successfully",
    };
    res.status(200).json({ status: response, promotion: updatePromotion });
  } catch (error) {
    next(error);
  }
};

export const desPromotion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    await deletePromotionService(id);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Promotion delete successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const addProductInPromotion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const checkList: any[] = req.body;
    const id = parseInt(req.params.id);
    await addPromotionProService(id, checkList);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Promotion add Product successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};