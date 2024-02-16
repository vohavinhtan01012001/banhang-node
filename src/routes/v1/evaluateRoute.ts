import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { createEvaluateSchema } from "../../validation/evaluate";
import { addEvaluate } from "../../controllers/evaluate";

const evaluateRouter = Router();

evaluateRouter.post(
  "/client/add-evaluate",
  validateRequest(createEvaluateSchema),
  addEvaluate
);
export default evaluateRouter;

/**
 * @swagger
 * tags:
 *   name: Evaluate
 *   description: Evaluate
 */

/**
 * @swagger
 * /v1/evaluate/add-evaluate:
 *   post:
 *     summary: create a new evaluate
 *     tags: [Evaluate]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - productGroupId
 *               - rate
 *             properties:
 *               userId:
 *                 type: number
 *               productGroupId:
 *                 type: number
 *               rate:
 *                 type: number
 *             example:
 *               userId: "1"
 *               productGroupId: "1"
 *               rate: "1"
 *     responses:
 *       "201":
 *         description: Created
 *
 *
 *       "400":
 *         description:  Bad Request
 */
