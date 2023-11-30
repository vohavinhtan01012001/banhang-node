import { NextFunction, Request, Response } from "express";
import { ApiError } from "../util/ApiError";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getByIdCategory,
  updateCategory,
} from "../services/categoryService";
import { ApiResponse } from "customDefinition";

export const addCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = req.body;
    const createdCategory = await createCategory(category);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Category created successfully",
    };
    res.status(200).json({ status: response, category: createdCategory });
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
    const id = parseInt(req.params.id);
    const categoryId = await getByIdCategory(id);
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
    const id = parseInt(req.params.id);
    const category = await updateCategory(req.body, id);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Category updated successfully!",
    };
    res.status(200).json({
      status: response,
      category: category,
    });
  } catch (error) {
    next(error);
  }
};

export const desCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const category = await deleteCategory(id);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Category delete successfully!",
    };
    res.status(200).json({
      category: category,
      status: response,
    });
  } catch (error) {
    next(error);
  }
};

//client
export const listCategoryClient = async (
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

