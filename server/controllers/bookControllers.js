import Book from "../models/Book.js";
import { StatusCodes } from "http-status-codes";

export const getBookList = async (req, res) => {
  const { page = 1, limit = 50 } = req.query;
  try {
    const bookList = await Book.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);
    res.status(StatusCodes.OK).json({ bookList });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const getBook = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const book = await Book.findOne({ _id: userID });
    if (!book) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "no book with this id" });
    }
    res.status(StatusCodes.OK).json({ book });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const editBook = async (req, res) => {
  try {
    const { _id: userID } = req.body;
    const editedBook = await Book.findOneAndUpdate({ _id: userID }, req.body);

    if (!editedBook) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "no book with this id" });
    }

    res.status(StatusCodes.OK).json({ message: "edited", editBook });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const book = await Book.findOneAndDelete({ _id: userID });
    if (!book) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "no book with this id" });
    }

    const updatedUsers = await userModel.find();
    res.status(StatusCodes.OK).json({ updatedUsers });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export const addBook = async (req, res) => {
  const { title, published, author } = req.body;
  let book = req.body;
  const isValidData = title && published && author;

  if (!isValidData) {
    throw new BadRequestError("Please provide title, published, author");
  }
  try {
    const addedBook = await Book.create(book);
    res.status(StatusCodes.CREATED).json({ addedUser });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
