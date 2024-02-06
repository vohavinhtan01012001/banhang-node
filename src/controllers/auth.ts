import {
  createAdmin,
  createUser,
  findOneUser,
  updateUserById,
  userExists,
  validatePassword,
} from "../services/userService";
import { NextFunction, Request, Response } from "express";
import { get, omit } from "lodash";
import { sign } from "../util/jwt";
import { generateOTP, verifyOTP } from "../util/otp";
import { sendOTP } from "../helpers/mailHelper";
import { ApiError } from "../util/ApiError";
import { ApiResponse } from "customDefinition";
const omitData = ["password"];

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = req.body;
    const userExist = await userExists({
      email: user.email,
    });
    if (userExist) {
      throw new ApiError(400, "Email is alredy used");
    }
    user = await createUser(user);
    const apiResponse: ApiResponse = {
      statusCode: 1,
      message: "User registered successfully",
    };
    return res.status(200).json(apiResponse);
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await findOneUser({ email });
    if (!user) {
      throw new ApiError(400, "Email id is incorrect");
    }

    const validPassword = await validatePassword(user.email, password);
    if (!validPassword) {
      throw new ApiError(400, "Password is incorrect");
    }

    const userData = omit(user?.toJSON(), omitData);
    const accessToken = sign({ ...userData });
    const apiResponse: ApiResponse = {
      statusCode: 1,
      message: "Login successful",
    };
    return res.status(200).json({
      user: userData,
      accessToken: accessToken,
      ...apiResponse,
    });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;

    let user = await findOneUser({ email });
    if (!user) {
      throw new ApiError(400, "Email id is incorrect");
    }
    user = user?.toJSON();
    // generate otp
    const otp = generateOTP(user.email);

    const send = await sendOTP(user.email, otp);
    // send otp to email
    if (!send) {
      throw new ApiError(400, "Failed to send OTP");
    }

    return res.status(200).json({
      msg: "Email sent sucessfully",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, otp, password } = req.body;

    let user = await findOneUser({ email });
    if (!user) {
      throw new ApiError(400, "Email id is incorrect");
    }
    user = user?.toJSON();
    const isValid = verifyOTP(user.email, otp);

    if (!isValid) {
      return res.status(400).send({
        error: true,
        errorMsg: "OTP is Incorrect",
      });
    }

    const updated = await updateUserById({ password }, user.id);

    return res.status(200).json({
      updated: updated[0],
      msg: updated[0] ? "Password reseted successfully" : "Failed to reset",
      error: false,
    });
  } catch (err) {
    next(err);
  }
};

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user: any = get(req, "user");
    if (user.role !== 1) {
      throw new Error("Access not granted");
    }
    const response: ApiResponse = {
      statusCode: 1,
      message: "Check admin successfully",
    };
    res.status(200).json({ status: response });
  } catch (err) {
    next(err);
  }
};

export const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let user = req.body;
    const userExist = await userExists({
      email: user.email,
    });
    if (userExist) {
      throw new ApiError(400, "Email is alredy used");
    }
    user = await createAdmin(user);
    const apiResponse: ApiResponse = {
      statusCode: 1,
      message: "Admin registered successfully",
    };
    return res.status(200).json(apiResponse);
  } catch (err) {
    next(err);
  }
};
