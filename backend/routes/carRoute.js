import express from "express";
import upload from "./../middlewares/multer.js";
import {
  addCar,
  changeCarAvailability,
  deleteCar,
  getAllCarsForOwner,
  getAllCarsForUser,
  getSingleCar,
  ownerDashboardData,
} from "../controllers/carControllers.js";
import userAuth from "../middlewares/userAuth.js";

const carRouter = express.Router();

carRouter.post("/add", upload.single("image"), userAuth, addCar);
carRouter.get("/owner-cars", userAuth, getAllCarsForOwner);
carRouter.post("/change-availability", userAuth, changeCarAvailability);
carRouter.post("/delete", userAuth, deleteCar);
carRouter.get("/dashboard", userAuth, ownerDashboardData);
carRouter.get("/list", getAllCarsForUser);
carRouter.post("/single-car", getSingleCar);

export default carRouter;
