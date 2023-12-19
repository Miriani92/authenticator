import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  author: {
    type: String,
    unique: true,
    required: [true, "Please provide author"],
  },
  published: {
    type: Number,
    required: [true, "Please publish year"],
  },
});

export default mongoose.model("Book", BookSchema);
