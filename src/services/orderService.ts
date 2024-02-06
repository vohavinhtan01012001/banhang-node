//user = {fullname,address,phone,note,email,pay}
import querystring from "querystring";
import { Cart, CartPayment } from "productType";
import OrderItem from "../models/OrderItem";
import Product from "../models/Product";
import User from "../models/User";
import Size from "../models/Size";
import { UserPayment } from "userType";
import { OAuth2Client } from "google-auth-library";
import moment from "moment";
import nodemailer, { SentMessageInfo } from "nodemailer";
import { transporter } from "../helpers/mailHelper";
import Order from "../models/Order";
import { DetailOrdeType, OrderItemType, vnpayment } from "orderType";
import Category from "../models/Category";
import { Request } from "express";
import qs from "qs"; // Import thư viện qs
import crypto from "crypto";

//cart = [{id,quantityCart}...]
export const paymentCodService = async (
  cart: CartPayment[],
  userCart: UserPayment
) => {
  try {
    if (cart.length > 0) {
      const sumPrice = cart.reduce((sum, item) => sum + item.priceCart, 0.0);

      let idUser;
      if (userCart.email) {
        idUser = await User.findOne({ where: { email: userCart.email } });
      }

      const createOrder = await Order.create({
        ...userCart,
        sumPrice: sumPrice + 30000,
        userId: idUser ? idUser.id : null,
      });

      const listProduct = await Product.findAll();

      for (const itemCart of cart) {
        const product = listProduct.find(product => product.id === itemCart.id);

        if (product) {
          if (createOrder && product.quantity - itemCart.quantityCart >= 0) {
            await OrderItem.create({
              productId: product.id,
              quantity: itemCart.quantityCart,
              price: product.priceReduced,
              sumPrice: itemCart.quantityCart * product.priceReduced,
              orderId: createOrder.id,
            });

            await Product.update(
              { quantity: product.quantity - itemCart.quantityCart },
              { where: { id: product.id } }
            );
          } else {
            throw new Error("Order failed to update quantity");
          }
        } else {
          throw new Error("Product not found");
        }
      }
      const date = moment(createOrder.created_at).format("DD/MM/YYYY");
      const formatMoney = (value: any) => {
        return value.toLocaleString("vi-VN") + " VNĐ";
      };
      const price = formatMoney(createOrder.sumPrice);

      const mailOptions = {
        to: createOrder.email, // Gửi đến ai?
        subject: "Đơn hàng đã được tạo thành công!", // Tiêu đề email
        html: `<div>
                Xin chào ${createOrder.fullname},<br><br>
                    Đơn hàng của anh/chị đã được tạo.<br><br>
                    Dưới đây là thông tin chi tiết về đơn hàng của anh/chị:<br><br>
                    Mã đơn hàng: ${createOrder.id}<br>
                    Ngày đặt hàng: ${date}<br>
                    Tổng tiền hàng: ${price} (đã bao gồm phí vận chuyển + 30.000 VNĐ)<br><br>
                    Chúng tôi xin chân thành cảm ơn bạn đã tin tưởng và mua sắm tại cửa hàng chúng tôi. Nếu bạn có bất kỳ câu hỏi hoặc yêu cầu hỗ trợ nào, hãy liên hệ với đội ngũ dịch vụ khách hàng của chúng tôi trên website.<br><br>
                    Trân trọng,<br>
                    Vinh Tân<br>
                    ShopSocXanh
               </div>`, // Nội dung email
      };
      await transporter.sendMail(
        mailOptions,
        (error: Error | null, info: SentMessageInfo) => {
          if (error) {
            console.error("Error occurred:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        }
      );

      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

interface SortedObject {
  [key: string]: string;
}

function sortObject(obj: any): SortedObject {
  const sorted: SortedObject = {};
  const str: string[] = Object.keys(obj).map(key => encodeURIComponent(key));

  str.sort();

  for (let key = 0; key < str.length; key++) {
    const sortedKey = str[key];
    sorted[sortedKey] = encodeURIComponent(
      obj[decodeURIComponent(sortedKey)]
    ).replace(/%20/g, "+");
  }

  return sorted;
}

export const vnpaymentService = async (cart: CartPayment[], req: Request) => {
  try {
    let sumPriceOrder = 0;
    const listProduct = await Product.findAll();

    for (const item of cart) {
      const { id, quantityCart } = item;
      const product = listProduct.find(product => product.id === id);
      if (product) {
        sumPriceOrder += product.priceReduced * quantityCart;
      }
    }

    sumPriceOrder += 30000;
    const id = Math.floor(Math.random() * 10000).toString();
    const vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    const vnp_Returnurl = "http://localhost:3000/thanks";
    const vnp_TmnCode = "XON1ZD67"; // Mã website tại VNPAY
    const vnp_HashSecret = "OQFALEJEIXFMSSFSQYFEYUUBHCNQYLNM"; // Chuỗi bí mật

    const vnp_TxnRef = id; // Mã đơn hàng
    const vnp_OrderInfo = "Thanh+toan+don+hang+test";
    const vnp_OrderType = "billpayment";
    const vnp_Amount = Math.round(sumPriceOrder * 100);
    const vnp_Locale = "vn";
    const vnp_BankCode = "NCB";
    const vnp_IpAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress;

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");

    const vnp_CreateDate = `${year}${month}${day}${hours}${minutes}${seconds}`;

    const inputData: any = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: vnp_TmnCode,
      vnp_Locale: vnp_Locale,
      vnp_CurrCode: "VND",
      vnp_TxnRef: vnp_TxnRef,
      vnp_OrderInfo: vnp_OrderInfo,
      vnp_OrderType: "other",
      vnp_Amount: vnp_Amount,
      vnp_ReturnUrl: vnp_Returnurl,
      vnp_IpAddr: vnp_IpAddr,
      vnp_CreateDate: vnp_CreateDate,
      vnp_BankCode: vnp_BankCode,
    };

    if (vnp_BankCode !== null) {
      inputData.vnp_BankCode = vnp_BankCode;
    }

    const inputDatas = sortObject(inputData);
    const querystring = qs;
    const signData = querystring.stringify(inputDatas, { encode: false });
    const hmac = crypto.createHmac("sha512", vnp_HashSecret);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");
    inputDatas["vnp_SecureHash"] = signed;
    const finalUrl =
      vnp_Url + "?" + querystring.stringify(inputDatas, { encode: false });

    return { vnp_Url: finalUrl };
  } catch (error) {
    throw error;
  }
};

export const vnpayIPN = async (
  vnp_Params: any,
  cart: CartPayment[],
  userCart: UserPayment
) => {
  try {
    const secureHash = vnp_Params["vnp_SecureHash"];
    const orderId = vnp_Params["vnp_TxnRef"];
    const rspCode = vnp_Params["vnp_ResponseCode"];

    delete vnp_Params["vnp_SecureHash"];
    delete vnp_Params["vnp_SecureHashType"];

    vnp_Params = sortObject(vnp_Params);
    // Lấy giá trị từ config hoặc environment variables
    const secretKey = "OQFALEJEIXFMSSFSQYFEYUUBHCNQYLNM";

    const querystring = qs;
    const signData = querystring.stringify(vnp_Params, { encode: false });
    const hmac = crypto.createHmac("sha512", secretKey);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    const paymentStatus = "0"; // Trạng thái khởi tạo giao dịch, chưa có IPN.

    // Giả sử checkOrderId và checkAmount là các hàm kiểm tra orderId và amount có trong CSDL của bạn
    const checkOrderId = true;
    const checkAmount = true;
    console.log("key1: " + secureHash);
    console.log("key2: " + signed);
    if (secureHash == signed) {
      // Kiểm tra checksum
      if (checkOrderId) {
        if (checkAmount) {
          if (paymentStatus === "0") {
            // Kiểm tra trạng thái giao dịch trước khi cập nhật tình trạng thanh toán
            if (rspCode === "00") {
              // Thành công, cập nhật trạng thái giao dịch thành công vào CSDL của bạn
              // Thực hiện hành động cần thiết (ví dụ: cập nhật đơn hàng, thông báo cho người dùng)
              await paymentCodService(cart, userCart);
              return { RspCode: "00", Message: "Success" };
            } else {
              // Thất bại, cập nhật trạng thái giao dịch thất bại vào CSDL của bạn
              // Thực hiện hành động cần thiết (ví dụ: gửi thông báo cho người dùng)
              return { RspCode: "00", Message: "Success" };
            }
          } else {
            return {
              RspCode: "02",
              Message: "This order has been updated to the payment status",
            };
          }
        } else {
          return { RspCode: "04", Message: "Amount invalid" };
        }
      } else {
        return { RspCode: "01", Message: "Order not found" };
      }
    } else {
      return { RspCode: "97", Message: "Checksum failed" };
    }
  } catch (error) {
    // Xử lý các lỗi nếu có
    throw error;
  }
};

export const getAllOrders = async () => {
  const orders = await Order.findAll();
  return orders;
};

//get all orders continue
export const getByOrdersStatus = async (status: number): Promise<Order[]> => {
  /* if (status == 0 || status == 1 || status == 2) {
    throw new Error("Invalid status");
  } */
  let orders: Order[] = [];
  if (status == 3) {
    orders = await Order.findAll();
    return orders;
  }
  if (status == 4) {
    orders = await Order.findAll({ where: { cancelOrder: 1 } });
    return orders;
  }
  orders = await Order.findAll({ where: { status: status } });
  return orders;
};

export const getOrderByIdService = async (
  id: number
): Promise<{ order: Order; orderItem: OrderItem[] }> => {
  try {
    if (!id) {
      throw new Error("Order not found");
    }
    const order = await Order.findOne({ where: { id: id } });
    if (!order) {
      throw new Error("Order not found");
    }
    const orderItem = await OrderItem.findAll({
      where: { orderId: id },
      include: [
        {
          model: Product,
          include: [Category],
        },
      ],
    });
    return { order, orderItem };
  } catch (error) {
    throw error;
  }
};

export const updateStatusOrderService = async (id: number, status: number) => {
  try {
    if (!id) {
      throw new Error("Order ID not found");
    }
    if (status == 0 || status == 1 || status == 2) {
      await Order.update({ status: status }, { where: { id: id } });
      const updateOrder = await Order.findOne({
        where: { id: id },
      });
      if (!updateOrder) {
        throw new Error("Order not found after update");
      }
      return updateOrder;
    }
    throw new Error("Order status not found");
  } catch (error) {
    throw error;
  }
};

export const updatDeliveryOrderService = async (
  id: number,
  delivery: number
) => {
  try {
    if (!id) {
      throw new Error("Order ID not found");
    }
    if (delivery == 0 || delivery == 1) {
      await Order.update({ delivery: delivery }, { where: { id: id } });
      const updateOrder = await Order.findOne({
        where: { id: id },
      });
      if (!updateOrder) {
        throw new Error("Order not found after update");
      }
      console.log(updateOrder);
      return updateOrder;
    }
    if (delivery == 2) {
      await Order.update({ delivery: delivery }, { where: { id: id } });
      await Order.update({ status: 2 }, { where: { id: id } });
      const updateOrder = await Order.findOne({
        where: { id: id },
      });
      if (!updateOrder) {
        throw new Error("Order not found after update");
      }
      return updateOrder;
    }
    throw new Error("Order delivery not found");
  } catch (error) {
    throw error;
  }
};

export const getShowOrderOfUser = async (id: number): Promise<Order[]> => {
  try {
    if (!id) throw new Error("Order not found");
    const findUser = await User.findOne({ where: { id: id } });
    if (!findUser) {
      throw new Error("Order not found");
    }
    const orders = await Order.findAll({ where: { userId: id } });
    return orders;
  } catch (error) {
    throw error;
  }
};

export const getShowOrderItemOfOrder = async (
  id: number
): Promise<OrderItem[]> => {
  try {
    if (!id) throw new Error("Order not found");
    const findOrderItem = await OrderItem.findOne({ where: { orderId: id } });
    if (!findOrderItem) {
      throw new Error("Order not found");
    }
    const orderItem = await OrderItem.findAll({
      where: { orderId: id },
      include: [{ model: Product, include: [Category, Size] }],
    });
    return orderItem;
  } catch (error) {
    throw error;
  }
};

export const deleteOrder = async (id: number) => {
  if (!id) {
    throw new Error("Please order id to delete");
  }
  if (id && isNaN(id)) {
    throw new Error("Invalid order id");
  }
  const orderById = await Order.findOne({ where: { id: id } });
  if (!orderById) {
    throw new Error("order not found");
  }
  return Order.destroy({
    where: { id: id },
  });
};
