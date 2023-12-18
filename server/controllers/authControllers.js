import { CustomError } from "../errors/customError.js";
import { BadRequestError } from "../errors/badRequestError.js";
import { UnauthenticatedError } from "../errors/unauthenticatedError.js";
import { NotFoundError } from "../errors/notFoundError.js";
import User from "../models/User.js";

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
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
export const verifyAccountByEmail = async (req, res) => {};
