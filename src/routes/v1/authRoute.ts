import { Router } from "express";
import { isAdmin, validateRequest } from "../../middleware";
import {
  checkAdmin,
  forgotPassword,
  loginUser,
  registerAdmin,
  registerUser,
  resetPassword,
} from "../../controllers/auth";
import { loginSchema, registerSchema } from "../../validation/user";
const authRouter = Router();

authRouter.post("/register", validateRequest(registerSchema), registerUser);
authRouter.post("/login", validateRequest(loginSchema), loginUser);
authRouter.post("/forgot-password", forgotPassword);
authRouter.post("/reset-password", resetPassword);
authRouter.get("/check-admin", checkAdmin);
authRouter.post("/register-admin", validateRequest(registerSchema), registerAdmin);

export default authRouter;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /v1/authorization/register:
 *   post:
 *     summary: Register as a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - address
 *               - phone
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               fullname: "John Doe"
 *               email: "john.doe@example.com"
 *               password: "P@ssw0rd"
 *               address: "123 Main Street"
 *               phone: "+1234567890"
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
 * /v1/authorization/register-admin:
 *   post:
 *     summary: Register as a administrator
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - password
 *               - address
 *               - phone
 *             properties:
 *               fullname:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Must be unique
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *             example:
 *               fullname: "John Doe"
 *               email: "john.doe@example.com"
 *               password: "P@ssw0rd"
 *               address: "123 Main Street"
 *               phone: "+1234567890"
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
 * /v1/authorization/login:
 *   post:
 *     summary: Login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *             example:
 *               email: name@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: OK
 *
 *       "401":
 *         description: Invalid email or password
 *
 */

/**
 * @swagger
 * /v1/authorization/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: An email will be sent to reset password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               email: fake@example.com
 *     responses:
 *       "204":
 *         description: No content
 *       "404":
 *         description: Email not found
 *
 */

/**
 * @swagger
 * /v1/authorization/reset-password:
 *   post:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - otp
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *               otp:
 *                 type: string
 *             example:
 *               email: name@example.com
 *               password: password1
 *               otp: 123344
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: Password reset failed

 */
