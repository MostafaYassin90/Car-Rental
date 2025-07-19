import { useContext, useEffect, useState } from "react";
import { assets, dummyCarData } from "../../assets/assets";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const ManageCars = () => {
  const {axios, token} = useContext(AppContext);
  const [carList, setCarList] = useState([]);

  // Get Car List basedon owner ID
  const getCarList = async () => {
    try {
      const response = await axios("/api/car/owner-cars", {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        setCarList(response.data.cars)
      }
    }catch (error) {
      console.log(error)
      toast.error(error.response.data.message || error.message)
    }
  }

  // update Car Availability
  const updateCarAvailability = async (carId) => {
    try {
      const response = await axios.post("/api/car/change-availability", {id: carId}, {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        toast.success(response.data.message);
        getCarList();
      }
    }catch (error) {
      console.log(error);
      toast.error(error.response.data.message || error.message)
    }
  }

  // delete Car
  const deleteCar = async (carId) => {
    try {
      const response = await axios.post("/api/car/delete", {id: carId}, {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        toast.success(response.data.message);
        getCarList()
      }
    }catch(error) {
      console.log(error);
      toast.error(error.response.data.message || error.message)
    }
  }


  useEffect(() => {
    getCarList()
  }, [])

  return (
    <div className="py-10 px-[10px] md:px-10">
      {/* Head */}
      <div className="flex items-start">
        <Title title={"Manage Cars"} subTitle={"View all listed cars, update their details, or remove them from the booking platform."} align={"text-left"} />
      </div>

      {/* Display Car List */}
      <table className="my-10 block w-full border border-gray-400 rounded-md">
        <thead className="block w-full py-2 px-2 text-gray-800">
          <tr className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 items-center text-left">
            <th>Car</th>
            <th>Category</th>
            <th>Price</th>
            <th>Status</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="block w-full">
          {
            carList.map((car) => (
              <tr key={car._id} className="grid grid-cols-1 max-sm:gap-y-5 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 text-sm text-gray-600 border-t border-gray-400">
                <td className="flex items-center gap-2">
                  <img src={car.image} alt="car-image" className="w-40 h-20 sm:w-12 sm:h-12 rounded-md object-cover" />
                  <div>
                    <p>{car.brand} {car.model}</p>
                    <p>{car.seating_capacity}Seats . {car.transmission}</p>
                  </div>
                </td>
                <td>{car.category}</td>
                <td>${car.pricePerDay}/Day</td>
                <td className={`${car.isAvailable ? "bg-green-400/15 text-green-600" : "bg-red-400/15 text-red-600"} w-fit py-1 px-2 rounded-full`}>{car.isAvailable ? "Avaliable" : "Not Avaliable"}</td>
                <td className="flex items-center gap-1 sm:justify-center">
                  <button onClick={() => {updateCarAvailability(car._id)}} className="cursor-pointer bg-primary/15 rounded-full">
                    <img src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="eye-icon" />
                  </button>
                  <button onClick={() => {deleteCar(car._id)}} className="cursor-pointer bg-red-400/15 rounded-full">
                    <img src={assets.delete_icon} alt="delete-icon" />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  )
};

export default ManageCars;
