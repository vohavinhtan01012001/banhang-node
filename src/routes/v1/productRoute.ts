import { Router } from "express";
import {
  addProduct,
  desProduct,
  detailProductAndCategory,
  listProductClientHome,
  listProductGroup,
  listProductOfCategory,
  productById,
  productUpdate,
  searchProduct,
  searchProductClient,
  showCartClient,
  showCategoryAndSize,
  showFilterProduct,
  showProductFavourite,
  showProductGroupById,
  updateStatusProduct,
} from "../../controllers/product";
import { updateStatusProductSchema } from "../../validation/product";
import validateRequest from "../../middleware/validateRequest";
import multer from "multer";
import isAdmin from "../../middleware/isAdmin";
import requireUser from "../../middleware/requiresUser";

const productRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

//admin
productRouter.post(
  "/add-product",
  isAdmin,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

productRouter.get("/get-all", isAdmin, listProductGroup);
productRouter.get("/product-group/:id", isAdmin, showProductGroupById);

productRouter.get("/showById/:id", isAdmin, productById);

productRouter.patch(
  "/update-product/:id",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  isAdmin,
  productUpdate
);

productRouter.delete("/delete/:id", isAdmin, desProduct);
productRouter.patch(
  "/update-status/:id",
  validateRequest(updateStatusProductSchema),
  isAdmin,
  updateStatusProduct
);

productRouter.patch("/search", isAdmin, searchProduct);
//client
productRouter.get("/client/get-home", listProductClientHome);
productRouter.get("/client/get-collection/:id", listProductOfCategory);
productRouter.get(
  "/client/get-detailproduct/:slug/:id",
  detailProductAndCategory
);
productRouter.patch("/client/search", searchProductClient);
productRouter.post("/client/show-cart", showCartClient);
productRouter.get(
  "/client/show-productFavourite",
  requireUser,
  showProductFavourite
);
productRouter.get("/client/get-categoryandsize", showCategoryAndSize);
productRouter.post("/client/get-filterProduct", showFilterProduct);
export default productRouter;

/**
 * @swagger
 * /v1/product/add-product:
 *   post:
 *     security:
 *          - bearerAuth: []
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
 *     security:
 *          - bearerAuth: []
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
 *     security:
 *          - bearerAuth: []
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
 *     security:
 *          - bearerAuth: []
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
 * /v1/product/search:
 *   patch:
 *     summary: search product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             required:
 *               - name
 *             example:
 *               name: "Short"
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
 *     security:
 *          - bearerAuth: []
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

/**
 * @swagger
 * /v1/product/client/get-home:
 *   get:
 *     summary: get list product page home
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
 * /v1/product/client/get-collection/{id}:
 *   get:
 *     summary: get list product from collection
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

/**
 * @swagger
 * /v1/product/client/get-detailproduct/{slug}/{id}:
 *   get:
 *     summary: get list product from collection
 *     tags: [Product]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the product to get
 *       - name: slug
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Slug of the product to get
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
 * /v1/product/client/search:
 *   patch:
 *     summary: search product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *             required:
 *               - name
 *             example:
 *               name: "Short"
 *     responses:
 *       "201":
 *         description: OK
 *
 *
 *       "400":
 *         description:  Bad Request
 */
