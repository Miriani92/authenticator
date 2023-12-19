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
  console.log("body:", req.body);
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

  attachCookiesToResponse({
    res,
    user: { id: _id.toString(), email: dbEmail },
    refreshToken,
  });

  res.status(StatusCodes.CREATED).json({
    message: "Success! user Registered",
    user,
  });
};
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }

  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user, refreshToken });
    res.status(StatusCodes.OK).json({ user });
    return;
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  const userToken = { refreshToken, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};
export const verifyAccountByEmail = async (req, res) => {};
