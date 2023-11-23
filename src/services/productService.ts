import Product from "../models/Product";
import Category from "../models/Category";

export const createProduct = async (payload: any) => {
  try {
    const product = await Product.create(payload);
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
export const getAllProduct = async () => {
  const product = await Product.findAll({
    include: [{ model: Category }],
  });
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
  await Product.update(product, {
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

export const updateStatusProductService = async (
  productId: number,
  status: number
) => {
  try {
    if (!productId) {
      throw new Error("Product ID not found");
    }
    if (status == 0 || status == 1) {
      await Product.update({ status: status }, { where: { id: productId } });
      const updatedProduct = await Product.findOne({
        where: { id: productId },
      });
      if (!updatedProduct) {
        throw new Error("Product not found after update");
      }
      return updatedProduct;
    }
    throw new Error("Product status not found");
  } catch (error) {
    throw error;
  }
};
