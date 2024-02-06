import Joi from "joi";

export const createFavouriteSchema = Joi.object({
  productGroupId: Joi.number(),
});
