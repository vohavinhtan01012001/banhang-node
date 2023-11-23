import {
  CreatePromotionType,
  UpdatePromotionType,
} from "../types/promotionType";
import Promotion from "../models/Promotion";
import Product from "../models/Product";
import { Op } from "sequelize";

export const createPromotionService = async (
  payload: CreatePromotionType
): Promise<Promotion> => {
  try {
    const promotion = await Promotion.create({
      title: payload.title,
      discount: payload.discount,
      startDate: payload.startDate,
      endDate: payload.endDate,
      status: payload.status,
    });
    return promotion;
  } catch (error) {
    throw error;
  }
};

export const getAllPromotionService = async () => {
  const promotion = await Promotion.findAll();
  return promotion;
};

export const updateStatusPromotionService = async (
  promotionId: number,
  status: number
) => {
  try {
    if (!promotionId) {
      throw new Error("Promotion ID not found");
    }
    if (status == 0 || status == 1) {
      await Promotion.update(
        { status: status },
        { where: { id: promotionId } }
      );
      const promotion = await Promotion.findOne({
        where: { id: promotionId },
      });
      if (!promotion) {
        throw new Error("Promotion not found after update");
      }
      return promotion;
    }
    throw new Error("Promotion status not found");
  } catch (error) {
    throw error;
  }
};

export const updatePromotionService = async (
  id: number,
  payload: UpdatePromotionType
) => {
  try {
    if (!payload) {
      throw new Error("Please provide promotion data to update");
    }
    if (!id) {
      throw new Error("id not found");
    }
    const promotionById = await Promotion.findOne({ where: { id: id } });
    if (!promotionById) {
      throw new Error("Promtion not found");
    }
    const promotion = await Promotion.update(
      {
        title: payload.title,
        discount: payload.discount,
        startDate: payload.startDate,
        endDate: payload.endDate,
        status: payload.status,
      },
      { where: { id: id } }
    );
    const numberOfAffectedRows = promotion[0];
    if (numberOfAffectedRows > 0) {
      const updatedPromotionData = await Promotion.findOne({
        where: { id: id },
      });
      if (updatedPromotionData) {
        return updatedPromotionData;
      } else {
        throw new Error("Failed to fetch updated promotion data");
      }
    } else {
      throw new Error("Failed to update promotion");
    }
  } catch (error) {
    throw error;
  }
};

export const deletePromotionService = async (promotionId: number) => {
  if (!promotionId) {
    throw new Error("Please product id to delete");
  }
  if (promotionId && isNaN(promotionId)) {
    throw new Error("Invalid product id");
  }
  const promotion = await Promotion.findOne({ where: { id: promotionId } });
  if (!promotion) {
    throw new Error("Product not found");
  }
  return Promotion.destroy({
    where: { id: promotionId },
  });
};

export const addPromotionProService = async (promotionId: number, checkList: any[]) => {
  try {
    if (!promotionId) {
      throw new Error("Promotion not found");
    }
    if (checkList.length > 0) {
      throw new Error("Promotion already added");
    }
    for (let i = 0; i < checkList.length; i++) {
      await Product.update(
        { promotionId: promotionId },
        {
          where: {
            id: checkList[i],
          },
        }
      );
    }
  } catch (error) {
    throw error;
  }
};
