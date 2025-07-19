import express from "express";
import userAuth from "../middlewares/userAuth.js";
import { checkAvailabilityOfCar, createBooking, getOwnerBookings, getUserBookings, updateStatusOfBooking } from "../controllers/bookingControllers.js";

const bookingRouter = express.Router();


bookingRouter.post("/check-availability", checkAvailabilityOfCar);
bookingRouter.post("/create", userAuth, createBooking);
bookingRouter.get("/user", userAuth, getUserBookings);
bookingRouter.get("/owner", userAuth, getOwnerBookings);
bookingRouter.post("/update-status", userAuth, updateStatusOfBooking);

export default bookingRouter;