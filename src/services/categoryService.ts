import Category from "../models/Category";

export const createCategory = async (payload: any) => {
  const category = await Category.create(payload);
  return category;
};

export const getAllCategory = async () => {
  const catgory = await Category.findAll();
  return catgory;
};

export const getByIdCategory = async (payload: any) => {
  const catgory = await Category.findByPk(payload);
  return catgory;
};

export const updateCategory = async (payload: any) => {
  const categoryById = await Category.findByPk(payload.id);
  let upCategory = null;
  if (categoryById) {
    upCategory = await categoryById.update(payload);
  }
  return upCategory;
};
