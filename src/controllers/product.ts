import { NextFunction, Request, Response } from "express";
import { ApiError } from "../util/ApiError";
import {
  createProduct,
  deleteProduct,
  detailProductAndCategoryService,
  filterCategoryAndSizeAndGenderAndPriceService,
  getAllProductByIdProductGroup,
  getAllProductGroup,
  getAllProductPageHomeService,
  getByIdProduct,
  getCategoryAndSizeService,
  getListProductOfCategoryService,
  getProductFavouriteService,
  getRandomProductsByGenderService,
  searchProductClientService,
  searchProductService,
  showCartService,
  updateStatusProductService,
} from "../services/productService";
import { ApiResponse, customRequest } from "customDefinition";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product";
import { updateProduct } from "../services/productService";
import fs from "fs";
import { getByIdCategory } from "../services/categoryService";
import Category from "../models/Category";

//admin
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req.body);
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

    const product = { ...req.body, ...listImages };
    const createdProduct = await createProduct(product);

    const response: ApiResponse = {
      statusCode: 1,
      message: `Product ${createdProduct.name} created successfully`,
    };
    res.status(200).json({ status: response, product: createdProduct });
  } catch (err) {
    next(err);
  }
};

export const listProductGroup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProductGroup();
    res.status(200).json({
      product: products,
    });
  } catch (err) {
    next(err);
  }
};

export const showProductGroupById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const products = await getAllProductByIdProductGroup(id);
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
    const productId = parseInt(req.params.id);

    const oldProduct = await Product.findByPk(productId);

    if (!oldProduct) {
      throw new ApiError(400, "Product not found");
    }
    console.log(req.files);
    const oldImageUrls = [
      oldProduct.image,
      oldProduct.image2,
      oldProduct.image3,
      oldProduct.image4,
    ];
    const newImageUrls: string[] = [];
    const files: any = req.files;
    for (let i = 1; i <= 4; i++) {
      const key = `image${i}`;
      const fileList = files[key];
      if (fileList && fileList.length > 0) {
        const file = fileList[0];
        const tempFilePath = `temp-${
          file.originalname ? file.originalname : ""
        }`;
        fs.writeFileSync(tempFilePath, file.buffer ? file.buffer : "");
        console.log(file.fieldname ? true : false);
        try {
          if (file.originalname) {
            const result = await cloudinary.uploader.upload(tempFilePath, {
              folder: "shopReactNode",
            });

            console.log(
              `Uploaded ${file.originalname} successfully: ${result.secure_url}`
            );

            fs.unlinkSync(tempFilePath);
            newImageUrls.push(result.secure_url);
            if (oldImageUrls[i - 1]) {
              const publicId: string = oldImageUrls[i - 1]
                .split("/")
                .pop()
                ?.split(".")[0];
              console.log(publicId);
              await cloudinary.uploader.destroy(
                "shopReactNode/" + publicId,
                function (error, result) {
                  console.log("result:" + result, "error:" + error);
                }
              );
            }
          } else {
            // Nếu không có file mới, giữ nguyên URL ảnh cũ
            newImageUrls.push(oldImageUrls[i - 1]);
          }
        } catch (error) {
          console.error(
            `Error uploading ${file.originalname} to Cloudinary:`,
            error
          );
          next(error);

          fs.unlinkSync(tempFilePath);
        }
      }
    }
    const product = {
      ...req.body,
      image: newImageUrls[0],
      image2: newImageUrls[1],
      image3: newImageUrls[2],
      image4: newImageUrls[3],
    };

    const updatedProduct = await updateProduct(product, productId);
    const response: ApiResponse = {
      statusCode: 1,
      message: `Product id ${updatedProduct.id} update successfully`,
    };

    return res.status(200).json({
      status: response,
      product: updatedProduct,
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
    await deleteProduct(id);
    const response: ApiResponse = {
      statusCode: 1,
      message: "Product delete successfully",
    };
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateStatusProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const status = req.body.status;
    const product = await updateStatusProductService(id, status);
    const response: ApiResponse = {
      statusCode: 1,
      message: `${product.name} ${
        product.status == 1 ? "activity" : "pause"
      } successfully`,
    };
    return res.status(200).json({ status: response });
  } catch (error) {
    next(error);
  }
};

export const searchProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    const product = await searchProductService(name);
    return res.status(200).json({ product: product });
  } catch (err) {
    next(err);
  }
};

//client
export const listProductClientHome = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = await getAllProductPageHomeService();
    return res.status(200).json({
      product: products,
    });
  } catch (err) {
    next(err);
  }
};

export const listProductOfCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const products = await getListProductOfCategoryService(id);
    const categoryById = await getByIdCategory(id);
    return res.status(200).json({
      product: products,
      category: categoryById,
    });
  } catch (err) {
    next(err);
  }
};

export const detailProductAndCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const nameCategory: string = req.params.slug;
    const { product, category, productGroup, listSize, productList } =
      await detailProductAndCategoryService(id, nameCategory);
    return res.status(200).json({
      product: product,
      category: category,
      productGroup: productGroup,
      listSize: listSize,
      productList: productList,
    });
  } catch (err) {
    next(err);
  }
};

export const searchProductClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const name = req.body.name;
    const product = await searchProductClientService(name);
    return res.status(200).json({ product: product });
  } catch (err) {
    next(err);
  }
};

export const showCartClient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const listCart = req.body.listCart;
    const {
      listProductCart,
      sumPriceCart,
    }: { listProductCart: any[]; sumPriceCart: number } = await showCartService(
      listCart
    );
    console.log(listProductCart);
    return res
      .status(200)
      .json({ listCart: listProductCart, sumPrice: sumPriceCart });
  } catch (error) {
    next(error);
  }
};

export const showProductFavourite = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.user.id);
    const uniqueProducts = await getProductFavouriteService(userId);
    return res.status(200).json({ productList: uniqueProducts });
  } catch (error) {
    next(error);
  }
};

export const showCategoryAndSize = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, size, minPrice, maxPrice } =
      await getCategoryAndSizeService();
    return res.status(200).json({ category, size, minPrice, maxPrice });
  } catch (error) {
    next(error);
  }
};

export const showFilterProduct = async (
  req: customRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
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
    } = req.body;
    const products = await filterCategoryAndSizeAndGenderAndPriceService({
      category,
      gender,
      size,
      priceMin,
      priceMax,
    });
    return res.status(200).json({ products: products });
  } catch (error) {
    next(error);
  }
};
