import BookingModel from "../models/bookingModel.js";
import CarModel from "../models/carModel.js";
import UserModel from "../models/userModel.js";

/* --------- Check Availability ---------*/
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await BookingModel.find({
    car: car,
    pickupDate: { $lte: returnDate },
    returnDate: { $gte: pickupDate }
  })
  return bookings.length === 0 ? true : false;
}

// Check Availability Of Cars based on location and pickupData and returnDate
const checkAvailabilityOfCar = async (req, res) => {

  try {
    const { location, pickupDate, returnDate } = req.body;

    // Get All Cars who available for this location
    const cars = await CarModel.find({ location: location, isAvailable: true });

    // Check Car Availabilty for range date
    const availableCarsPromises = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
      return { ...car._doc, isAvailable: isAvailable }
    })

    let availableCars = await Promise.all(availableCarsPromises)
    availableCars = availableCars.filter((car) => car.isAvailable === true)

    return res.status(200).json({ success: true, availableCars: availableCars })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }

}

/* --------- Add Booking ---------*/
const createBooking = async (req, res) => {
  try {
    const { car, pickupDate, returnDate } = req.body;
    const { id: userId } = req.user; // user
    // Check Car is available
    const isAvailable = await checkAvailability(car, pickupDate, returnDate)

    if (!isAvailable) {
      return res.status(400).json({ success: false, message: "Car is not available" })
    }

    // Get Car Based on carId
    const carData = await CarModel.findById(car);

    // Calculate Price Based on pickupDate and returnDate
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const numOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24))
    const price = carData.pricePerDay * numOfDays

    // Create a booking
    const bookingDetails = {
      user: userId,
      owner: carData.owner,
      car: car,
      pickupDate: pickupDate,
      returnDate: returnDate,
      price: Number(price)
    }

    const newBooking = new BookingModel(bookingDetails);
    const booking = await newBooking.save();

    return res.status(201).json({ success: true, booking: booking, message: "Booking Created" })

  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// Get User Bookings
const getUserBookings = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const listOfBookings = await BookingModel.find({ user: userId }).populate("car").sort({ createdAt: -1 })
    return res.status(200).json({ success: true, bookings: listOfBookings })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// Get Owner Bookings
const getOwnerBookings = async (req, res) => {
  try {
    const { id: userId } = req.user;
    // get user to check if user is owner or not
    const user = await UserModel.findById(userId);
    if (user.role !== "owner") {
      return res.status(403).json({ success: false, message: "UnAuthorized" })
    }
    const bookings = await BookingModel.find({ owner: userId }).populate("car user").select("-user.password").sort({ createdAt: -1 });
    return res.status(200).json({ success: true, bookings: bookings })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

// Change Status of booking for owner
const updateStatusOfBooking = async (req, res) => {
  try {
    const { bookingId, value } = req.body;
    const { id: userId } = req.user;

    // Get User to check if user roler is owner or no
    const user = await UserModel.findById(userId);
    if (user.role !== "owner") {
      return res.status(500).json({ success: false, message: "UnAuthorized" })
    }

    // Find booking by id
    const booking = await BookingModel.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" })
    }

    // Update Booking status
    const updatedBooking = await BookingModel.findByIdAndUpdate(bookingId, {
      $set: {
        status: value
      }
    }, { new: true });

    return res.status(200).json({ success: true, updatedBooking: updatedBooking, message: "Booking Status Updated" })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}



export {
  createBooking,
  getUserBookings,
  getOwnerBookings,
  updateStatusOfBooking,
  checkAvailabilityOfCar
}