import Title from "./Title";
import { dummyTestimonialsData } from "./../assets/assets";
import {motion} from "motion/react";

const Testimonials = () => {
  return (
    <motion.div initial={{y:100, opacity: 0}} whileInView={{y:0, opacity: 1}} transition={{duration: 0.8}}
    className="py-16 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <Title
        title={"What Our Customers Say"}
        subTitle={
          "Discover why discerning travelers choose StayVenture for their luxury accommodations around the world."
        }
      />
      {/* Display Testimonials */}
      <div className="mt-10 grid grid-cols-auto gap-10">
        {dummyTestimonialsData.map((user, index) => (
          <motion.div initial={{scale: 0.7, opacity:0}} whileInView={{scale: 1, opacity: 1}} transition={{duration: 0.8, delay: 0.2}}
            className="shadow-xl p-5 rounded-md transition-all duration-300 hover:-translate-y-1.5"
            key={index}
          >
            {/* Image and name & city */}
            <div className="flex gap-2 items-center">
              <img src={user.image} alt="user-image" className="w-14" />
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-sm text-gray-600">{user.city}</p>
              </div>
            </div>
            {/* Stars */}
            <div className="flex items-center my-5 gap-1">
              {Array.from({ length: 5 }, (_, index) => (
                <img src={user.starIcon} key={index} />
              ))}
            </div>
            {/* Text */}
            <q className="text-gray-600">{user.text}</q>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
