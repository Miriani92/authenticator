import mongoose from "mongoose";

const TokenSchema = new mongoose.Schema(
  {
    refreshToken: { type: String, required: true },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Token", TokenSchema);
