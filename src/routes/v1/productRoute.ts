import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { addProduct } from "../../controllers/product";
import { createProductSchema } from "../../validation/product";

const productRouter = Router();

productRouter.post(
  "/add-product",
  validateRequest(createProductSchema),
  addProduct
);

/* productRouter.get("/get-all", listCategory);

productRouter.get("/:id", categoryById);

productRouter.patch(
  "/update-category",
  validateRequest(updateCategorySchema),
  categoryUpdate
); */

export default productRouter;

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category
 */

/**
 * @swagger
 * /v1/category/add-category:
 *   post:
 *     summary: create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: "Short"
 *               description: "short description"
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request
 */

/**
 * @swagger
 * /v1/category/get-all:
 *   get:
 *     summary: get all categories
 *     tags: [Category]
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
 * /v1/category/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to get
 *     responses:
 *       "200":
 *         description: OK
 *       "400":
 *         description: Bad Request
 */

/**
 * @swagger
 * /v1/category/update-category:
 *   patch:
 *     summary: update category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - description
 *             properties:
 *               id:
 *                 type: number
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               id: 1
 *               name: "Short"
 *               description: "short description"
 *     responses:
 *       "201":
 *         description: OK
 *
 *
 *       "400":
 *         description:  Bad Request
 */
