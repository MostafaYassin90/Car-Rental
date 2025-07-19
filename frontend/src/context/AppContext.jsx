import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);


const AppContextProvider = (props) => {
  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : "");
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [location, setLocation] = useState("")
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [searchNavbar, setSearchNavbar] = useState("");
  const backend_url = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [cars, setCars] = useState([])

  // Get User Data
  const getUserData = async (req,res) => {
    try {
      const response = await axios.get("/api/user/data", {
        headers: {Authorization: "Bearer " + token}
      })
      if (response.data.success) {
        setUser(response.data.user)
        setIsOwner(response.data.user.role === "owner")
      }
    }catch (error) {
      console.log(error)
      toast.error(error.response.data.message || error.message)
    }
  }

  // Get All Cars
  const getAllCars = async () => {
    try {
      const response = await axios.get("/api/car/list");
      if (response.data.success) {
        setCars(response.data.cars)
      }
    }catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message)
    }
  }

// Fn To Logout the user
const logoutHander = () => {
  window.localStorage.removeItem("token");
  setToken("");
  setUser(null);
  setIsOwner(false);
  toast.success("You have been logged out")
  navigate("/");
}

  useEffect(() => {
      if (token) {
        getUserData()
      }
  }, [token])

  useEffect(() => {
    getAllCars()
  }, [])

  
  const value = {
    token: token,
    setToken: setToken,
    backend_url: backend_url,
    axios: axios,
    user: user, 
    setUser: setUser,
    isOwner: isOwner,
    setIsOwner: setIsOwner,
    showLogin: showLogin, 
    setShowLogin: setShowLogin,
    cars: cars,
    getUserData: getUserData,
    getAllCars: getAllCars,
    logoutHander: logoutHander,
    location: location,
    setLocation: setLocation,
    pickupDate: pickupDate,
    setPickupDate: setPickupDate,
    returnDate:returnDate,
    setReturnDate: setReturnDate,
    setSearchNavbar: setSearchNavbar,
    searchNavbar: searchNavbar
  }


  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider