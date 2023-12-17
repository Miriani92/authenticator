import { StatusCodes } from "http-status-codes";
export const handleError = async (err, req, res) => {
  const errorInstance = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later",
  };
  return res
    .status(errorInstance.statusCode)
    .json({ message: errorInstance.message });
};
