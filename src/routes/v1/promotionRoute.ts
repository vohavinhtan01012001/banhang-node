import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import {
  addProductInPromotion,
  addPromotion,
  desPromotion,
  getListAddProduct,
  getListProductPro,
  listPromotion,
  updatePromotion,
  updateStatusPromotion,
} from "../../controllers/promotion";
import {
  createPromotionSchema,
  updatePromotionSchema,
  updateStatusPromotionSchema,
} from "../../validation/promotion";

const promotionRouter = Router();
promotionRouter.post(
  "/add-promotion",
  validateRequest(createPromotionSchema),
  addPromotion
);

promotionRouter.get("/get-all", listPromotion);
promotionRouter.patch(
  "/update-status/:id",
  validateRequest(updateStatusPromotionSchema),
  updateStatusPromotion
);
promotionRouter.patch(
  "/update-promotion/:id",
  validateRequest(updatePromotionSchema),
  updatePromotion
);

promotionRouter.patch("/update-product/:id", addProductInPromotion);

promotionRouter.delete("/delete/:id", desPromotion);
promotionRouter.get("/get-product-promotion/:id", getListProductPro);
promotionRouter.get("/get-allproduct/:id", getListAddProduct);

export default promotionRouter;

/**
 * @swagger
 * tags:
 *   name: Promotion
 *   description: Promotion
 */

/**
 * @swagger
 * /v1/promotion/add-promotion:
 *   post:
 *     summary: Create a new promotion
 *     tags: [Promotion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - discount
 *               - startDate
 *               - endDate
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *               discount:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: integer
 *                 enum: [0, 1]
 *             example:
 *               title: "Short"
 *               discount: 10
 *               startDate: "2023-11-20T00:00:00.000Z"
 *               endDate: "2023-12-20T00:00:00.000Z"
 *               status: 1
 *     responses:
 *       "201":
 *         description: Created
 *       "400":
 *         description: Bad Request
 */

/**
 * @swagger
 * /v1/promotion/update-status/{id}:
 *   patch:
 *     summary: update the status of a promotion
 *     tags: [Promotion]
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
 *             type: integer
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: integer
 *                 enum: [0, 1]
 *             example:
 *               status: 1
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
 * /v1/promotion/get-all:
 *   get:
 *     summary: get all promotions
 *     tags: [Promotion]
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
 * /v1/promotion/update-promotion/{id}:
 *   patch:
 *     summary: update the promotion
 *     tags: [Promotion]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the promotion to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             required:
 *               - title
 *               - discount
 *               - startDate
 *               - endDate
 *               - status
 *             properties:
 *               title:
 *                 type: string
 *               discount:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date-time
 *               endDate:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: integer
 *                 enum: [0, 1]
 *             example:
 *               title: "Short"
 *               discount: 10
 *               startDate: "2023-11-20T00:00:00.000Z"
 *               endDate: "2023-12-20T00:00:00.000Z"
 *               status: 1
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
 * /v1/promotion/delete/{id}:
 *   delete:
 *     summary: delete a Promotion
 *     tags: [Promotion]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the Promotion to get
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
 * /v1/promotion/get-product-promotion/{id}:
 *   get:
 *     summary: get all product of promotion
 *     tags: [Promotion]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the promotion to get
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
 * /v1/promotion/get-allproduct/{id}:
 *   get:
 *     summary: get all product add promotion
 *     tags: [Promotion]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the promotion to get
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
 * /v1/promotion/update-product/{id}:
 *   patch:
 *     summary: update the product in promotion
 *     tags: [Promotion]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the promotion to get
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema:
 *             type: object
 *             properties: any[]
 *             example:
 *               "0": 1
 *               "1": 2
 *               "2": 3
 *     responses:
 *       "201":
 *         description: OK
 *
 *
 *       "400":
 *         description:  Bad Request
 */
