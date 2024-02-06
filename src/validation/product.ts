import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string(),
  price: Joi.number().min(0).required(),
  priceReduced: Joi.number().min(0).less(Joi.ref("price")).required(),
  quantity: Joi.number().min(0).required(),
  image: Joi.required(),
  image2: Joi.required(),
  image3: Joi.required(),
  image4: Joi.required(),
  gender: Joi.number().required(),
  status: Joi.number().valid(0, 1).required(),
  categoryId: Joi.number().required(),
});

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  description: Joi.string(),
  price: Joi.number().min(0).required(),
  priceReduced: Joi.number().min(0).less(Joi.ref("price")).required(),
  quantity: Joi.number().min(0).required(),
  image: Joi.string().required(),
  image2: Joi.string().required(),
  image3: Joi.string().required(),
  image4: Joi.string().required(),
  gender: Joi.number().required(),
  status: Joi.number().valid(0, 1).required(),
  categoryId: Joi.number().required(),
});


export const updateStatusProductSchema = Joi.object({
  status: Joi.number().valid(0, 1).required(),
});
