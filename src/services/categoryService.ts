import { EditCategory } from "categoryType";
import Category from "../models/Category";
import Product from "../models/Product";

export const createCategory = async (payload: any) => {
  const category = await Category.create(payload);
  return category;
};

export const getAllCategory = async () => {
  const categories = await Category.findAll({ include: [Product] });
  return categories;
};

export const getByIdCategory = async (payload: number) => {
  if (!payload) {
    throw new Error("Please product id to find product");
  }
  if (payload && isNaN(payload)) {
    throw new Error("Invalid product id");
  }
  const category = await Category.findByPk(payload);
  if (!category) {
    throw new Error("Category not found");
  }
  return category;
};

export const updateCategory = async (category: Category, id: number) => {
  if (!category) {
    throw new Error("Please provide category data to update");
  }
  const categoryById = await Category.findOne({ where: { id: id } });
  if (!categoryById) {
    throw new Error("category not found");
  }
  Category.update(category, {
    where: { id: id },
  });
  const updatedProductData = { ...category, id: id };
  return updatedProductData;
};

export const deleteCategory = async (categoryId: number) => {
  if (!categoryId) {
    throw new Error("Please category id to delete");
  }
  if (categoryId && isNaN(categoryId)) {
    throw new Error("Invalid category id");
  }
  const categoryById = await Category.findOne({ where: { id: categoryId } });
  if (!categoryById) {
    throw new Error("Product not found");
  }
  return Category.destroy({
    where: { id: categoryId },
  });
};
