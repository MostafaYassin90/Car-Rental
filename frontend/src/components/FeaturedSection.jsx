import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import CarCard from "./CarCard";
import Title from "./Title";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { motion } from "motion/react";

const FeaturedSection = () => {
  const {cars} = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <motion.div initial={{y:120, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration: 1, ease: "easeInOut"}}
    className="py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <Title
        title={"Featured Vehicles"}
        subTitle={
          "Explore our selection of premium vehicles available for your next adventure."
        }
      />

      {/* Display Vehicles */}
      <motion.div initial={{y:120, opacity:0}} whileInView={{y:0, opacity:1}} transition={{duration: 1, delay:0.2}}
      className="grid grid-cols-auto gap-10 mt-20">
        {cars
          .filter((item) => item.isAvailable && true)
          .map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
      </motion.div>

      {/* Button */}
      <div className="flex justify-center mt-10">
        <button
          onClick={() => {
            navigate("/cars");
            scrollTo(0, 0);
          }}
          className="flex items-center gap-2 border border-gray-400 rounded-md py-1.5 px-5 cursor-pointer transition-all duration-300 hover:bg-gray-200"
        >
          <span>Explore all cars</span>
          <img src={assets.arrow_icon} />
        </button>
      </div>
    </motion.div>
  );
};

export default FeaturedSection;
