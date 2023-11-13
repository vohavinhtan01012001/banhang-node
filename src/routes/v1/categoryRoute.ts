import { Router } from "express";
import { validateRequest } from "../../middleware";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../../validation/category";
import {
  addCategory,
  categoryById,
  categoryUpdate,
  desCategory,
  listCategory,
} from "../../controllers/category";

const categoryRouter = Router();

categoryRouter.post(
  "/add-category",
  validateRequest(createCategorySchema),
  addCategory
);
categoryRouter.get("/get-all", listCategory);

categoryRouter.get("/:id", categoryById);

categoryRouter.patch(
  "/update-category/:id",
  validateRequest(updateCategorySchema),
  categoryUpdate
);

categoryRouter.delete("/delete/:id", desCategory);

export default categoryRouter;

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
 * /v1/category/update-category/{id}:
 *   patch:
 *     summary: update category
 *     tags: [Category]
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

/**
 * @swagger
 * /v1/category/delete/{id}:
 *   delete:
 *     summary: delete a category
 *     tags: [Category]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the category to get
 *     responses:
 *       "201":
 *         description: OK
 *
 *
 *       "400":
 *         description:  Bad Request
 */
