import { CustomError } from "../errors/customError.js";
import { UnauthenticatedError } from "../errors/unauthenticatedError.js";
import { NotFoundError } from "../errors/notFoundError.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/badRequestError.js";
import User from "../models/User.js";
import Token from "../models/Token.js";
import { attachCookiesToResponse } from "../utils/token.js";

export const signup = async (req, res) => {
  console.log("body", req.body);
  const { name, email, password } = req.body;
  const isValidData = name && email && password;
  const isRegistered = await User.findOne({ email });

  if (!isValidData) {
    throw new BadRequestError("Please provide name, email, password");
  }

  if (isRegistered) {
    throw new BadRequestError("Already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const { _id, email: dbEmail } = user;

  const refreshToken = jwt.sign(
    { id: _id, email: dbEmail },
    process.env.JWT_SECRET
  );
  await Token.create({
    refreshToken,
    user: _id,
  });
  attachCookiesToResponse({ res, user, refreshToken });

  res.status(StatusCodes.CREATED).json({
    message: "Success! Please check your email to verify account",
  });
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
export const verifyAccountByEmail = async (req, res) => {};
