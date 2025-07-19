import Title from "./Title";
import {motion} from "motion/react";

const Subscribe = () => {
  return (
    <motion.div initial={{y:100, opacity: 0}} whileInView={{y:0, opacity: 1}} transition={{duration: 0.8}}
    className="py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <Title
        title={"Never Miss a Deal!"}
        subTitle={
          "Subscribe to get the latest offers, new arrivals, and exclusive discounts"
        }
      />
      {/* Subscribe */}

      <div className="w-full md:w-[600px] lg:w-[800px] h-[45px] m-auto mt-8 overflow-hidden rounded-md border border-gray-400 flex items-center">
        <input
          type="text"
          placeholder="Enter your email id"
          className="block w-full h-[45px] px-3 outline-none text-gray-600"
        />
        <button className="w-[120px] h-[45px] bg-primary text-white text-center">
          Subscribe
        </button>
      </div>
    </motion.div>
  );
};

export default Subscribe;
