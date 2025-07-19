import { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import CarCard from "../components/CarCard";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import {motion} from "motion/react"

const Cars = () => {
  const {cars, axios} = useContext(AppContext);
  const [searchValue, setSearchValue] = useState("");
  const [filteringCars, setFilteringCars] = useState([]);

  const [searhParams] = useSearchParams();
  const locationData = searhParams.get("location");
  const pickupDateData = searhParams.get("pickupDate");
  const returnDateData = searhParams.get("returnDate");




  //     const response = await axios.post("/api/booking/check-availability", {location:locationData,pickupDate: pickupDateData,returnDate: returnDateData});
  //     if (response.data.success) {
  //       setFilteringCars(response.data.availableCars)
  //     }
  //     console.log(response)
  //   }catch (error) {
  //     toast.error(error.response.data.message || error.message)
  //   }
  // }

  // Apply Filtering
  const applyFiltering = async () => {
    const carsData = [...cars];
    if (locationData && pickupDateData && returnDateData) {
    try {
      const response = await axios.post("/api/booking/check-availability", {location:locationData,pickupDate: pickupDateData,returnDate: returnDateData});
      if (response.data.success) {
        setFilteringCars(response.data.availableCars)
      }
    }catch (error) {
      toast.error(error.response.data.message || error.message)
    }
    }else {
      if (searchValue) {
        setFilteringCars(
          carsData.filter(
            (car) =>
              car.brand.toLowerCase().includes(searchValue.toLocaleLowerCase()) ||
              car.model
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase()) ||
              car.category
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase())
          )
        );
      } else {
        setFilteringCars(carsData);
      }

    }
  };

  useEffect(() => {
    applyFiltering();
  }, [searchValue, cars, locationData]);




  return (
    <div
    className="min-h-screen">
      {/* Head */}
      <motion.div initial={{y:50, opacity: 0}} animate={{y:0, opacity: 1}} transition={{duration: 0.8}}
       className="h-[300px] bg-light px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] flex flex-col gap-4 items-center justify-center">
        <h2 className="text-4xl font-semibold">Available Cars</h2>
        <p className="text-gray-600">
          Browse our selection of premium vehicles available for your next
          adventure.
        </p>
        <div className="w-full px-3 md:w-[600px] h-[48px] bg-white rounded-full border border-gray-200 shadow-md flex items-center gap-1">
          <img src={assets.search_icon} alt="search-icon" className="h-5" />
          <input
            value={searchValue}
            onChange={(event) => {
              setSearchValue(event.target.value);
            }}
            type="text"
            placeholder="Search by make, model, or features"
            className="flex-1 h-[48px] outline-none text-gray-600"
          />
          <img src={assets.filter_icon} alt="filter-icon" className="h-5" />
        </div>
      </motion.div>

      {/* Display Cars */}
      <div className="px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw] py-16">
        <p>Showing {filteringCars.length} Cars</p>
        <div className="grid grid-cols-auto gap-10 mt-8">
          {filteringCars
            .filter((item) => item.isAvailable && true)
            .map((car, index) => (
              <motion.div key={index} initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration: 1, delay: 0.2}}>
                <CarCard car={car} />
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Cars;
