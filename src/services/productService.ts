import Product from "../models/Product";

export const createProduct = async (payload: any) => {
  const product = await Product.create(payload);
  return product;
};
