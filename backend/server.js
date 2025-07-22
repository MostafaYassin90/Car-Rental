import express from "express";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import userRouter from "./routes/userRoute.js";
import carRouter from "./routes/carRoute.js";
import ownerRouter from "./routes/ownerRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import "dotenv/config";

// App
const app = express();
const port = process.env.PORT || "4000";

// Configure
await connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// Endpoints
app.use("/api/user", userRouter);
app.use("/api/owner", ownerRouter);
app.use("/api/car", carRouter);
app.use("/api/booking", bookingRouter);
app.get("/", async (req, res) => {
  return res.send("API is working.");
});

// Listen
app.listen(port, () => {
  console.log(`Server Is Running on port ${port}`);
});
