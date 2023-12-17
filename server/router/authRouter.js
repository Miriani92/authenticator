import express from "express";
import {
  login,
  logout,
  signup,
  verifyAccountByEmail,
} from "../controllers/authControllers.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/verify-email").post(verifyAccountByEmail);

export default router;
