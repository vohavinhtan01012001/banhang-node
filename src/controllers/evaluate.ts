import { NextFunction, Request, Response } from "express";
import { ApiResponse, customRequest } from "customDefinition";
import { createEvaluate } from "../services/evaluateService";
import Evaluate from "../models/Evaluate";

export const addEvaluate = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const createdEvaluate: Evaluate = await createEvaluate(payload);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Evaluate created successfully",
    };
    res.status(200).json({ status: response, Evaluate: createdEvaluate });
  } catch (err) {
    next(err);
  }
};
