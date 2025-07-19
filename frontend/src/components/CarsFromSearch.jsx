import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import CarCard from "./CarCard";

const CarsFromSearch = () => {
  const { cars, searchNavbar, setSearchNavbar } = useContext(AppContext);
  const [filteringCars, setFilteringCars] = useState([]);


  // Apply Filtering
  const applyFiltering = () => {
    const carsData = [...cars];
    if (searchNavbar) {
      setFilteringCars(
        carsData.filter((car) => car.brand.toLowerCase().includes(searchNavbar.toLowerCase()) 
        || car.model.toLowerCase().includes(searchNavbar.toLowerCase())
        || car.category.toLowerCase().includes(searchNavbar.toLowerCase())
      )
      )
    } else {
      setFilteringCars(carsData)
    }
  }

  useEffect(() => {
    applyFiltering()
  }, [searchNavbar])

  return filteringCars.length > 0 ? (
    <div className="absolute bg-gray-200 top-[100%] left-0 w-full h-[600px] overflow-y-scroll z-100 p-10 px-[3vw] sm:px-[4vw] md:px-[5vw] lg:px-[7vw]">
      <div className="grid grid-cols-auto gap-10">
        {
          filteringCars.map((car) => (
            <div key={car._id}> 
              <CarCard car={car}/>
            </div>
          ))
        }
      </div>
    </div>
  ) : null;
}

export default CarsFromSearch