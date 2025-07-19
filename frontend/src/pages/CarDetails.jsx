import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Loading from "../components/Loading";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import {delay, easeIn, easeInOut, motion} from "motion/react";

const CarDetails = () => {
  const {token, axios} = useContext(AppContext)
  const { id } = useParams();
  const [carItem, setCarItem] = useState(null);
  const [pickupDate, setPickupDate] = useState("")
  const [returnDate, setReturnDate] = useState("")
  const navigate = useNavigate();

  // Get Car Item By ID
  const getCarItem = async() => {
    try {
      const response = await axios.post("/api/car/single-car", {id: id});
      if (response.data.success) {
        setCarItem(response.data.car)
      }
    }catch (error) {
      console.log(error)
      toast.error(error.response.data.message || error.message)
    }
  };

  // submitHandler
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!pickupDate || !returnDate) {
      toast.error("Please Select pickupData and returnData");
      return null;
    }

    try {
      const bookingDetails = {
        car: id,
        pickupDate: pickupDate,
        returnDate: returnDate
      }
      const response = await axios.post("/api/booking/create", bookingDetails, {
        headers: {Authorization: "Bearer " + token}
      });
      if (response.data.success) {
        toast.success(response.data.message)
        navigate("/my-bookings")
      }
    }catch (error) {
        toast.error(error.response.data.message || error.message)
    }
  };

  useEffect(() => {
    getCarItem();
  }, [id]);


  return carItem ? (
    <div className="py-16 min-h-screen px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      {/* Back to all cars */}
      <motion.button initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.8}}
        onClick={() => {
          navigate(-1);
        }}
        className="flex w-fit items-center gap-2 mb-6 text-gray-600 cursor-pointer"
      >
        <img
          src={assets.arrow_icon}
          alt="arrow-icon"
          className="w-3 rotate-180"
        />
        <span>Back to all cars</span>
      </motion.button>
      <div className="flex flex-col lg:flex-row items-start gap-10">
        {/* Left */}
        <motion.div initial={{y:100, opacity: 0}} animate={{y:0,opacity: 1}} transition={{duration: 0.8}} 
        className="w-full lg:flex-1">
          {/* Image */}
          <div className="rounded-xl overflow-hidden">
            <img
              src={carItem.image}
              alt="car-image"
              className="w-full xl:w-[90%] rounded-xl max-sm:h-auto h-[500px] object-cover bg-center"
            />
          </div>
          {/* Model & brand & category & years */}
          <div className="py-8">
            <h3 className="text-2xl font-semibold">
              {carItem.brand} {carItem.model}
            </h3>
            <p className="text-gray-700">
              {carItem.category} . {carItem.year}
            </p>
            <hr className="my-6 border-none h-[1px] w-full bg-gray-600" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              <div className="bg-gray-100 py-5 flex flex-col gap-1 items-center justify-center  rounded-md shadow-md">
                <img src={assets.users_icon} alt="user-icon" className="h-5" />
                <p>{carItem.seating_capacity} Seats</p>
              </div>
              <div className="bg-gray-100 py-5 flex flex-col gap-1 items-center justify-center  rounded-md shadow-md">
                <img src={assets.fuel_icon} alt="user-icon" className="h-5" />
                <p>{carItem.fuel_type}</p>
              </div>
              <div className="bg-gray-100 py-5 flex flex-col gap-1 items-center justify-center  rounded-md shadow-md">
                <img src={assets.car_icon} alt="user-icon" className="h-5" />
                <p>{carItem.transmission}</p>
              </div>
              <div className="bg-gray-100 py-5 flex flex-col gap-1 items-center justify-center  rounded-md shadow-md">
                <img
                  src={assets.location_icon}
                  alt="user-icon"
                  className="h-5"
                />
                <p>{carItem.location}</p>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="text-xl mb-3 font-semibold">Description</h3>
              <p className="text-gray-600">{carItem.description}</p>
            </div>
            <div className="mt-6">
              <h3 className="text-xl mb-3 font-semibold">Features</h3>
              <div className="flex flex-col gap-y-2 md:flex-row">
                <div className="text-gray-600 flex-1 flex flex-col gap-2">
                  <p className="flex items-center gap-1">
                    <img src={assets.check_icon} />
                    360 Camera
                  </p>
                  <p className="flex items-center gap-1">
                    <img src={assets.check_icon} />
                    GPS
                  </p>
                  <p className="flex items-center gap-1">
                    <img src={assets.check_icon} />
                    Rear View Mirror
                  </p>
                </div>
                <div className="text-gray-600 flex-1 flex flex-col gap-2">
                  <p className="flex items-center gap-1">
                    <img src={assets.check_icon} />
                    Bluetooth
                  </p>
                  <p className="flex items-center gap-1">
                    <img src={assets.check_icon} />
                    Heated Seats
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        {/* Right */}
        <motion.form initial={{y:100, opacity: 0}} animate={{y:0,opacity: 1}} transition={{duration: 0.8}} 
          onSubmit={submitHandler}
          className="w-full lg:w-[350px] border border-gray-100 rounded-md p-5 shadow-xl flex flex-col gap-6"
        >
          {/* Price */}
          <div className="flex items-center justify-between">
            <p className="text-xl font-semibold">${carItem.pricePerDay}</p>
            <p className="text-gray-700">per day</p>
          </div>
          <hr className="border-none h-[1px] w-full bg-gray-400" />
          {/* PickUp */}
          <div>
            <label
              htmlFor="pickup-date"
              className="text-gray-700 block mb-1 ml-1"
            >
              Pickup Date
            </label>
            <input
              onChange={(event) => {setPickupDate(event.target.value)}} value={pickupDate}
              type="date"
              min={new Date().toISOString().split("T")[0]}
              id="pickup-date"
              className="block w-full border border-gray-400 rounded-md py-2 px-3 outline-none text-gray-700"
            />
          </div>
          {/* Return Date */}
          <div>
            <label
              htmlFor="return-date"
              className="text-gray-700 block mb-1 ml-1"
            >
              Return Date
            </label>
            <input
              onChange={(event) => {setReturnDate(event.target.value)}} value={returnDate}
              type="date"
              id="return-date"
              className="block w-full border border-gray-400 rounded-md py-2 px-3 outline-none text-gray-700"
            />
          </div>
          {/* Button Book */}
          <button
            type="submit"
            className="block w-full bg-primary text-white py-2 px-3 font-medium rounded-md transition-all duration-300 hover:bg-primary-dull cursor-pointer"
          >
            Book Now
          </button>
          <p className="text-sm text-gray-600 text-center">
            No credit card required to reserve
          </p>
        </motion.form>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default CarDetails;