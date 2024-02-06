import { NextFunction, Request, Response } from "express";
import {
  deleteOrder,
  getAllOrders,
  getByOrdersStatus,
  getOrderByIdService,
  getShowOrderItemOfOrder,
  getShowOrderOfUser,
  paymentCodService,
  updatDeliveryOrderService,
  updateStatusOrderService,
  vnpayIPN,
  vnpaymentService,
} from "../services/orderService";
import { ApiResponse, customRequest } from "customDefinition";
import { parseInt } from "lodash";

//client
export const paymentCod = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cart = req.body.cart;
  const userCart = req.body.user;
  const checkPayment = await paymentCodService(cart, userCart);
  const response: ApiResponse = {
    statusCode: 1,
    message: "Order placed successfully!",
  };
  if (!checkPayment) {
    throw new Error("Order failed!");
  }
  return res.status(200).json({ status: response });
};

export const paymentVnpay = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cart = req.body.cart;

  const { vnp_Url } = await vnpaymentService(cart, req);

  if (vnp_Url) {
    console.log(vnp_Url);
    // Redirect the user to the VNPAY URL for payment initiation
    return res.status(200).json(vnp_Url);
  } else {
    // Handle case when vnp_Url is not available or falsy
    throw new Error("Failed to generate payment URL");
  }
  // Handle errors occurring during payment initiation
};
export const paymentVnpayCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vnp_Params = req.body.vnp_Params;
  const cart = req.body.cart;
  const userCart = req.body.user;
  const check = await vnpayIPN(vnp_Params, cart, userCart);
  return res.status(200).json(check);
};

//admin

export const showOrderList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const orders = await getAllOrders();
  return res.status(200).json({ orders: orders });
};

export const showOrderListStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = parseInt(req.params.status);
  const orders = await getByOrdersStatus(status);
  return res.status(200).json({ orders: orders });
};

export const orderById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const { order, orderItem } = await getOrderByIdService(id);
    res.status(200).json({ order, orderItem });
  } catch (error) {
    next(error);
  }
};

export const updateStatusOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const status = req.body.status;
    const order = await updateStatusOrderService(id, status);
    const response: ApiResponse = {
      statusCode: 1,
      message: "status update successful",
    };
    return res.status(200).json({ status: response });
  } catch (error) {
    next(error);
  }
};

export const updateDeliveryOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const delivery = req.body.delivery;
    await updatDeliveryOrderService(id, delivery);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Delivery update successful",
    };
    return res.status(200).json({ status: response });
  } catch (error) {
    next(error);
  }
};

export const showOrderOfUser = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.user.id);
    const orders = await getShowOrderOfUser(id);
    return res.status(200).json({ orders: orders, user: req.user });
  } catch (error) {
    next(error);
  }
};

export const showOrderItemOfOder = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const orders = await getShowOrderItemOfOrder(id);
    return res.status(200).json({ orders: orders });
  } catch (error) {
    next(error);
  }
};

export const desTroyOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    await deleteOrder(id);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Order delete successfully",
    };
    return res.status(200).json({ status: response });
  } catch (error) {
    next(error);
  }
};
