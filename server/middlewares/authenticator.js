import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/unauthenticatedError.js";

const isTokenValid = (token) => jwt.verify(token, process.env.JWT_SECRET);

export const authenticateUser = async (req, res, next) => {
  try {
    const { refreshToken, accessToken } = req.cookies;

    if (accessToken) {
      const payload = isTokenValid(accessToken);
      console.log("payload:", payload);
      req.user = payload.user;
      return next();
    }

    const payload = isTokenValid(refreshToken);

    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });

    if (!existingToken || !existingToken?.isValid) {
      throw new UnauthenticatedError("Authentication Invalid");
    }

    attachCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });

    req.user = payload.user;
    next();
  } catch (error) {
    next();
  }
};
