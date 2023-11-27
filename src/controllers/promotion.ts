import { ApiResponse } from "customDefinition";
import { NextFunction, Request, Response } from "express";
import Product from "../models/Product";
import {
  addPromotionProService,
  createPromotionService,
  deleteProductInPromotionService,
  deletePromotionService,
  getAllPromotionService,
  getListAddProductService,
  getProductListOfPromotion,
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
    console.log(checkList);
    const id = parseInt(req.params.id);
    const { promotion, product } = await addPromotionProService(id, checkList);
    const response: ApiResponse = {
      statusCode: 1,
      message: `Promotion ${promotion.title} add Product successfully`,
    };
    res.status(200).json({ status: response, product: product });
  } catch (error) {
    next(error);
  }
};

export const getListProductPro = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const promotionId = parseInt(req.params.id);
    const getListProduct = await getProductListOfPromotion(promotionId);
    res.status(200).json({ product: getListProduct });
  } catch (error) {
    next(error);
  }
};

export const getListAddProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const promotionId = parseInt(req.params.id);
    const getListProduct = await getListAddProductService(promotionId);
    res.status(200).json({ product: getListProduct });
  } catch (error) {
    next(error);
  }
};

export const desProductInPromotion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const productData: Product = await deleteProductInPromotionService(id);
    const response: ApiResponse = {
      statusCode: 1,
      message: `${productData.name} has been removed from promotion`,
    };
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
