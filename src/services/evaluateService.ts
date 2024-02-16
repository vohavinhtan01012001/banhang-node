import { CreateEvaluateType, ShowEvaluateType } from "evaluateType";
import Evaluate from "../models/Evaluate";
import Product from "../models/Product";
import User from "../models/User";
import ProductGroup from "../models/ProductGroup";

export const createEvaluate = async (
  payload: CreateEvaluateType
): Promise<Evaluate> => {
  try {
    const checkUser = await User.findOne({ where: { id: payload.userId } });
    const checkProductGroup = await ProductGroup.findOne({
      where: { id: payload.productGroupId },
    });
    if (!checkUser) {
      throw new Error("User not found");
    }
    if (!checkProductGroup) {
      throw new Error("Product Group not found");
    }
    const checkEvaluate = await Evaluate.findOne({
      where: { userId: payload.userId, productGroupId: payload.productGroupId },
    });
    let evaluate: Evaluate;
    if (!checkEvaluate) {
      evaluate = await Evaluate.create({
        ...payload,
      });
      const productGroupId = payload.productGroupId;
      const evaluates = await Evaluate.findAll({
        where: { productGroupId: productGroupId },
      });
      const count = evaluates.length;
      let sumRate = 0;
      for (const evaluate of evaluates) {
        sumRate += evaluate.rate;
      }
      const rateProduct = sumRate / count;
      await Product.update(
        { evaluate: rateProduct },
        { where: { productGroupId: productGroupId } }
      );
    }
    return evaluate;
  } catch (error) {
    throw error;
  }
};

export const showEvaluateOfUser = async (
  userId: number
): Promise<Evaluate[]> => {
  try {
    if (!userId) throw new Error("userId not found");
    const evaluate = await Evaluate.findAll({
      where: { userId: userId },
    });
    return evaluate;
  } catch (error) {
    throw error;
  }
};
