import Product from "../models/Product";
import Category from "../models/Category";
import { CreateProductType, UpdateProductType } from "productType";
import { addPromotionProService } from "./promotionService";
import Promotion from "../models/Promotion";

//admin
export const createProduct = async (
  payload: CreateProductType
): Promise<Product> => {
  try {
    const product = await Product.create({
      ...payload,
      priceReduced: payload.price,
    });
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
export const getAllProduct = async () => {
  const product = await Product.findAll({
    include: [{ model: Category }, { model: Promotion }],
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

export const updatePriceReduced = async (id: number) => {
  try {
    if (!id) throw new Error("Product not found");
    const product = await Product.findByPk(id, {
      include: [{ model: Promotion }],
    });
    if (!product) throw new Error("Product not found");
    if (product.promotionId == null) {
      await Product.update(
        { priceReduced: product.price },
        { where: { id: id } }
      );
    } else {
      const discount: number = Number(product.Promotion.discount);
      const price: number = Number(product.price);
      const value: number = (product.price * discount) / 100;
      const priceRedu: number = price - value;
      await Product.update({ priceReduced: priceRedu }, { where: { id: id } });
    }
    const productUpdate = await Product.findByPk(id);
    return productUpdate;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateProduct = async (
  product: UpdateProductType,
  id: number
): Promise<Product> => {
  try {
    if (!product) {
      throw new Error("Please provide product data to update");
    }
    const productById = await Product.findOne({ where: { id: id } });
    if (!productById) {
      throw new Error("Product not found");
    }
    await Product.update({ ...product }, { where: { id: id } });
    const updatedProductData: Product = await updatePriceReduced(id);
    return updatedProductData;
  } catch (error) {
    throw new Error(error);
  }
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

export const searchProductService = async (name: string) => {
  try {
    const searchTerm = name.toLowerCase();
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Promotion }],
    });
    const foundProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm)
    );

    return foundProducts;
  } catch (error) {
    return [];
  }
};

//client
export const getAllProductPageHomeService = async () => {
  const product = await Product.findAll({
    where: { status: 1 },
    include: [{ model: Category }, { model: Promotion }],
    limit: 8,
  });
  return product;
};

export const getListProductOfCategoryService = async (
  id: number
): Promise<Product[]> => {
  const product = await Product.findAll({
    where: { status: 1, categoryId: id },
    include: [{ model: Category }, { model: Promotion }],
  });
  return product;
};
