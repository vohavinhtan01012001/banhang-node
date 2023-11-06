import { NextFunction, Request, Response } from "express";
import { ApiError } from "../util/ApiError";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getByIdProduct,
  updateProduct,
} from "../services/productService";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body;
    await createProduct(product);
    res.status(200).json({
      msg: "Product created successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const listProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProduct();
    res.status(200).json({
      products: products,
    });
  } catch (err) {
    next(err);
  }
};

export const productById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const productId = await getByIdProduct(id);
    res.status(200).json({
      product: productId,
    });
  } catch (error) {
    next(error);
  }
};

export const productUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const product = await updateProduct(req.body, id);
    res.status(200).json({
      product: product,
      msg: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const desProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const product = await deleteProduct(id);
    res.status(200).json({
      product: product,
      msg: "Product delete successfully",
    });
  } catch (error) {
    next(error);
  }
};
