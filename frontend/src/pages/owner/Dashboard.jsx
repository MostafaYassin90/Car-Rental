import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import { assets, dummyDashboardData } from "../../assets/assets";
import toast from "react-hot-toast";
import { AppContext } from "../../context/AppContext";

const Dashboard = () => {
  const {token, axios, isOwner} = useContext(AppContext);
  const [dashboardData, setDashboardData] = useState(null);

  // Get DashboardData
  const getDashboardData = async () => {
    try {
      const response = await axios.get("/api/car/dashboard", {
        headers: {authorization: "Bearer " + token}
      })
      if (response.data.success) {
        setDashboardData(response.data.dashBoardData)
      }
    }catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  };
  useEffect(() => {
    if (isOwner) {
      getDashboardData();
    }
  }, [isOwner]);

  console.log(dashboardData);

  return dashboardData && (
    <div className="py-10 px-[10px] md:px-10">

      {/* Head */}
      <div className="flex items-start text-left">
        <Title
          title={"Admin Dashboard"}
          subTitle={
            "Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
          }
          align={"text-left"}
        />
      </div>

      {/* Dashboard Details [cards]*/}
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-5">

        {/* Total Cars */}
        <div className="flex items-center justify-between p-5 border border-gray-400 rounded-md">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Cars</p>
            <p className="text-[18px] font-semibold">
              {dashboardData.totalCars}
            </p>
          </div>
          <div className="w-10 h-10 xl:w-14 xl:h-14 bg-primary/15 rounded-full flex items-center justify-center">
            <img src={assets.carIconColored} alt="car-icon" />
          </div>
        </div>

        {/* Total Bookings */}
        <div className="flex items-center justify-between p-5 border border-gray-400 rounded-md">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Bookings</p>
            <p className="text-[18px] font-semibold">
              {dashboardData.totalBookings}
            </p>
          </div>
          <div className="w-10 h-10 xl:w-14 xl:h-14 bg-primary/15 rounded-full flex items-center justify-center">
            <img src={assets.listIconColored} alt="car-icon" />
          </div>
        </div>

        {/* Pending Bookings */}
        <div className="flex items-center justify-between p-5 border border-gray-400 rounded-md">
          <div>
            <p className="text-sm font-medium text-gray-600">Pending Bookings</p>
            <p className="text-[18px] font-semibold">
              {dashboardData.pendingBookings}
            </p>
          </div>
          <div className="w-10 h-10 xl:w-14 xl:h-14 bg-primary/15 rounded-full flex items-center justify-center">
            <img src={assets.cautionIconColored} alt="car-icon" />
          </div>
        </div>

        {/* Compeleted Bookings */}
        <div className="flex items-center justify-between p-5 border border-gray-400 rounded-md">
          <div>
            <p className="text-sm font-medium text-gray-600">Confirmed Bookings</p>
            <p className="text-[18px] font-semibold">
              {dashboardData.completedBookings}
            </p>
          </div>
          <div className="w-10 h-10 xl:w-14 xl:h-14 bg-primary/15 rounded-full flex items-center justify-center">
            <img src={assets.listIconColored} alt="car-icon" />
          </div>
        </div>
      </div>

      {/* Recent Bookings + Monthly Revenue */}
      <div className="flex flex-col lg:flex-row items-start gap-5">
        <div className="w-full lg:flex-1 border border-gray-400 p-5 rounded-md">
          <div className="mb-5">
            <h3 className="text-[18px] font-medium">Recent Bookings</h3>
            <p className="text-gray-600">Latest Customer Bookings</p>
          </div>
          <div className="flex flex-col gap-5">
            {
              dashboardData.recentBookings.map((booking) => (
                <div key={booking._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/15 rounded-full flex items-center justify-center">
                      <img src={assets.listIconColored} alt="list-icon" />
                    </div>
                    <div>
                      <p>{booking.car.brand} {booking.car.model}</p>
                      <p className="text-sm text-gray-600">{new Date(booking.pickupDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-gray-700">${booking.price}</p>
                    <p className="border border-gray-400 rounded-full text-sm py-0.5 px-5">{booking.status}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
        <div className="w-full lg:w-[300px] xl:w-[400px] border border-gray-400 rounded-md p-5">
          <div className="mb-5">
            <h3 className="text-[18px] font-medium">Monthly Revenue</h3>
            <p className="text-gray-600">Revenue For Current Month</p>
          </div>
          <h2 className="text-2xl font-semibold text-primary">${dashboardData.monthlyRevenue}</h2>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
