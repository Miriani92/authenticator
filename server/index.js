import dotenv from "dotenv";
import "express-async-errors";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectToDb } from "./utils/connectDatabase.js";
import authRouter from "./router/authRouter.js";
import bookRouter from "./router/bookRouter.js";
import { handleError } from "./middlewares/errorHandler.js";
import path from "path";
dotenv.config();
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));

app.use(express.static(path.join(__dirname, "build")));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/books", bookRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

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
