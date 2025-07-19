import imagekit from "../config/imageKit.js";
import fs from "fs";
import CarModel from "../models/carModel.js";
import UserModel from "../models/userModel.js";
import BookingModel from "../models/bookingModel.js";

/* ------------ Add Car ------------ */
const addCar = async (req, res) => {
  try {
    const {
      brand,
      model,
      year,
      pricePerDay,
      category,
      transmission,
      seating_capacity,
      fuel_type,
      location,
      description,
    } = req.body;
    const { id: userId } = req.user; // owner
    const imageFile = req.file; // image

    if (
      !brand ||
      !model ||
      !year ||
      !pricePerDay ||
      !category ||
      !transmission ||
      !seating_capacity ||
      !fuel_type ||
      !location ||
      !description
    ) {
      return res
        .status(400)
        .json({ success: false, message: "The Required data are missing." });
    }

    // Upload Image
    const imageBuffer = fs.readFileSync(imageFile.path);

    const response = imagekit.upload({
      file: imageBuffer,
      fileName: imageFile.originalname,
      folder: "/cars",
    });

    const optmizationImgUrl = imagekit.url({
      path: (await response).filePath,
      transformation: [
        { format: "webp" },
        { width: "1280" },
        { quality: "auto" },
      ],
    });

    // Create new car
    const carDetails = {
      owner: userId,
      brand: brand,
      model: model,
      image: optmizationImgUrl,
      year: Number(year),
      pricePerDay: Number(pricePerDay),
      category: category,
      transmission: transmission,
      seating_capacity: Number(seating_capacity),
      fuel_type: fuel_type,
      location: location,
      description: description,
    };

    const newCar = new CarModel(carDetails);
    const car = await newCar.save();

    return res
      .status(201)
      .json({ success: true, car: car, message: "Car Added Successfully!" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------ Get All Car For Owner ------------ */
const getAllCarsForOwner = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const cars = await CarModel.find({ owner: userId });
    return res.status(200).json({ success: true, cars: cars });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------ Change Car Avalibility ------------ */
const changeCarAvailability = async (req, res) => {
  try {
    const { id: carId } = req.body; // carId;
    const { id: userId } = req.user; // userId;

    // Find Car
    const findCar = await CarModel.findById(carId);
    if (!findCar) {
      return res.status(404).json({ success: false, message: "Car Not Found" });
    }

    // Check  Owner Car is match userId
    if (findCar.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You Are not allowed to access this resources, forbidden",
      });
    }

    // Update car availability
    await CarModel.findByIdAndUpdate(carId, {
      $set: {
        isAvailable: !findCar.isAvailable,
      },
    });
    return res
      .status(200)
      .json({ success: true, message: "Availability Toggled" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------ Owner Can Delete his car ------------ */
const deleteCar = async (req, res) => {
  try {
    const { id: carId } = req.body; // carId
    const { id: userId } = req.user; // userId

    // Find Car
    const car = await CarModel.findById(carId);
    if (!car) {
      return res
        .status(404)
        .json({ success: false, message: "Car Not Found." });
    }

    // Check if userId !== owner car property
    if (car.owner.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not allowed to access this resources, forbidden",
      });
    }

    // Delete Car
    await CarModel.findByIdAndUpdate(carId, {
      $set: {
        owner: null,
        isAvailable: false,
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Car Deleted Successfully." });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

/* ------------ Owner Dashboard Data ------------ */
const ownerDashboardData = async (req, res) => {
  try {
    const { id: userId } = req.user;

    // Find User By UserId To Check Role owner or not
    const user = await UserModel.findById(userId);
    if (user.role !== "owner") {
      return res.status(403).json({ success: false, message: "unauthorized" })
    }

    // Get Cars
    const totalCars = await CarModel.find({ owner: userId });

    // Get total bookings
    const totalBookings = await BookingModel.find({ owner: userId })
    const pendingBookings = totalBookings.filter((booking) => booking.status === "pending")
    const confirmedBookings = totalBookings.filter((booking) => booking.status === "confirmed")
    const recentBookings = await BookingModel.find({ owner: userId }).populate("car").sort({ createdAt: -1 }).limit(5)

    // Monthly Revenue
    const monthlyRevenue = totalBookings.slice().filter((booking) => booking.status === "confirmed")
      .reduce((acc, booking) => {
        return acc + booking.price
      }, 0)

    const dashBoardData = {
      totalCars: totalCars.length,
      totalBookings: totalBookings.length,
      pendingBookings: pendingBookings.length,
      completedBookings: confirmedBookings.length,
      recentBookings: recentBookings,
      monthlyRevenue: Number(monthlyRevenue)
    }

    return res.status(200).json({ success: true, dashBoardData: dashBoardData })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }

}

/* ------------ Get All Cars for users ------------ */
const getAllCarsForUser = async (req, res) => {
  try {
    const cars = await CarModel.find({});
    return res.status(200).json({ success: true, cars: cars })
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message })
  }
}

/* ------------ Get Single Car Based On carId ------------ */
const getSingleCar = async (req, res) => {
  try {
    const { id: carId } = req.body;
    const cars = await CarModel.find({})
    const car = cars.find((car) => car._id.toString() === carId)
    if (!car) {
      return res.status(404).json({ success: false, message: "Car Not Found." })
    }
    return res.status(200).json({ success: true, car: car })

  } catch (error) {
    return res.status(400).json({ success: false, message: error.message })
  }
}


export {
  addCar,
  getAllCarsForOwner,
  changeCarAvailability,
  deleteCar,
  ownerDashboardData,
  getAllCarsForUser,
  getSingleCar
};
