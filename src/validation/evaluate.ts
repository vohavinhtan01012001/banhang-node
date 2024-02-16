import Joi from "joi";

export const createEvaluateSchema = Joi.object({
  userId: Joi.number().required(),
  productGroupId: Joi.number().required(),
  rate: Joi.number().required(),
});
