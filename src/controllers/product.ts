import { NextFunction, Request, Response } from "express";
import { ApiError } from "../util/ApiError";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getByIdProduct,
  updateProduct,
} from "../services/productService";
import { ApiResponse } from "customDefinition";
import { v2 as cloudinary } from "cloudinary";
import { CreateProduct } from "productType";

export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const imageUrls: string[] = [];

    let uploadPromises: Promise<void>[] | undefined;
    const file: any = req.files;
    const images: any = [];
    if (req.files) {
      const image1 = file.image1[0];
      const image2 = file.image2[0];
      const image3 = file.image3[0];
      const image4 = file.image4[0];
      images.push(image1, image2, image3, image4);
    }
    if (req.files) {
      uploadPromises = images.map((file: any) => {
        return new Promise<void>((resolve, reject) => {
          cloudinary.uploader
            .upload_stream(
              {
                folder: "shopReactNode",
              },
              (error: any, result: any) => {
                if (error) {
                  reject(error);
                } else {
                  imageUrls.push(result.secure_url);
                  resolve();
                }
              }
            )
            .end(file.buffer);
        });
      });
    }

    if (uploadPromises) {
      await Promise.all(uploadPromises);
    }

    const listImages = {
      image: imageUrls[0],
      image2: imageUrls[1],
      image3: imageUrls[2],
      image4: imageUrls[3],
    };
    // const body = req.body;
    // const {
    //   name,
    //   price,
    //   priceReduced,
    //   quantity,
    //   gender,
    //   status,
    //   categoryId,
    //   description,
    // }: {
    //   name: string;
    //   price: number;
    //   priceReduced: number;
    //   quantity: number;
    //   gender: number;
    //   status: number;
    //   categoryId: number;
    //   description: string;
    // } = body;

    // console.log(body);

    // const product = {
    //   name,
    //   price,
    //   priceReduced,
    //   quantity,
    //   gender,
    //   status,
    //   categoryId,
    //   description,
    //   ...listImages,
    // };
    // console.log(product);
    const product = { ...req.body, ...listImages };
    const createdProduct = await createProduct(product);
    
    const response: ApiResponse = {
      statusCode: 1,
      message: "Product created successfully",
    };
    res.status(200).json({ status: response, product: createdProduct });
  } catch (err) {
    next(err);
  }
};

export const listProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProduct();
    res.status(200).json({
      product: products,
    });
  } catch (err) {
    next(err);
  }
};

export const productById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const productId = await getByIdProduct(id);
    res.status(200).json({
      product: productId,
    });
  } catch (error) {
    next(error);
  }
};

export const productUpdate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const product = await updateProduct(req.body, id);
    res.status(200).json({
      product: product,
      msg: "Product updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const desProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const product = await deleteProduct(id);
    res.status(200).json({
      product: product,
      msg: "Product delete successfully",
    });
  } catch (error) {
    next(error);
  }
};
