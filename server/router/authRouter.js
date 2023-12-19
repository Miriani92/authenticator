import express from "express";
import {
  login,
  logout,
  signup,
  getCurrentUser,
} from "../controllers/authControllers.js";
import { authenticateUser } from "../middlewares/authenticator.js";

const router = express.Router();

router.route("/get-user").get(authenticateUser, getCurrentUser);
router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout/:id").delete(logout);

export default router;
