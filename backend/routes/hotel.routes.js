import express from "express";
import { createHotel, getHotels } from "../controllers/hotel.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/create", upload.single("image"), createHotel);
router.get("/get-all-hotels", getHotels);

export default router;
