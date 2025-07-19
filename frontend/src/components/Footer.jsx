import { assets } from "../assets/assets";
import { footerData } from "../assets/assets";
import {motion} from "motion/react";

const Footer = () => {
  return (
    <motion.div initial={{y:200, opacity: 0}} whileInView={{y:0, opacity:1}} transition={{duration: 0.8}}
    className="px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <div className="flex items-start flex-col sm:flex-row max-sm:gap-y-8 gap-4 py-16 pb-10">
        {/* First */}
        <div className="w-2/5 flex flex-col gap-4 items-start">
          <img src={assets.logo} alt="logo" />
          <p className="text-sm text-gray-600 font-medium">
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </p>
          <div className="flex items-center gap-2">
            <img
              src={assets.facebook_logo}
              alt="facebook_logo"
              className="w-6 cursor-pointer"
              onClick={() => {
                scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            />
            <img
              src={assets.instagram_logo}
              alt="instagram_logo"
              className="w-6 cursor-pointer"
              onClick={() => {
                scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            />
            <img
              src={assets.twitter_logo}
              alt="twitter_logo"
              className="w-6 cursor-pointer"
              onClick={() => {
                scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            />
            <img
              src={assets.gmail_logo}
              alt="gmail_logo"
              className="w-6 cursor-pointer"
              onClick={() => {
                scrollTo({ top: 0, left: 0, behavior: "smooth" });
              }}
            />
          </div>
        </div>
        {footerData.map((foot, index) => (
          <div key={index} className="w-1/5 flex sm:justify-end">
            <div>
              <h3 className="text-xl text-gray-700 font-semibold mb-4">
                {foot.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {foot.links.map((link, index) => (
                  <li
                    onClick={() => {
                      if (foot.onClick === true) {
                        scrollTo({ top: 0, left: 0, behavior: "smooth" });
                      }
                    }}
                    key={index}
                    className={`text-sm text-gray-600 font-medium ${
                      foot.onClick &&
                      "cursor-pointer transition-all duration-300 hover:underline"
                    }`}
                  >
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="py-3 border-t border-gray-400 flex items-center justify-between text-sm text-gray-600 font-medium">
        <p>CopyRight &copy; MostafaYassin292@gmail.com. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span
            className="cursor-pointer transition-all duration-300 hover:underline"
            onClick={() => {
              scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            Privacy
          </span>
          <span>|</span>
          <span
            className="cursor-pointer transition-all duration-300 hover:underline"
            onClick={() => {
              scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            Terms
          </span>
          <span>|</span>
          <span
            className="cursor-pointer transition-all duration-300 hover:underline"
            onClick={() => {
              scrollTo({ top: 0, left: 0, behavior: "smooth" });
            }}
          >
            Cookies
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Footer;
