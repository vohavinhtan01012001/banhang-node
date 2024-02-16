import { CreateFavouriteType } from "FavouriteType";
import Favourite from "../models/Favourite";
import User from "../models/User";
import ProductGroup from "../models/ProductGroup";
import Product from "../models/Product";

export const updateFavouriteService = async ({
  productGroupId,
  userId,
}: {
  productGroupId: number;
  userId: number;
}): Promise<boolean> => {
  try {
    const checkUser = await User.findOne({ where: { id: userId } });
    const checkProductGroup = await ProductGroup.findOne({
      where: { id: productGroupId },
    });
    if (!checkUser) {
      throw new Error("User not found");
    }
    if (!checkProductGroup) {
      throw new Error("Product Group not found");
    }
    const checkFavourite = await Favourite.findOne({
      where: { userId: userId, productGroupId: productGroupId },
    });
    const productFavourite = await Product.findOne({
      where: { productGroupId: productGroupId },
    });
    if (!checkFavourite) {
      const favouriteValue = productFavourite.favourite + 1;
      await Favourite.create({
        userId: userId,
        productGroupId: productGroupId,
      });
      await Product.update(
        { favourite: favouriteValue },
        { where: { productGroupId: productGroupId } }
      );
      return true;
    } else {
      const favouriteValue = productFavourite.favourite - 1;
      await Favourite.destroy({
        where: { id: checkFavourite.id },
      });
      await Product.update(
        { favourite: favouriteValue },
        { where: { productGroupId: productGroupId } }
      );
      return false;
    }
  } catch (error) {
    throw error;
  }
};

export const getFavouriteService = async ({
  productGroupId,
  userId,
}: {
  productGroupId: number;
  userId: number;
}): Promise<boolean> => {
  try {
    const checkFavourite = await Favourite.findOne({
      where: { userId: userId, productGroupId: productGroupId },
    });
    if (checkFavourite) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    throw error;
  }
};
