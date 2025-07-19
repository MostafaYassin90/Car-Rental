import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const CarCard = ({ car }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/car-details/${car._id}`);
        scrollTo(0, 0);
      }}
      className="bg-white shadow-xl rounded-md overflow-hidden transition-all duration-500 hover:-translate-y-1 cursor-pointer"
    >
      {/* Image and avaliable and price*/}
      <div className="relative h-60 overflow-hidden">
        <img
          src={car.image}
          alt="car-image"
          className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
        />
        {car.isAvaliable && (
          <p className="absolute top-4 left-4 bg-primary text-white text-sm py-1 px-2 rounded-md">
            Avaliable Now
          </p>
        )}
        <p className="absolute bottom-4 right-4 bg-black/100 py-1 px-2 rounded-md text-white font-medium">
          ${car.pricePerDay} <span className="text-gray-400">/ day</span>{" "}
        </p>
      </div>
      {/* Car Details */}
      <div className="p-5">
        <h3 className="font-semibold text-xl">
          {car.brand} {car.model}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-800">
          <p>{car.category}</p>
          <p>.</p>
          <p>{car.year}</p>
        </div>

        {/* Seats and fuel-type */}
        <div className="mt-5 text-sm text-gray-600 font-medium flex items-center">
          <div className="flex items-center gap-2 flex-1">
            <img src={assets.users_icon} className="h-4" />
            <p>{car.seating_capacity} Seats</p>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <img src={assets.fuel_icon} className="h-4" />
            <p>{car.fuel_type}</p>
          </div>
        </div>

        {/* location and transmission */}
        <div className="mt-3 text-sm text-gray-600 font-medium flex items-center">
          <div className="flex items-center gap-2 flex-1">
            <img src={assets.car_icon} className="h-4" />
            <p>{car.transmission}</p>
          </div>
          <div className="flex items-center gap-2 flex-1">
            <img src={assets.location_icon} className="h-4" />
            <p>{car.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
