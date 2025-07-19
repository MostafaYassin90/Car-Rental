import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("DB Connected Successfully!");
  } catch (error) {
    console.log("Failed To Connect DB" + error);
  }
};

export default connectDB;
