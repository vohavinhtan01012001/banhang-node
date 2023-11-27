export interface CreateProductType {
  id: number;
  name: string;
  price: number;
  quantity: number;
  gender: number;
  status: number;
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
  gender: number;
  status: number;
  categoryId: number;
  description: string;
  image: string;
  image2: string;
  image3: string;
  image4: string;
}
