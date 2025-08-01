import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["owner", "user"], default: "user" },
    image: { type: String, default: "" },
  },
  { timestamps: true, minimize: false }
);

// User Model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
