import BookingModel from "../models/bookingModel";
import CarModel from "../models/carModel";

/* --- Check Car Is Available --- */
const checkCarIsAvailable = async (car, pickupData, returnDate) => {
  const bookings = await BookingModel.find({
    car: car,
    pickupData: { $lte: returnDate },
    returnData: { $gte: pickupData }
  })
  return bookings.length === 0 ? true : false;
}

// Check Availability Of Cars Based On Location + pickupDate + returnDte
const checkAvailabilityOfCars = async (req, res) => {
  const { location, pickupDate, returnDate } = req.body;

  // Find Cars Based on location
  const cars = await CarModel.find({ location: location, isAvailable: true })

  const checkCarsAvailability = cars.map(async (car) => {
    const isAvailableCar = await checkCarIsAvailable(car._id, pickupDate, returnDate)
    return { ...car_doc, isAvailable: isAvailableCar }
  })

  let availabilityCars = new Promise.all(checkCarsAvailability);
  availabilityCars.filter((car) => car.isAvailable === true)

  return res.status(200).json({ success: true, availabilityCars: availabilityCars });

}


/* ----- Create Booking  ----- */
const createBooking = async (req, res) => {
  const { id: userId } = req.user;
  const { car, pickupDate, returnDate } = req.body;

  const isAvailableCar = await checkCarIsAvailable(car, pickupDate, returnDate)

  if (!isAvailableCar) {
    return res.status(400).json({ success: false, message: "Car Is Not Available" })
  }

  // Find Car
  const carData = await CarModel.findById(car)


  // Calculate Price Base one pickupDate & returnDate + pricePerDay [car Price]
  const picked = new Date(pickupDate);
  const returned = new Date(returnDate);
  const numOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24) * carData.pricePerDay);

  // booking Details
  const bookingDetails = {
    user: userId,
    owner: carData.owner,
    car: car,
    pickupDate: pickupDate,
    returnDate: returnDate,
    price: numOfDays
  }

  // Create new booking
  const newBooking = new BookingModel(bookingDetails);
  const booking = await newBooking.save();
  return res.status(201).json({ success: true, message: "Booking Created Successfully!" })

}

/*
user: objectId,
owner: objectId,
car: objectId,
pickupDate: Date,
returnDate: Date,
price: Number,
status: default pending
*/