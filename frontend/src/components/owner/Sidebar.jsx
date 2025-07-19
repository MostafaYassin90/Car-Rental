import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const {user, axios, token, getUserData} = useContext(AppContext); 
  const [image, setImage] = useState("");
  const activeLink = useLocation().pathname;


  // Update User Image
  const updateUserImage = async () => {
    try {
      const formData = new FormData();
      formData.append("image", image)
      const response = await axios.post("/api/user/update-profile", formData, {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        toast.success(response.data.message);
        getUserData();
        setImage("");
      }
    }catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }

  return (
    <div className="relative w-fit md:min-w-[250px] min-h-screen">
      {/* User Image */}
      <div className="h-[100px] md:h-[150px] px-2 flex flex-col gap-1 items-center justify-center">
        {image && (
          <button onClick={updateUserImage} className="absolute top-0 right-0 flex items-center gap-1 text-sm bg-primary/15 text-primary py-1 px-2 cursor-pointer">
            Save
            <img
              src={assets.check_icon}
              alt="tick-icon"
              className="h-3 hidden md:inline-block"
            />
          </button>
        )}
        <label
          htmlFor="image"
          className="group relative block w-8 h-8 md:w-14 md:h-14 rounded-full cursor-pointer"
        >
          <input
            type="file"
            id="image"
            hidden
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
          <img
            src={image ? URL.createObjectURL(image) : user?.image || assets.user_profile_default}
            alt="user-image"
            className="w-8 h-8 md:w-14 md:h-14 rounded-full"
          />
          <div className="bg-black/15 w-full h-full absolute top-0 left-0 right-0 bottom-0 rounded-full hidden group-hover:flex items-center justify-center ">
            <img src={assets.edit_icon} alt="edit-icon" />
          </div>
        </label>
        <p className="hidden md:block">{user?.name}</p>
      </div>
      {/* Links */}
      <div className="flex flex-col gap-1">
        {/* Dashboard */}
        <NavLink
          to={"/owner"}
          className={({ isActive }) =>
            `flex items-center gap-2 py-3 px-3 ${isActive
              ? "text-primary bg-primary/15 border-r-4 border-primary"
              : "text-gray-600"
            }`
          }
          end={"/dashboard"}
        >
          <img
            src={
              activeLink === "/owner"
                ? assets.dashboardIconColored
                : assets.dashboardIcon
            }
            alt="dashboard-icon"
          />
          <p className="hidden md:inline-block">Dashboard</p>
        </NavLink>
        {/* Add Car */}
        <NavLink
          to={"/owner/add-car"}
          className={({ isActive }) =>
            `flex items-center gap-2 py-3 px-3 text-gray-600 ${isActive
              ? "text-primary bg-primary/15 border-r-4 border-primary"
              : "text-gray-600"
            }`
          }
        >
          <img
            src={
              activeLink === "/owner/add-car"
                ? assets.addIconColored
                : assets.addIcon
            }
            alt="dashboard-icon"
          />
          <p className="hidden md:inline-block">Add Car</p>
        </NavLink>
        {/* Manage Cars */}
        <NavLink
          to={"/owner/manage-cars"}
          className={({ isActive }) =>
            `flex items-center gap-2 py-3 px-3 text-gray-600 ${isActive
              ? "text-primary bg-primary/15 border-r-4 border-primary"
              : "text-gray-600"
            }`
          }
        >
          <img
            src={
              activeLink === "/owner/manage-cars"
                ? assets.carIconColored
                : assets.carIcon
            }
            alt="dashboard-icon"
          />
          <p className="hidden md:inline-block">Manage Cars</p>
        </NavLink>
        {/* Manage Bookings */}
        <NavLink
          to={"/owner/manage-bookings"}
          className={({ isActive }) =>
            `flex items-center gap-2 py-3 px-3 text-gray-600 ${isActive
              ? "text-primary bg-primary/15 border-r-4 border-primary"
              : "text-gray-600"
            }`
          }
        >
          <img
            src={
              activeLink === "/owner/manage-bookings"
                ? assets.listIconColored
                : assets.listIcon
            }
            alt="dashboard-icon"
          />
          <p className="hidden md:inline-block">Manage Bookings</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
