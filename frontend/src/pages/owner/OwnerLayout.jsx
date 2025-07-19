import { Outlet, useNavigate } from "react-router-dom";
import OwnerNavbar from "../../components/owner/OwnerNavbar";
import Sidebar from "../../components/owner/Sidebar";
import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";

const OwnerLayout = () => {
  const {isOwner} = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    isOwner === false && navigate("/")
    }, [])
  
  return (
    <div className="min-h-screen">
      <OwnerNavbar />
      <div className="flex items-start min-h-screen">
        <Sidebar />
        <div className="flex-1 border-l border-gray-400 min-h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default OwnerLayout;
