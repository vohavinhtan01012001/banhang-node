import { NextFunction, Request, Response } from "express";
import { ApiError } from "../util/ApiError";
import {
  createCategory,
  getAllCategory,
  getByIdCategory,
  updateCategory,
} from "../services/categoryService";

export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.body;
    await createCategory(category);
    res.status(200).json({
      msg: "Category created successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const listCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await getAllCategory();
    res.status(200).json({
      category: categories,
    });
  } catch (error) {
    next(error);
  }
};

export const categoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categoryId = await getByIdCategory(req.params.id);
    res.status(200).json({
      category: categoryId,
    });
  } catch (error) {
    next(error);
  }
};

export const categoryUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await updateCategory(req.body);
    if (category == null) {
      throw new ApiError(404, "Category not found");
    }
    res.status(200).json({
      msg: "Category updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
