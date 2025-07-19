import { useContext } from "react";
import { assets, cityList } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {motion} from "motion/react";

const Hero = () => {
  const { location, setLocation, pickupDate, setPickupDate, returnDate, setReturnDate} = useContext(AppContext);
  const navigate = useNavigate();

  const searchCars = () => {
    if (!location) {
      toast.error("Please Select Your Location")
      return null;
    }
    if (!pickupDate) {
      toast.error("Please Select Your pickupDate")
      return null;
    }
    if (!returnDate) {
      toast.error("Please Select Your returnDate")
      return null;
    }
    if (location && pickupDate && returnDate) {
      navigate(`/cars?location=${location}&pickupDate=${pickupDate}&returnDate=${returnDate}`)
    }
  }


  return (
    <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity:1 }} transition={{ duration: 0.8 , delay: 0.2}}
    className="px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] py-16 bg-gray-100 h-[calc(100vh-70px)] flex flex-col gap-10 items-center justify-center">
      <motion.h2 initial={{y: 70, opacity: 0}} animate={{y:0, opacity:1}} transition={{duration: 0.8, delay: 0.2}}
       className="text-5xl font-bold">Luxury cars on Rent</motion.h2>

    <motion.div initial={{y: 50, opacity: 0}} animate={{y:0, opacity:1}} transition={{duration: 0.8, delay: 0.2}}
    className="bg-white shadow-lg py-5 px-10 rounded-md md:rounded-full flex flex-col gap-y-4 md:flex-row items-center justify-between w-full lg:w-[800px]">
    
    <div className="flex items-center gap-10 flex-col gap-y-4 md:flex-row">

      {/* location */}
      <div className="flex flex-col gap-1">
        <select value={location} required onChange={(event) => {setLocation(event.target.value)}}>
          <option value={""}>Pickup Location</option>
          {
            cityList.map((city, index) => (
              <option value={city} key={index}>{city}</option>
            ))
          }
        </select>
        <p className="text-gray-600 text-sm">{location ? location : "Please select location"}</p>
      </div>

       {/* Pick-up Date */}
       <div className="flex flex-col gap-1">
        <label htmlFor="pickup-Date">Pick-up Date</label>
        <input value={pickupDate} onChange={(event) =>{setPickupDate(event.target.value)}}
        min={new Date().toISOString().split("T")[0]}
        type="date" id="pickup-Date" className="text-sm text-gray-600"/>
       </div>

       {/* Return Date */}
       <div className="flex flex-col gap-1">
        <label htmlFor="return-date">Return Date</label>
        <input value={returnDate} onChange={(event) => {setReturnDate(event.target.value)}} type="date" id="return-date" className="text-sm text-gray-600"/>
       </div>

    </div>

    <button onClick={searchCars} className="flex items-center bg-primary text-white py-2 px-5 rounded-full gap-2 cursor-pointer transition-all duration-300 hover:bg-primary-dull">
      <img src={assets.search_icon} alt="search-icon" className="brightness-300"/>
      Search
    </button>

    </motion.div>

      <motion.img initial={{y: 50, opacity: 0}} animate={{y:0, opacity:1}} transition={{duration: 0.8, delay: 0.2}}
      src={assets.main_car} alt="car-image" className="w-full lg:w-[800px]"/>
    </motion.div>
  )
}

export default Hero
