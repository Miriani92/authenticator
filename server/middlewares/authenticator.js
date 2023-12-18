import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/unauthenticatedError.js";

const isTokenValid = ({ token }) => jwt.verify(token, process.env.JWT_SECRET);

export const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { email, userId } = isTokenValid({ token });
    req.user = { email, userId };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};
