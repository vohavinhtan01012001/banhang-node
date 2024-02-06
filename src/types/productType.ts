import { Category } from "categoryType";
import { Size } from "sizeType";

export interface CreateProductType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  gender: number;
  status: number;
  sizeId: number;
  categoryId: number;
  description: string;
  image: string;
  image2: string;
  image3: string;
  image4: string;
}

export interface UpdateProductType {
  name: string;
  price: number;
  quantity: number;
  size: number;
  gender: number;
  status: number;
  categoryId: number;
  description: string;
  image: string;
  image2: string;
  image3: string;
  image4: string;
}

export interface Cart {
  id: number;
  name: string;
  description: string;
  price: number;
  priceReduced: number;
  quantity: number;
  image: string;
  image2: string;
  image3: string;
  image4: string;
  gender: number;
  status: number;
  categoryId: number;
  Size: Size;
  promotionId: number;
  sizeId: number;
  productGroupId: number;
  Category: Category;
  quantityCart: number;
  priceCart: number;
}

export interface CartPayment {
  id: number;
  quantityCart: number;
  priceCart: number;
}

