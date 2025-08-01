import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cars from "./pages/Cars";
import CarDetails from "./pages/CarDetails";
import MyBookings from "./pages/MyBookings";
import { useContext, useState } from "react";
import Login from "./components/Login";
import Footer from "./components/Footer";
import OwnerLayout from "./pages/owner/OwnerLayout";
import Dashboard from "./pages/owner/Dashboard";
import AddCar from "./pages/owner/AddCar";
import ManageCars from "./pages/owner/ManageCars";
import ManageBookings from "./pages/owner/ManageBookings";
import { Toaster } from "react-hot-toast"
import { AppContext } from "./context/AppContext";

const App = () => {
  const {showLogin, setShowLogin} = useContext(AppContext)
  const isOwnerLocation = useLocation().pathname.startsWith("/owner");

  return (
    <div>
      <Toaster />
      {showLogin && <Login setShowLogin={setShowLogin}/>}

      {!isOwnerLocation && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/owner" element={<OwnerLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>

      {!isOwnerLocation && <Footer />}
    </div>
  );
};

export default App;
