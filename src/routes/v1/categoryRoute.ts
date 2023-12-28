import { Router } from "express";
import { isAdmin, validateRequest } from "../../middleware";
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
  listCategoryClient,
} from "../../controllers/category";

const categoryRouter = Router();

categoryRouter.post(
  "/add-category",
  isAdmin,
  validateRequest(createCategorySchema),
  addCategory
);
categoryRouter.get("/get-all", isAdmin, listCategory);

categoryRouter.get("/:id", isAdmin, categoryById);

categoryRouter.patch(
  "/update-category/:id",
  isAdmin,
  validateRequest(updateCategorySchema),
  categoryUpdate
);

categoryRouter.delete("/delete/:id", isAdmin, desCategory);

//client
categoryRouter.get("/client/get-all", listCategoryClient);
categoryRouter.get("/client/get-byid/:id", categoryById);

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
 *     security:
 *          - bearerAuth: []
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
 *      security:
 *          - bearerAuth: []
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
 *     security:
 *          - bearerAuth: []
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
 *     security:
 *          - bearerAuth: []
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

/**
 * @swagger
 * /v1/category/client/get-all:
 *   get:
 *     security:
 *          - bearerAuth: []
 *     summary: get all categories of collection
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
 * /v1/category/get-byid/{id}:
 *   get:
 *     security:
 *          - bearerAuth: []
 *     summary: get by id a category
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
