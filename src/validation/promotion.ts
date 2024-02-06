import Joi from "joi";

export const createPromotionSchema = Joi.object({
  title: Joi.string().required().min(3).max(50),
  discount: Joi.number().required().min(0).max(100),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required().greater(Joi.ref("startDate")),
  status: Joi.number().valid(0, 1).required(),
});

export const updateStatusPromotionSchema = Joi.object({
  status: Joi.number().valid(0, 1).required(),
});

export const updatePromotionSchema = Joi.object({
  title: Joi.string().required().min(3).max(50),
  discount: Joi.number().required().min(0).max(100),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().required().greater(Joi.ref("startDate")),
  status: Joi.number().valid(0, 1).required(),
});
