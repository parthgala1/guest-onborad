import express from "express";
import connectToDatabase from "./database/mongo.db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";

import userRoutes from "./routes/user.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";
import guestRoutes from "./routes/guest.routes.js";

dotenv.config();

const app = express();

const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? ["https://guest-onborad-client.vercel.app"] // Production origins
    : ["http://localhost:5173"]; // Development origins

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(cors(corsOptions));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

const PORT = process.env.PORT || 4224;

app.get("/", (req, res) => {
  res.send("Welcome to the Hotel Management System API");
});
app.use("/auth", userRoutes);
app.use("/hotel", hotelRoutes);
app.use("/guests", guestRoutes);

const server = app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});

connectToDatabase();
