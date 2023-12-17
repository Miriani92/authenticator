import mongoose from "mongoose";

export const connectToDb = async (url) => {
  mongoose.connect(url);
};
