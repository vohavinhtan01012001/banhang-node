import {
  CreatePromotionType,
  UpdatePromotionType,
} from "../types/promotionType";
import Promotion from "../models/Promotion";
import Product from "../models/Product";
import { Op } from "sequelize";
import Category from "../models/Category";

export const createPromotionService = async (
  payload: CreatePromotionType
): Promise<Promotion> => {
  try {
    const promotion = await Promotion.create({
      title: payload.title,
      discount: payload.discount,
      startDate: payload.startDate,
      endDate: payload.endDate,
      status: payload.status,
    });
    return promotion;
  } catch (error) {
    throw error;
  }
};

export const getAllPromotionService = async () => {
  const promotion = await Promotion.findAll();
  return promotion;
};

export const updateStatusPromotionService = async (
  promotionId: number,
  status: number
) => {
  try {
    if (!promotionId) {
      throw new Error("Promotion ID not found");
    }
    if (status == 0 || status == 1) {
      await Promotion.update(
        { status: status },
        { where: { id: promotionId } }
      );

      const promotion = await Promotion.findOne({
        where: { id: promotionId },
        include: [{ model: Product }],
      });
      if (!promotion) {
        throw new Error("Promotion not found after update");
      }
      if (promotion.Products.length > 0) {
        for (const product of promotion.Products) {
          const discount: number = Number(promotion.discount);
          const price: number = Number(product.price);
          const value: number = (product.price * discount) / 100;
          const priceRedu: number = price - value;
          await Product.update(
            {
              promotionId: promotionId,
              priceReduced: promotion.status == 1 ? priceRedu : price,
            },
            { where: { id: product.id } }
          );
        }
      }
      return promotion;
    }
    throw new Error("Promotion status not found");
  } catch (error) {
    throw error;
  }
};

export const updatePromotionService = async (
  id: number,
  payload: UpdatePromotionType
) => {
  try {
    if (!payload) {
      throw new Error("Please provide promotion data to update");
    }
    if (!id) {
      throw new Error("id not found");
    }
    const promotionById = await Promotion.findOne({
      where: { id: id },
      include: [Product],
    });
    if (!promotionById) {
      throw new Error("Promtion not found");
    }
    const promotion = await Promotion.update(
      {
        title: payload.title,
        discount: payload.discount,
        startDate: payload.startDate,
        endDate: payload.endDate,
        status: payload.status,
      },
      { where: { id: id } }
    );

    if (promotionById.Products.length > 0) {
      for (const product of promotionById.Products) {
        const discount: number = Number(payload.discount);
        const price: number = Number(product.price);
        const value: number = (product.price * discount) / 100;
        const priceRedu: number = price - value;
        await Product.update(
          {
            priceReduced: promotionById.status == 1 ? priceRedu : price,
          },
          { where: { id: product.id } }
        );
      }
    }

    const numberOfAffectedRows = promotion[0];
    if (numberOfAffectedRows > 0) {
      const updatedPromotionData = await Promotion.findOne({
        where: { id: id },
      });
      if (updatedPromotionData) {
        return updatedPromotionData;
      } else {
        throw new Error("Failed to fetch updated promotion data");
      }
    } else {
      throw new Error("Failed to update promotion");
    }
  } catch (error) {
    throw error;
  }
};

export const deletePromotionService = async (promotionId: number) => {
  if (!promotionId) {
    throw new Error("Please Promotion id to delete");
  }
  if (promotionId && isNaN(promotionId)) {
    throw new Error("Invalid Promotion id");
  }
  const promotion = await Promotion.findOne({
    where: { id: promotionId },
    include: [Product],
  });
  if (!promotion) {
    throw new Error("Promotion not found");
  }
  for (const product of promotion.Products) {
    await Product.update(
      { priceReduced: product.price },
      { where: { id: product.id } }
    );
  }
  return Promotion.destroy({
    where: { id: promotionId },
  });
};

