import express from "express";
import {
  addGuest,
  getAllGuests,
  getGuestByHotelId,
} from "../controllers/guest.controller.js";

const router = express.Router();

router.post("/add", addGuest);
router.get("/all", getAllGuests);
router.get("/get-guest-by-hotel-id/:id", getGuestByHotelId);

export default router;
