import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  const userToken = req.headers.authorization;
  if (!userToken) {
    return res
      .status(401)
      .json({ success: false, message: "No Token Provided access denied" });
  }
  const token = userToken.split(" ")[1];
  if (token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decodedToken.id);
    req.user = { id: user._id }; //  {id:userId} = req.user
    next();
  } else {
    return res.status(403).json({
      success: false,
      message: "You are not allowed to access this resources, forbidden",
    });
  }
};

export default userAuth;
