import mongoose, { Schema } from "mongoose";

const docSchema = new mongoose.Schema(
  {
    _id: String,
    content: String,
    // createdAt: "Date",
  },
  { timestamps: true }
);

export default mongoose.model("Document", docSchema);
