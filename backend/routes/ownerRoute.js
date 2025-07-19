import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { changeUserRoleToOwner } from "../controllers/ownerController.js";

const ownerRouter = express.Router();

ownerRouter.post("/change-role", userAuth, changeUserRoleToOwner);

export default ownerRouter;
