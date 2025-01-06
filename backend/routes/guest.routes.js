import express from "express";
import { addGuest, getAllGuests } from "../controllers/guest.controller.js";

const router = express.Router();

router.post("/add", addGuest);
router.get("/all", getAllGuests);

export default router;
