import { StatusCodes } from "http-status-codes";
import { CustomError } from "./customError.js";

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
