import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const OwnerNavbar = () => {
  const {user} = useContext(AppContext);
  
  return (
    <div className="h-[70px] flex items-center justify-between py-5 px-5 border-b border-gray-400">
      <Link to={"/"}>
        <img src={assets.logo} alt="logo" className="w-35" />
      </Link>
      <p className="text-gray-600">Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default OwnerNavbar;
