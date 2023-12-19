import express from "express";
import {
  addBook,
  deleteBook,
  editBook,
  getBook,
  getBookList,
} from "../controllers/bookControllers.js";

const router = express.Router();

router.route("/").get(getBookList);
router.route("/edit/:id").patch(editBook);
router.route("/add").post(addBook);
router.route("/delete/:id").delete(deleteBook);

export default router;
