import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDb } from "./utils/connectDatabase.js";
import authRouter from "./router/authRouter.js";
import { handleError } from "./middlewares/errorHandler.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());
app.use("/api/v1/auth", authRouter);

// app.use((req, res) => res.status(404).send("Route does not exist"));

app.use(handleError);

const handleConnection = async () => {
  try {
    await connectToDb(process.env.MONGO_URI);
  } catch (error) {
    console.log("error:", error);
  }
};

app.listen(port, () => console.log(`server running on  port ${port}`));

handleConnection();
