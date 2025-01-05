import express from "express";
import connectToDatabase from "./database/mongo.db.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import cloudinary from "cloudinary";

import userRoutes from "./routes/user.routes.js";
import hotelRoutes from "./routes/hotel.routes.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "https://guest-onborad-client.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

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

const server = app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});

connectToDatabase();
