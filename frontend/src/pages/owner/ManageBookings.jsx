import { useEffect, useState } from "react";
import Title from "../../components/Title";
import toast from "react-hot-toast";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";


const ManageBookings = () => {
  const {token , axios} = useContext(AppContext)
  const [myBookings, setMyBookings] = useState([]);

  // Get My Bookings based on Owner Property in Car
  const getMyBookings = async () => {
    try {
      const response = await axios.get("/api/booking/owner", {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        setMyBookings(response.data.bookings)
      }
    }catch(error) {
      console.log(error);
      toast.error(error.response.data.message || error.message)
    }
  }

  // Update Booking Status
  const updateBookingStatus = async (id, value) => {
    try {
      const response = await axios.post("/api/booking/update-status", {bookingId: id, value: value}, {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        toast.success(response.data.message);
        getMyBookings()
      }
    }catch(error) {
      console.log(error);
      toast.error(error.response.data.message || error.message)
    }
  }

  useEffect(() => {
    getMyBookings()
  }, [])


  return (
    <div className="py-10 px-[10px] md:px-10">

      {/* Head */}
      <div className="flex items-start">
        <Title title={"Manage Bookings"} subTitle={"Track all customer bookings, approve or cancel requests, and manage booking statuses."} align={"text-left"} />
      </div>

      {/* Show My Bookings */}
      <table className="my-10 block w-full border border-gray-400 rounded-md">
        <thead className="block w-full text-gray-800">
          <tr className="w-full grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-2 items-center text-left py-2 px-2">
            <th>Car</th>
            <th>Date Range</th>
            <th>Total</th>
            <th>Payment</th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody className="block w-full">
          {
            myBookings.map((booking) => (
              <tr key={booking._id} className="grid grid-cols-1 max-sm:gap-y-5 sm:grid-cols-[2fr_1fr_1fr_1fr_1fr] items-center gap-2 py-2 px-2 text-sm text-gray-600 border-t border-gray-400">
                <td className="flex items-center gap-2">
                  <img src={booking.car.image} alt="car-image" className="w-40 h-20 sm:w-12 sm:h-12 rounded-md object-cover" />
                  <p>{booking.car.brand} {booking.car.model}</p>
                </td>
                <td>{booking.pickupDate.split("T")[0]} To {booking.returnDate.split("T")[0]}</td>
                <td>${booking.price}</td>
                <td>Offline</td>
                <td className="sm:flex sm:justify-center">
                  {
                    booking.status === "pending"
                      ?
                      (
                        <select onChange={(event) => { updateBookingStatus(booking._id, event.target.value) }} value={booking.status} className="border border-gray-600 rounded-sm py-1 px-3 cursor-pointer">
                          <option value={"pending"}>Pending</option>
                          <option value={"cancelled"}>Cancelled</option>
                          <option value={"confirmed"}>Confirmed</option>
                        </select>
                      )
                      :
                      (
                        <span className={`${booking.status === "confirmed" ? "text-green-600" : "text-red-600"}`}>{booking.status}</span>
                      )
                  }
                </td>

              </tr>
            ))
          }
        </tbody>
      </table>

    </div>
  );
};

export default ManageBookings;
