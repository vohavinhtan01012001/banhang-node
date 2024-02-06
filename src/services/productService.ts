import Product from "../models/Product";
import Category from "../models/Category";
import { CartPayment, CreateProductType, UpdateProductType } from "productType";
import Promotion from "../models/Promotion";
import ProductGroup from "../models/ProductGroup";
import Size from "../models/Size";
import { UserPayment } from "userType";
import Oder from "../models/Order";
import Order from "../models/Order";
import OrderItem from "../models/OrderItem";
import User from "../models/User";
import { Op, Sequelize, where } from "sequelize";
import Favourite from "../models/Favourite";
import sequelizeConnection from "../db/connection";

//admin
export const createProduct = async (
  payload: CreateProductType
): Promise<Product> => {
  try {
    const groupProduct = await Product.findAll({
      where: {
        categoryId: payload.categoryId,
        gender: payload.gender,
        name: payload.name,
        price: payload.price,
      },
    });
    let checkSize = false;

    for (let i = 0; i < groupProduct.length; i++) {
      if (groupProduct[i].sizeId == payload.sizeId) {
        checkSize = true;
        break;
      }
    }

    if (checkSize) {
      throw new Error("Product already exists");
    }

    let productGroupId: number;
    if (groupProduct.length > 0) {
      productGroupId = groupProduct[0].productGroupId;
    } else {
      const lastProductGroup = await ProductGroup.findOne({
        order: [["id", "DESC"]],
      });
      if (lastProductGroup) {
        productGroupId = lastProductGroup.id + 1;
      } else {
        productGroupId = 1;
      }
      await ProductGroup.create({ id: productGroupId });
    }
    const product = await Product.create({
      ...payload,
      productGroupId: productGroupId,
      priceReduced: payload.price,
    });
    return product;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const getAllProductGroup = async () => {
  const products = await Product.findAll({
    include: [{ model: Category }, { model: Promotion }],
  });

  // Tạo một Set chứa các productGroupId duy nhất
  const uniqueProductGroupIds = new Set();

  const product = products.reduce((unique, currentProduct) => {
    if (!uniqueProductGroupIds.has(currentProduct.productGroupId)) {
      uniqueProductGroupIds.add(currentProduct.productGroupId);
      unique.push(currentProduct);
    }
    return unique;
  }, []);

  return product;
};

export const getAllProductByIdProductGroup = async (productGroupId: number) => {
  const products = await Product.findAll({
    where: { productGroupId: productGroupId },
    include: [
      { model: Category },
      { model: Promotion },
      { model: Size },
      { model: ProductGroup },
    ],
  });
  return products;
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
      const discount = Number(product.Promotion.discount);
      const price = Number(product.price);
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
  const listProduct = await Product.findAll({
    where: { status: 1 },
    include: [{ model: Category }, { model: Promotion }],
    limit: 8,
  });

  // Tạo một Set chứa các productGroupId duy nhất
  const uniqueProductGroupIds = new Set();

  const product = listProduct.reduce((unique, currentProduct) => {
    if (!uniqueProductGroupIds.has(currentProduct.productGroupId)) {
      uniqueProductGroupIds.add(currentProduct.productGroupId);
      unique.push(currentProduct);
    }
    return unique;
  }, []);
  return product;
};

export const getListProductOfCategoryService = async (
  id: number
): Promise<Product[]> => {
  const listProduct = await Product.findAll({
    where: { status: 1, categoryId: id },
    include: [{ model: Category }, { model: Promotion }],
    limit: 8,
  });

  // Tạo một Set chứa các productGroupId duy nhất
  const uniqueProductGroupIds = new Set();

  const product = listProduct.reduce((unique, currentProduct) => {
    if (!uniqueProductGroupIds.has(currentProduct.productGroupId)) {
      uniqueProductGroupIds.add(currentProduct.productGroupId);
      unique.push(currentProduct);
    }
    return unique;
  }, []);
  return product;
};

export const detailProductAndCategoryService = async (
  id: number,
  nameCategory: string
): Promise<{
  product: Product;
  category: Category;
  productGroup: Product[];
  listSize: any[];
  productList: Product[];
}> => {
  if (!id) {
    throw new Error("ID not found");
  }
  if (!nameCategory) {
    throw new Error("Slug not found");
  }
  const product = await Product.findOne({
    where: { id: id, status: 1 },
    include: [{ model: Category }, { model: Promotion }, { model: Size }],
  });
  if (nameCategory != product.Category.name) {
    throw new Error("cannot find product");
  }
  const productGroup = await Product.findAll({
    where: { productGroupId: product.productGroupId, status: 1 },
    include: [{ model: Category }, { model: Promotion }, { model: Size }],
  });
  const sizes: any[] = [];
  for (let i = 0; i < productGroup.length; i++) {
    if (productGroup[i].Size) {
      sizes.push({
        label: productGroup[i].Size.name,
        value: productGroup[i].id,
      });
    }
  }
  const gender = product.gender;
  const productList = await getRandomProductsByGenderService({
    gender: gender,
    id: product.id,
  });

  const category = product.Category;
  return {
    product: product,
    category: category,
    productGroup: productGroup,
    listSize: sizes,
    productList: productList,
  };
};

export const searchProductClientService = async (name: string) => {
  try {
    const searchTerm = name.toLowerCase();
    const products = await Product.findAll({
      where: { status: 1 },
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

//listCart = [{id, quantityCart},..]
export const showCartService = async (listCart: any[]) => {
  if (listCart.length < 0) {
    throw new Error("listId must be greater than 0");
  }
  const productList = await Product.findAll({
    where: { status: 1 },
    include: [{ model: Category }, { model: Promotion }, { model: Size }],
  });
  const listProductCart = [];
  let sumPriceCart: number = 0;
  for (const product of productList) {
    const cartItem = listCart.find(cart => cart.id === product.id);
    if (cartItem) {
      if (cartItem.quantityCart <= product.quantity) {
        const quantityCart = parseInt(cartItem.quantityCart);
        sumPriceCart += quantityCart * product.priceReduced;
        listProductCart.push({
          ...product.toJSON(),
          quantityCart: quantityCart,
          priceCart: quantityCart * product.priceReduced,
        });
      } else {
        throw new Error(
          "The cart quantity must be less than the product quantity"
        );
      }
    }
  }
  return { listProductCart, sumPriceCart };
};

export const getRandomProductsByGenderService = async ({
  gender,
  id,
}: {
  gender: number;
  id: number;
}): Promise<Product[]> => {
  try {
    const randomProducts = await Product.findAll({
      where: {
        gender: gender,
        status: 1,
        id: {
          [Op.not]: id, // Exclude a specific ID
        },
      },
      order: Sequelize.literal("RAND()"), // Sử dụng hàm RAND() của SQL để lấy ngẫu nhiên
      limit: 10, // Lấy ra 10 sản phẩm
      include: [{ model: Category }, { model: Promotion }],
    });

    return randomProducts;
  } catch (error) {
    throw error;
  }
};

export const getProductFavouriteService = async (
  userId: number
): Promise<Product[]> => {
  try {
    if (!userId) {
      throw new Error("User not found");
    }

    const favourites = await Favourite.findAll({
      where: { userId: userId },
      include: [
        {
          model: ProductGroup,
          include: [{ model: Product, include: [Category] }],
        },
      ],
    });

    const uniqueProductIds: Set<number> = new Set();
    const uniqueProducts: Product[] = [];

    for (const favouriteItem of favourites) {
      if (favouriteItem.ProductGroup && favouriteItem.ProductGroup.Products) {
        const products: Product[] = favouriteItem.ProductGroup.Products;
        for (const product of products) {
          if (!uniqueProductIds.has(product.productGroupId)) {
            uniqueProductIds.add(product.productGroupId);
            uniqueProducts.push(product);
          }
        }
      }
    }
    return uniqueProducts;
  } catch (error) {
    throw error;
  }
};

export const getMinMaxPrice = async () => {
  try {
    const minMaxPrice = await Product.findOne({
      attributes: [
        [
          sequelizeConnection.fn("min", sequelizeConnection.col("price")),
          "minPrice",
        ],
        [
          sequelizeConnection.fn("max", sequelizeConnection.col("price")),
          "maxPrice",
        ],
      ],
    });

    const { minPrice, maxPrice } = minMaxPrice.get({ plain: true });

    return { minPrice, maxPrice };
  } catch (error) {
    console.error("Error fetching min-max price:", error);
    throw error;
  }
};

export const getCategoryAndSizeService = async () => {
  try {
    const category = await Category.findAll();
    const size = await Size.findAll();
    const { minPrice, maxPrice } = await getMinMaxPrice();
    return { category, size, minPrice, maxPrice };
  } catch (error) {
    throw error;
  }
};

export const filterCategoryAndSizeAndGenderAndPriceService = async ({
  category,
  gender,
  size,
  priceMin,
  priceMax,
}: {
  category: number | 0;
  size: number | 0;
  gender: number | 0;
  priceMin: number;
  priceMax: number;
}): Promise<Product[]> => {
  try {
    let product: Product[] = await Product.findAll({
      where: { status: 1 },
      include: [Category, Promotion],
    });
    if (category != 0) {
      product = product.filter(item => item.categoryId == category);
    }
    if (size != 0) {
      product = product.filter(item => item.sizeId == size);
    }
    if (gender != 0) {
      product = product.filter(item => item.gender == gender);
    }
    if (priceMin != 0 && priceMax != 0) {
      product = product.filter(
        item => item.price >= priceMin && item.price <= priceMax
      );
    }
    const uniqueProductGroupIds = new Set();

    const products = product.reduce((unique, currentProduct) => {
      if (!uniqueProductGroupIds.has(currentProduct.productGroupId)) {
        uniqueProductGroupIds.add(currentProduct.productGroupId);
        unique.push(currentProduct);
      }
      return unique;
    }, []);
    return products;
  } catch (error) {
    throw error;
  }
};
