import Product from "../models/Product";
import Category from "../models/Category";
import { CreateProduct } from "../types/productType";
import { Optional } from "sequelize";

export const createProduct = async (payload: Product) => {
  const convertedPayload: any = {
    ...payload,
    price: Number(payload.price),
    priceReduced: Number(payload.priceReduced),
    quantity: Number(payload.quantity),
    gender: Number(payload.gender),
    status: Number(payload.status),
    categoryId: Number(payload.categoryId),
  };

  try {
    const product = await Product.create(convertedPayload);

    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error; // Chuyển lại lỗi để xử lý ở lớp gọi
  }
};
export const getAllProduct = async () => {
  const product = await Product.findAll({
    include: [{ model: Category, as: "Category" }],
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

export const updateProduct = async (product: Product, id: number) => {
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
