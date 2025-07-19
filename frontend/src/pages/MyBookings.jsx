import Title from "../components/Title";
import { assets } from "../assets/assets";
import { useState } from "react";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useEffect } from "react";
import {motion} from "motion/react";

const MyBookings = () => {
  const {token , axios} = useContext(AppContext);
  const [myBookings, setMyBookings] = useState([]);

  // Get MyBookings
  const getMyBookings = async () =>{
    try {
      const response = await axios.get("/api/booking/user", {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        setMyBookings(response.data.bookings);
      }
    } catch(error) {
      toast.error(error.response.data.message || error.message);
    }
  }

  useEffect(() => {
    token &&  getMyBookings()
  }, []);

  return (
    <motion.div initial={{y:100, opacity: 0}} animate={{y:0, opacity: 1}} transition={{duration: 0.8}}
     className="min-h-screen py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
     
      <div className="flex items-start">
        <Title
          title="My Bookings"
          subTitle="View and manage your car bookings"
          align={"text-left"}
        />
      </div>

      {/* Show Bookings */}
      {
        myBookings.length > 0 
        ? 
        <div className="flex flex-col gap-5 mt-10">
        {myBookings.map((book, index) => (
          <motion.div initial={{y:100, opacity: 0}} whileInView={{y:0, opacity: 1}} transition={{duration: 0.8, delay:0.4}}
            key={book._id}
            className="border border-gray-400 rounded-md p-5 flex flex-col md:flex-row gap-5 items-start justify-between"
          >
            {/* left */}
            <div className="w-full md:flex-1 flex flex-col sm:flex-row items-start gap-4 text-sm">
              {/* Car Details */}
              <div className="w-full sm:w-fit">
                <img
                  src={book.car.image}
                  alt="car-image"
                  className="w-full sm:w-[400px] h-[200px] object-cover rounded-xl"
                />
                <p className="text-[18px] font-semibold mt-2">
                  {book.car.brand} {book.car.model} Competition
                </p>
                <p className="text-gray-600">
                  {book.car.year} . {book.car.category} . {book.car.location}
                </p>
              </div>
              {/* rental period & pickup and return date */}
              <div className="w-full sm:flex-1">
                <div className="flex items-center gap-2">
                  <p className="bg-gray-100 py-2 px-2 rounded-lg text-xs font-medium">
                    Booking #{index + 1}
                  </p>
                  <p
                    className={`font-medium text-xs py-2 px-2 rounded-xl ${
                      book.status === "confirmed"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {book.status}
                  </p>
                </div>
                {/* rental period */}
                <div className="flex items-start gap-2 mt-2 mb-2">
                  <img
                    src={assets.calendar_icon_colored}
                    alt="calender-icon"
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-600">Rental Period</p>
                    <p>
                      {new Date(book.pickupDate).toLocaleDateString()} -{" "}
                      {new Date(book.returnDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {/* pick up Location */}
                <div className="flex items-start gap-2 mb-2">
                  <img
                    src={assets.location_icon_colored}
                    alt="location-icon"
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-600">Pick-up Location</p>
                    <p>{book.car.location}</p>
                  </div>
                </div>
                {/* Return Location */}
                <div className="flex items-start gap-2">
                  <img
                    src={assets.location_icon_colored}
                    alt="location-icon"
                    className="w-4 h-4 mt-1"
                  />
                  <div>
                    <p className="text-gray-600">Return Location</p>
                    <p>DownTown Office</p>
                  </div>
                </div>
              </div>
            </div>
            {/* right */}
            <div className="w-full md:w-fit flex flex-col gap-1 md:items-end">
              <p className="text-gray-600 text-sm">Total Price</p>
              <p className="text-primary text-[18px] font-semibold">
                ${book.price}
              </p>
              <p className="text-gray-600 text-sm">
                Booked on {new Date(book.createdAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
        :
        <div className="text-4xl text-gray-800 font-medium text-center mt-50">
          <p>Your Booking List Is Empty</p>
        </div>
      }


    </motion.div>
  );
};

export default MyBookings;
