import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import CarsFromSearch from "./CarsFromSearch";

const Navbar = () => {
  const { token, setShowLogin,axios, isOwner, setIsOwner, logoutHander, searchNavbar, setSearchNavbar } = useContext(AppContext)
  const isHomePage = useLocation().pathname === "/";
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  // ChangeRole
  const changeRole = async () => {
    try {
      const response = await axios.post("/api/owner/change-role", {}, {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        setIsOwner(true)
        toast.success(response.data.message)
      }
    }catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }


  return (
    <motion.div initial={{y:-70, opactiy: 0}} animate={{y:0, opacity: 1}} transition={{duration: 0.5}}
      className={`relative ${isHomePage ? "bg-gray-100" : "bg-white"
        } py-5 h-[70px] px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] border-b border-gray-400 flex items-center gap-5 justify-between`}
    >
      {searchNavbar && <CarsFromSearch />}
      
      {/* Logo */}
      <div
        onClick={() => {
          navigate("/");
        }}
        className="w-fit cursor-pointer transition-all duration-300 hover:scale-105"
      >
        <img src={assets.logo} alt="logo" />
      </div>

      <div className="flex-1 flex items-center gap-10 justify-end max-sm:hidden">
        {/* Menu Links */}
        <ul className="flex items-center gap-6 md:gap-8">
          {menuLinks.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className="text-gray-700 font-medium"
            >
              {link.name}
            </NavLink>
          ))}
        </ul>

        {/* Search Bar */}
        <div className="bg-white max-lg:hidden w-[220px] h-[35px] rounded-full border border-gray-400 overflow-hidden flex">
          <input
          onChange={(event) => {setSearchNavbar(event.target.value)}} value={searchNavbar}
            type="text"
            placeholder="Search Cars"
            className="block h-[100%] w-[100%] px-3 py-2 placeholder:text-gray-600 text-sm outline-none"
          />
          <div className="w-[40px] h-[100%] bg-white flex items-center justify-center">
            <img src={assets.search_icon} alt="search-icon" />
          </div>
        </div>

        {/* ListCart or Dashboard & Login BTN */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => {
              isOwner ?
              navigate("/owner") 
              : changeRole()
            }}
            className="text-gray-700 font-medium cursor-pointer"
          >
            {isOwner ? "Dashboard" : "Car List"}
          </button>
          {
            token
              ?
              (
                <button
                  onClick={() => {
                    logoutHander();
                  }}
                  className="py-2 px-6 rounded-md bg-primary text-white cursor-pointer transition-all duration-300 hover:bg-primary-dull"
                >
                  Logout
                </button>
              )
              :
              (
                <button
                  onClick={() => {
                    setShowLogin(true);
                  }}
                  className="py-2 px-6 rounded-md bg-primary text-white cursor-pointer transition-all duration-300 hover:bg-primary-dull"
                >
                  Login
                </button>
              )
          }
        </div>
      </div>

      {/* Menu */}
      {showNav ? (
        <img
          src={assets.close_icon}
          alt="menu-icon"
          className="min-sm:hidden cursor-pointer"
          onClick={() => {
            setShowNav(false);
          }}
        />
      ) : (
        <img
          src={assets.menu_icon}
          alt="menu-icon"
          className="min-sm:hidden cursor-pointer"
          onClick={() => {
            setShowNav(true);
          }}
        />
      )}

      {/* Show Nav for responsive */}
      <div
        className={`absolute border-t overflow-hidden border-gray-400 ${isHomePage ? "bg-gray-100" : "bg-white"
          } top-[100%] right-0 ${showNav ? "w-full" : "w-0"
          }  h-[calc(100vh-70px)] transition-all duration-300 flex flex-col gap-4 py-5`}
      >
        <ul className="flex flex-col gap-4 px-5">
          {menuLinks.map((link, index) => (
            <NavLink
              to={link.path}
              key={index}
              className="text-gray-700 font-medium"
            >
              {link.name}
            </NavLink>
          ))}
        </ul>
        <div className="flex flex-col gap-4 items-start px-5">
          <button className="text-gray-700 font-medium">List cars</button>
          <button
            onClick={() => {
              setShowLogin(true);
            }}
            className="py-2 px-6 rounded-md bg-primary text-white cursor-pointer transition-all duration-300 hover:bg-primary-dull"
          >
            Login
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
