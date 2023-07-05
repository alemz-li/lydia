import mongoose from "mongoose";

const biteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    language: {
      type: String,
    },
    code: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    isPublic: {
      type: Boolean,
      default: "false",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Bite", biteSchema);
