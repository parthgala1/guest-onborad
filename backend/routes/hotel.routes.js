import express from "express";
import {
  createHotel,
  generateQRCode,
  getHotelById,
  getHotels,
  updateHotel,
  getHotelsByUser,
} from "../controllers/hotel.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/create", upload.single("image"), createHotel);
router.get("/get-all-hotels", getHotels);
router.get("/get-hotels-by-user/:userId", getHotelsByUser);
router.get("/get-hotel-by-id/:id", getHotelById);
router.put("/update-hotel/:id", upload.single("image"), updateHotel);
router.post("/generate-qr", generateQRCode);

export default router;
