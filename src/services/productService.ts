import Product from "../models/Product";

export const createProduct = async (payload: any) => {
  const product = await Product.create(payload);
  return product;
};

export const getAllProduct = async () => {
  const product = await Product.findAll();
  return product;
};

export const getByIdProduct = async (productId: number) => {
  if (!productId) {
    throw new Error("Please product id to find product");
  }
  if (productId && isNaN(productId)) {
    throw new Error("Invalid product id");
  }
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const updateProduct = async (product: any, id: number) => {
  if (!product) {
    throw new Error("Please provide product data to update");
  }
  const productById = await Product.findOne({ where: { id: id } });
  if (!productById) {
    throw new Error("Product not found");
  }
  Product.update(product, {
    where: { id: id },
  });
  const updatedProductData = { ...product, id: id };
  return updatedProductData;
};

export const deleteProduct = async (productId: number) => {
  if (!productId) {
    throw new Error("Please product id to delete");
  }
  if (productId && isNaN(productId)) {
    throw new Error("Invalid product id");
  }
  const productById = await Product.findOne({ where: { id: productId } });
  if (!productById) {
    throw new Error("Product not found");
  }
  return Product.destroy({
    where: { id: productId },
  });
};
