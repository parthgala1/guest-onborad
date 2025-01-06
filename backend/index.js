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

// Define allowed origins based on environment
const allowedOrigins = [
  "https://guest-onborad-client.vercel.app", // Production
  "http://localhost:5173", // Local development
  // Add any other origins as needed
];

// Configure CORS options
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  credentials: true,
  optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Accept"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Apply CORS middleware first
app.use(cors(corsOptions));

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

const PORT = process.env.PORT || 4224;

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the Hotel Management System API");
});

// Error handler for CORS
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    res.status(403).json({
      message: "CORS Error: Origin not allowed",
      error: err.message,
    });
  } else {
    next(err);
  }
});

// API routes
app.use("/auth", userRoutes);
app.use("/hotel", hotelRoutes);
app.use("/guests", guestRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Internal Server Error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server listening to PORT ${PORT}`);
});

connectToDatabase();

export default app;
