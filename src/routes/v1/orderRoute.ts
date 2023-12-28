import { Router } from "express";
import isAdmin from "../../middleware/isAdmin";
import requireUser from "../../middleware/requiresUser";
import {
  orderById,
  paymentCod,
  paymentVnpay,
  paymentVnpayCheck,
  showOrderItemOfOder,
  showOrderList,
  showOrderListStatus,
  showOrderOfUser,
  updateDeliveryOrder,
  updateStatusOrder,
} from "../../controllers/order";

const orderRoute = Router();
orderRoute.post("/client/order-cod", paymentCod);
orderRoute.post("/client/order-vnpay", paymentVnpay);
orderRoute.post("/client/vnpay-check", paymentVnpayCheck);
orderRoute.get("/get-all", isAdmin, showOrderList);
orderRoute.get("/get-by/:id", isAdmin, orderById);
orderRoute.get("/get-status/:status", isAdmin, showOrderListStatus);
orderRoute.patch("/update-status/:id", isAdmin, updateStatusOrder);
orderRoute.patch("/update-delivery/:id", isAdmin, updateDeliveryOrder);

//client
orderRoute.get("/client/show-order", requireUser, showOrderOfUser);
orderRoute.get("/client/show-orderItem/:id", requireUser, showOrderItemOfOder);

export default orderRoute;
