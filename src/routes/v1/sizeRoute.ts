import { Router } from "express";
import isAdmin from "../../middleware/isAdmin";
import validateRequest from "../../middleware/validateRequest";
import { createSizeSchema } from "../../validation/size";
import { addSize, desSize, listSize } from "../../controllers/size";

const sizeRouter = Router();
sizeRouter.post(
  "/add-size",
  isAdmin,
  validateRequest(createSizeSchema),
  addSize
);

sizeRouter.get("/get-all", isAdmin, listSize);

sizeRouter.delete("/delete/:id", isAdmin, desSize);

//client
/* sizeRouter.get("/client/get-byid/:id", categoryById); */

export default sizeRouter;

/**
 * @swagger
 * tags:
 *   name: Size
 *   description: Size
 */

/**
 * @swagger
 * /v1/size/add-size:
 *   post:
 *     security:
 *          - bearerAuth: []
 *     summary: create a new size
 *     tags: [Size]
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
 *               name: "M"
 *               description: "Size m 45cm -> 80cm"
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
 * /v1/size/get-all:
 *   get:
 *     security:
 *          - bearerAuth: []
 *     summary: get all size
 *     tags: [Size]
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
 * /v1/size/delete/{id}:
 *   delete:
 *     security:
 *          - bearerAuth: []
 *     summary: delete a size
 *     tags: [Size]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the size to get
 *     responses:
 *       "201":
 *         description: OK
 *
 *
 *       "400":
 *         description:  Bad Request
 */
