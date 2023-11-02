import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string(),
});

export const updateCategorySchema = Joi.object({
  id: Joi.number(),
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string(),
});
