import { assets } from "../assets/assets";
import { motion } from "motion/react";

const Banner = () => {
  return (
    <motion.div initial={{y:100, opacity: 0}} whileInView={{y:0, opacity:1}} transition={{duration: 1, ease: "easeInOut"}}
     className="py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:p-[7vw]">
      <div className="flex flex-col md:flex-row justify-between gap-10 bg-gradient-to-r from-[#0558FE] to-[#A9CFFF] p-10 rounded-xl">
        {/* Left */}
        <div className="flex-1 max-md:flex max-md:flex-col max-md:gap-3 max-md:items-center max-md:text-center">
          <h3 className="text-white font-semibold text-3xl mb-3">
            Do You Own a Luxury Car?
          </h3>
          <p className="text-white w-full lg:w-[70%] font-medium">
            Monetize your vehicle effortlessly by listing it on CarRental. We
            take care of insurance, driver verification and secure payments — so
            you can earn passive income, stress-free.
          </p>
          <button className="block w-fit bg-white text-primary cursor-pointer mt-5 py-1.5 px-4 rounded-md transition-all duration-300 hover:scale-105">
            List your car
          </button>
        </div>
        {/* Right */}
        <div className="flex items-end max-md:justify-center">
          <motion.img initial={{x: 100, opacity:0}} whileInView={{x:0, opacity: 1}} transition={{duration: 1, delay:0.4, ease: "easeInOut"}}
            src={assets.banner_car_image}
            alt="banner-car-image"
            className="w-[400px]"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
