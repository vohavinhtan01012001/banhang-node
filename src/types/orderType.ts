import Product from "../models/Product";

export interface DetailOrdeType {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  address: string;
  note: string;
  sumPrice: number;
  status: number;
  pay: number;
  vnp_TxnRef: number;
  delivery: number;
  cancelOrder: number;
  userId: number | null;
}

export interface OrderItemType {
  id: number;
  quantity: number;
  price: number;
  sumPrice: number;
  Product: Product;
}

export interface vnpayment {
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Locale: string;
  vnp_CurrCode: string;
  vnp_TxnRef: string;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_Amount: number;
  vnp_ReturnUrl: string;
  vnp_IpAddr: any;
  vnp_CreateDate: string;
  vnp_BankCode: string;
}
