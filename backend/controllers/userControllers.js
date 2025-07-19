import { z } from "zod";
import fs from "fs";
import imagekit from "../config/imageKit.js";
import UserModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// fn for generate token
const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY);
};

/* ------------ SignUp ------------*/
const userSignUp = async (req, res) => {
  try {
    const data = req.body; // name email password
    // const imageFile = req.file;

    // Validation
    const schema = z.object({
      name: z
        .string({ required_error: "Name Is Requried" })
        .min(2, { message: "Name Must Be At Least 2 Characters" })
        .max(100),
      email: z
        .string({ required_error: "Email Is Required" })
        .email({ message: "Please Enter a valid email" }),
      password: z
        .string({ required_error: "Password Is Required" })
        .min(6, { message: "Password Must Be At Least 6 characters" })
        .max(100),
    });

    const validation = schema.safeParse(data);

    if (!validation.success) {
      return res
        .status(400)
        .json({ success: false, message: validation.error.errors[0].message });
    }

    // Check If Username is Exists
    const isExistsUsername = await UserModel.findOne({ name: data.name });
    if (isExistsUsername) {
      return res
        .status(400)
        .json({ success: false, message: "Username Is Already Exists" });
    }

    // Check if email is Exists
    const isExistsEmail = await UserModel.findOne({ email: data.email });
    if (isExistsEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email Is Already Exists" });
    }

    // Upload Image
    // const imageBuffer = imageFile && fs.readFileSync(imageFile.path);

    // const response =
    //   imageFile &&
    //   imagekit.upload({
    //     file: imageBuffer,
    //     fileName: imageFile.originalname,
    //     folder: "/users",
    //   });

    // const optimizeImageUrl =
    //   imageFile &&
    //   imagekit.url({
    //     path: (await response).filePath,
    //     transformation: [
    //       { quality: "auto" },
    //       { format: "webp" },
    //       { width: "auto" },
    //     ],
    //   });

    // Hash Password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    // Generate User
    const userDetails = {
      name: data.name,
      email: data.email,
      password: hashedPassword,
    };
    const newUser = new UserModel(userDetails);
    const user = await newUser.save();

    // Generate Token
    const userJwtPayload = {
      id: user._id.toString(),
    };
    const token = generateToken(userJwtPayload);

    // Destructured User To Send Response Without Password
    const { password, ...other } = user._doc;

    return res.status(201).json({
      success: true,
      user: { ...other, token: token },
      message: `Welcome, ${user.name}`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------ SignUp ------------*/
const userLogin = async (req, res) => {
  try {
    const data = req.body; // email password

    // Validation
    const schema = z.object({
      email: z
        .string({ required_error: "Email Is Requried" })
        .email({ message: "Please tpye a valid email" }),
      password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password Must be at least 6 charaters" })
        .max(100),
    });

    const validation = schema.safeParse(data);

    if (!validation.success) {
      return res
        .status(400)
        .json({ success: false, message: validation.error.errors[0].message });
    }

    // Find email
    const user = await UserModel.findOne({ email: data.email });
    if (!user) {
      return req
        .status(400)
        .json({ success: false, message: "Email Or Password is wrong" });
    }

    // Compare the coming password with user password
    const comparePassword = await bcrypt.compare(data.password, user.password);
    if (!comparePassword) {
      return res
        .status(400)
        .json({ success: false, message: "Email Or Password is wrong" });
    }

    // Generate token
    const userJwtPayload = {
      id: user._id,
    };
    const token = generateToken(userJwtPayload);

    // Destructured user to send response without password
    const { password, ...other } = user._doc;

    // Send user + token
    return res
      .status(200)
      .json({ success: true, user: { ...other, token: token }, message: `Welcome, ${user.name}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get User Data
const getUserData = async (req, res) => {
  const { id: userId } = req.user;
  const user = await UserModel.findById(userId).select("-password");
  if (!user) {
    return res.status(404).json({ success: false, message: "User Not Found" });
  }
  return res.status(200).json({ success: true, user: user });
};

// update user profile
const updateUserProfile = async (req, res) => {

  try {
    const { id: userId } = req.user;
    const imageFile = req.file;

    // Upload Image to imagekit
    const imageBeffer = fs.readFileSync(imageFile.path);

    const response = imagekit.upload({
      file: imageBeffer,
      fileName: imageFile.originalname,
      folder: "/users"
    });

    const optimizeImageUrl = imagekit.url({
      path: (await response).filePath,
      transformation: [
        { format: "webp" }, { quality: "auto" }, { width: "1280" }
      ]
    })

    // Update user profile
    await UserModel.findByIdAndUpdate(userId, {
      $set: {
        image: optimizeImageUrl
      }
    })

    return res.status(200).json({ success: true, message: "Profile Picture Updated Successfully" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}



export {
  userSignUp,
  userLogin,
  getUserData,
  updateUserProfile
};