export const addPromotionProService = async (
  promotionId: number,
  checkList: any[]
) => {
  try {
    const values = Object.values(checkList);

    if (!promotionId) {
      throw new Error("Promotion not found");
    }
    const promotion = await Promotion.findOne({ where: { id: promotionId } });
    if (!promotion) {
      throw new Error("Promotion not found");
    }
    if (values.length === 0) {
      throw new Error("Checklist is empty");
    }

    for (let i = 0; i < values.length; i++) {
      if (values[i] != 0) {
        const productId = values[i];
        console.log(productId);

        const product = await Product.findOne({ where: { id: productId } });

        if (!product) {
          throw new Error(`Product with ID ${productId} not found`);
        }
        const discount: number = Number(promotion.discount);
        const price: number = Number(product.price);
        const value: number = (product.price * discount) / 100;
        const priceRedu: number = price - value;
        await Product.update(
          {
            promotionId: promotionId,
            priceReduced: promotion.status == 1 ? priceRedu : price,
          },
          { where: { productGroupId: product.productGroupId } }
        );
      }
    }
    const listProductAfter = await getListAddProductService(promotionId);
    return { promotion: promotion, product: listProductAfter };
  } catch (error) {
    throw error;
  }
};

export const getProductListOfPromotion = async (promotionId: number) => {
  try {
    if (!promotionId) {
      throw new Error("Promotion not found");
    }
    const checkPromotion = await Promotion.findOne({
      where: { id: promotionId },
    });
    if (!checkPromotion) {
      throw new Error("Promotion not found");
    }
    const getListProduct = await Promotion.findOne({
      where: { id: promotionId },
      include: [
        {
          model: Product,
          include: [{ model: Category }],
        },
      ],
    });
    const products = getListProduct.Products;
    const uniqueProductGroupIds = new Set();

    const listProduct = products.reduce((unique, currentProduct) => {
      if (!uniqueProductGroupIds.has(currentProduct.productGroupId)) {
        uniqueProductGroupIds.add(currentProduct.productGroupId);
        unique.push(currentProduct);
      }
      return unique;
    }, []);
    return listProduct;
  } catch (error) {
    throw error;
  }
};

export const getListAddProductService = async (promotionId: number) => {
  try {
    if (!promotionId) {
      throw new Error("Promotion not found");
    }
    const checkPromotion = await Promotion.findOne({
      where: { id: promotionId },
    });
    if (!checkPromotion) {
      throw new Error("Promotion not found");
    }
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { promotionId: { [Op.ne]: promotionId } }, // Lấy các sản phẩm có promotionId khác với promotionId được truyền vào
          { promotionId: null }, // Lấy các sản phẩm với promotionId là null
        ],
      },
      include: [{ model: Category }],
    });
    const uniqueProductGroupIds = new Set();

    const getListProduct = products.reduce((unique, currentProduct) => {
      if (!uniqueProductGroupIds.has(currentProduct.productGroupId)) {
        uniqueProductGroupIds.add(currentProduct.productGroupId);
        unique.push(currentProduct);
      }
      return unique;
    }, []);
    return getListProduct;
  } catch (error) {
    throw error;
  }
};

export const deleteProductInPromotionService = async (
  productId: number
): Promise<Product> => {
  const product = await Product.findByPk(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  await Product.update(
    { promotionId: null, priceReduced: product.price },
    {
      where: { id: productId },
    }
  );
  const productData: Product = await Product.findByPk(productId);
  return productData;
};

export const searchPromotionService = async (title: string) => {
  try {
    const searchTerm = title.toLowerCase();
    const promotions = await Promotion.findAll({
      include: [{ model: Product }],
    });
    const foundPromotions = promotions.filter(promotion =>
      promotion.title.toLowerCase().includes(searchTerm)
    );

    return foundPromotions;
  } catch (error) {
    return [];
  }
};
