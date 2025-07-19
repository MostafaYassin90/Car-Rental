import mongoose from "mongoose";

// Booking Schema
const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  car: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
  pickupDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  price: { type: Number, required: true },
  status: { type: String, default: "pending" }
}, { timestamps: true, minimize: false });

// Booking Model
const BookingModel = mongoose.model("Booking", bookingSchema);

export default BookingModel;