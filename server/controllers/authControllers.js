import { CustomError } from "../errors/customError.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const isDataProvided = !name || !email || !password;
  const isRegistered = await User.findOne({ email });
  if (!isDataProvided) {
    throw new CustomError.BadRequestError(
      "Please provide name, email, password"
    );
  }
  if (isRegistered) {
    throw new CustomError.BadRequestError("Already registered");
  }
};
export const login = async (req, res) => {};
export const logout = async (req, res) => {};
export const verifyAccountByEmail = async (req, res) => {};
