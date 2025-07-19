import { useContext, useRef, useState } from "react";
import { assets, carCategory, carFuelType, carTransmission, cityList } from "../../assets/assets";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";


const AddCar = () => {
  const {token, axios} = useContext(AppContext);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [dailyPrice, setDailyPrice] = useState("");
  const [category, setCategory] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [seatingCapacity, setSeatingCapacity] = useState("");
  const [location, setLocation] = useState("")
  const [description, setDescription] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  const eleRef = useRef()

  // Add Car
  const addCarHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    if (!image) {
      return toast.error("Please select your car image");
    }
    const formData = new FormData();
    formData.append("brand", brand)
    formData.append("model", model)
    formData.append("image", image)
    formData.append("year", year)
    formData.append("category", category)
    formData.append("seating_capacity", seatingCapacity)
    formData.append("fuel_type", fuelType)
    formData.append("transmission", transmission)
    formData.append("pricePerDay", dailyPrice)
    formData.append("location", location)
    formData.append("description", description)
    try {
      const response = await axios.post("/api/car/add", formData, {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        toast.success(response.data.message);
        setBrand("")
        setModel("")
        setImage("")
        setYear("")
        setCategory("")
        setSeatingCapacity("")
        setFuelType("")
        setTransmission("")
        setDailyPrice("")
        setLocation("")
        setDescription("")
      }
    }catch(error) {
     toast.error(error.response.data.message || error.message)
    } finally {
      setIsLoading(false)
      if (eleRef.current) {
        eleRef.current.scrollIntoView({top:0, behavior: "smooth"})
      }
    }
    
  }

  return (
    <div className="py-10 px-[10px] md:px-10" ref={eleRef}>

      {/* Head */}
      <div className="flex items-start">
        <Title title={"Add New Car"} subTitle={"Fill in details to list a new car for booking, including pricing, availability, and car specifications."} align={"text-left"} />
      </div>

      {/* Form */}
      <div className="my-10 w-full lg:w-[680px]">
        <form onSubmit={addCarHandler} className="flex flex-col gap-6 w-full">

          {/* Image */}
          <div className="flex items-center gap-5">
            <label htmlFor="car-image" className="w-40 h-20 cursor-pointer rounded-md overflow-hidden border border-primary">
              <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt="upload-icon" className="w-full h-full object-cover" />
              <input type="file" id="car-image" hidden onChange={(event) => { setImage(event.target.files[0]) }} />
            </label>
            <p className="text-gray-500 text-sm">Upload a picture of your car</p>
          </div>

          {/* Brand + model */}
          <div className="w-full flex items-center gap-3">
            <div className="flex-1">
              <label className="text-gray-500 mb-1 ml-1">Brand</label>
              <input required onChange={(event) => { setBrand(event.target.value) }} value={brand}
                type="text" placeholder="e.g BMW, Mercdes, Audi..." className="block w-full py-1.5 px-3 outline-none border border-gray-400 rounded-md text-gray-500" />
            </div>
            <div className="flex-1">
              <label className="text-gray-500 mb-1 ml-1">Model</label>
              <input required onChange={(event) => { setModel(event.target.value) }} value={model}
                type="text" placeholder="e.g XS, E-Class, M4..." className="block w-full py-1.5 px-3 outline-none border border-gray-400 rounded-md text-gray-500" />
            </div>
          </div>

          {/* Year + dailyPrice + category */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-gray-500 mb-1 ml-1">Year</label>
              <input onChange={(event) => { setYear(event.target.value) }} value={year}
                required type="number" placeholder={new Date().getFullYear()} className="block w-full py-1.5 px-3 outline-none border border-gray-400 rounded-md text-gray-500" />
            </div>
            <div className="flex-1">
              <label className="text-gray-500 mb-1 ml-1">Daily Price ($)</label>
              <input onChange={(event) => { setDailyPrice(event.target.value) }} value={dailyPrice}
                required type="number" placeholder={"0"} className="block w-full py-1.5 px-3 outline-none border border-gray-400 rounded-md text-gray-500" />
            </div>
            <div className="flex-1">
              <label className="text-gray-500 ml-1 mb-1">Category</label>
              <select onChange={(event) => setCategory(event.target.value)} value={category}
                className="block w-full text-gray-500  py-1.5 px-3 outline-none border border-gray-400 rounded-md">
                <option disabled value={""}>Select a category</option>
                {
                  carCategory.map((cat, index) => (
                    <option value={cat} key={index}>{cat}</option>
                  ))
                }
              </select>
            </div>
          </div>

          {/* Transmission + Fuel_type + Seating_capacity */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="text-gray-500 mb-1 ml-1">Transmission</label>
              <select onChange={(event) => { setTransmission(event.target.value) }} value={transmission}
                className="block w-full text-gray-500 py-1.5 px-3 outline-none border border-gray-400 rounded-md">
                <option value={""}>Select a Trasmission</option>
                {
                  carTransmission.map((trans, index) => (
                    <option value={trans} key={index}>{trans}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex-1">
              <label className="text-gray-500 mb-1 ml-1">Fuel Type</label>
              <select onChange={(event) => { setFuelType(event.target.value) }} value={fuelType}
                className="block w-full text-gray-500 py-1.5 px-3 outline-none border border-gray-400 rounded-md">
                <option value={""}>Select a fuel type</option>
                {
                  carFuelType.map((fuel, index) => (
                    <option value={fuel} key={index}>{fuel}</option>
                  ))
                }
              </select>
            </div>
            <div className="flex-1">
              <label className="text-gray-500 ml-1 mb-1">Seating Capacity</label>
              <input onChange={(event) => { setSeatingCapacity(event.target.value) }} value={seatingCapacity}
                required type="number" placeholder="0" className="block w-full py-1.5 px-3 outline-none border border-gray-400 rounded-md" />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="text-gray-500 mbl-1 ml-1">Location</label>
            <select onChange={(event) => { setLocation(event.target.value) }} value={location}
              className="block w-full text-gray-500 py-1.5 px-3 outline-none border border-gray-400 rounded-md">
              <option value={""}>Select a Location</option>
              {
                cityList.map((city, index) => (
                  <option value={city} key={index}>{city}</option>
                ))
              }
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-gray-500 mbl-1 ml-1">Description</label>
            <textarea onChange={(event) => { setDescription(event.target.value) }} value={description}
              required type="text" placeholder="e.g. A luxurious SUV aith aspacious interior and a powerful engine."
              className="h-[150px] block w-full text-gray-500 py-1.5 px-3 outline-none border border-gray-400 rounded-md"
            />
          </div>

          {/* Button */}
          <button type="submit" disabled={isLoading && true} className={`block w-[143px] text-white flex items-center gap-1 text-center justify-center py-3 px-4 rounded-md transition-all duration-300 ${isLoading ? "bg-primary opacity-75" : "bg-primary hover:bg-primary-dull cursor-pointer"}`}>
            {
              isLoading 
              ?
              (<span>Loading ...</span>) 
              :
              (
                <>
                  <img src={assets.tick_icon} alt="check-icon" />
                  List Your Car
                </>
              )
            }
          </button>

        </form>
      </div>

    </div>
  );
};

export default AddCar;
