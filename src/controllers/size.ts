import { ApiResponse } from "customDefinition";
import { NextFunction, Request, Response } from "express";
import { createSize, deleteSize, getAllSize } from "../services/sizeService";

export const addSize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const size = req.body;
    const createSizes = await createSize(size);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Size created successfully",
    };
    res.status(200).json({ status: response, size: createSizes });
  } catch (err) {
    next(err);
  }
};
export const listSize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sizes = await getAllSize();
    res.status(200).json({
      sizes: sizes,
    });
  } catch (error) {
    next(error);
  }
};

export const desSize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const size = await deleteSize(id);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Size delete successfully!",
    };
    res.status(200).json({
      size: size,
      status: response,
    });
  } catch (error) {
    next(error);
  }
};

export const showSizeInProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const size = await deleteSize(id);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Size delete successfully!",
    };
    res.status(200).json({
      size: size,
      status: response,
    });
  } catch (error) {
    next(error);
  }
};

