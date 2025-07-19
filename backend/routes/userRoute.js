import express from "express";
import {
  getUserData,
  updateUserProfile,
  userLogin,
  userSignUp,
} from "../controllers/userControllers.js";
import upload from "../middlewares/multer.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/login", userLogin);
userRouter.get("/data", userAuth, getUserData);
userRouter.post("/update-profile", upload.single("image"), userAuth, updateUserProfile);

export default userRouter;
