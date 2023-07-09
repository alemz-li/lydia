import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/lydia");
    console.log(">>> DB is connected");
  } catch (error) {
    console.log(error);
  }
};
