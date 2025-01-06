import Guest from "../models/guest.model.js";

export const addGuest = async (req, res) => {
  const {
    name,
    mobileNumber,
    address,
    purposeOfVisit,
    stayDateFrom,
    stayDateTo,
    email,
    idProofType,
    idProofNumber,
  } = req.body;
  try {
    const guest = await Guest.findOne({ idProofNumber: idProofNumber });
    if (guest) {
      return res.status(400).json({ message: "Guest already exists" });
    }

    const newGuest = new Guest({
      name,
      mobileNumber,
      purposeOfVisit,
      address,
      stayDateFrom,
      stayDateTo,
      email,
      idProofType,
      idProofNumber,
    });

    await newGuest.save();

    res.status(201).json({ message: "Guest added successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find();
    res.status(200).json(guests);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
