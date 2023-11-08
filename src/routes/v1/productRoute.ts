import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  addProduct,
  desProduct,
  listProduct,
  productById,
  productUpdate,
} from "../../controllers/product";
import {
  createProductSchema,
  updateProductSchema,
} from "../../validation/product";

const productRouter = Router();

productRouter.post(
  "/add-product",
  validateRequest(createProductSchema),
  addProduct
);

productRouter.get("/get-all", listProduct);

productRouter.get("/:id", productById);

productRouter.patch(
  "/update-product/:id",
  validateRequest(updateProductSchema),
  productUpdate
);

productRouter.delete("/delete/:id", desProduct);

export default productRouter;

/**
 * @swagger
 * /v1/product/add-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - priceReduced
 *               - quantity
 *               - image
 *               - image2
 *               - image3
 *               - image4
 *               - gender
 *               - status
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               priceReduced:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: uri
 *               image2:
 *                 type: string
 *                 format: uri
 *               image3:
 *                 type: string
 *                 format: uri
 *               image4:
 *                 type: string
 *                 format: uri
 *               gender:
 *                 type: integer
 *               status:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *             example:
 *               name: "Short"
 *               description: "Short description"
 *               price: 20.99
 *               priceReduced: 18.99
 *               quantity: 100
 *               image: "https://example.com/image1.jpg"
 *               image2: "https://example.com/image2.jpg"
 *               image3: "https://example.com/image3.jpg"
 *               image4: "https://example.com/image4.jpg"
 *               gender: 1
 *               status: 1
 *               categoryId: 1
 *     responses:
 *       "201":
 *         description: Created
 *
 *       "400":
 *         description: Bad Request
 */

/**
 * @swagger
 * /v1/product/get-all:
 *   get:
 *     summary: get all products
 *     tags: [Product]
 *     responses:
 *       "201":
 *         description: OK
 *
 *
 *       "400":
 *         description:  Bad Request
 */

/**
 * @swagger
 * /v1/product/{id}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Product to get
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad Request
 */

/**
 * @swagger
 * /v1/product/update-product/{id}:
 *   patch:
 *     summary: update product
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - priceReduced
 *               - quantity
 *               - image
 *               - image2
 *               - image3
 *               - image4
 *               - gender
 *               - status
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               priceReduced:
 *                 type: number
 *               quantity:
 *                 type: integer
 *               image:
 *                 type: string
 *                 format: uri
 *               image2:
 *                 type: string
 *                 format: uri
 *               image3:
 *                 type: string
 *                 format: uri
 *               image4:
 *                 type: string
 *                 format: uri
 *               gender:
 *                 type: integer
 *               status:
 *                 type: integer
 *               categoryId:
 *                 type: integer
 *             example:
 *               name: "Short"
 *               description: "Short description"
 *               price: 20.99
 *               priceReduced: 18.99
 *               quantity: 100
 *               image: "https://example.com/image1.jpg"
 *               image2: "https://example.com/image2.jpg"
 *               image3: "https://example.com/image3.jpg"
 *               image4: "https://example.com/image4.jpg"
 *               gender: 1
 *               status: 1
 *               categoryId: 1
 *     responses:
 *       "201":
 *         description: OK
 *
 *
 *       "400":
 *         description:  Bad Request
 */

/**
 * @swagger
 * /v1/product/delete/{id}:
 *   delete:
 *     summary: delete a product
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to get
 *     responses:
 *       "201":
 *         description: OK
 *
 *
 *       "400":
 *         description:  Bad Request
 */
