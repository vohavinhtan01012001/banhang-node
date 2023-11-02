import { NextFunction, Request, Response } from "express";
import { createProduct } from "../services/productService";

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
