import Size from "../models/Size";
import Product from "../models/Product";
import { CreateSize } from "sizeType";

export const createSize = async (payload: CreateSize): Promise<Size> => {
  const size = await Size.create({
    name: payload.name,
    description: payload.description,
  });
  return size;
};

export const getAllSize = async (): Promise<Size[]> => {
  const size = await Size.findAll({ include: [Product] });
  return size;
};

export const deleteSize = async (sizeId: number) => {
  if (!sizeId) {
    throw new Error("Please size id to delete");
  }
  if (sizeId && isNaN(sizeId)) {
    throw new Error("Invalid size id");
  }
  const sizeById = await Size.findOne({ where: { id: sizeId } });
  if (!sizeById) {
    throw new Error("Product not found");
  }
  return Size.destroy({
    where: { id: sizeId },
  });
};
