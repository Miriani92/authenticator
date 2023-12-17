import dotenv from "dotenv";
import express from "express";
dotenv.config();
const port = process.env.PORT || 5000;

console.log("here");
const app = express();
app.listen(port, () => console.log(`server running on  port ${port}`));
