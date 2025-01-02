import Hotel from "../models/hotel.model.js";
import cloudinary from "cloudinary";

export const createHotel = async (req, res) => {
  const { name, address } = req.body;
  try {
    if (name === "" || address === "") {
      throw new Error("All fields are required");
    }
    const existingHotel = await Hotel.findOne({ name });
    if (existingHotel) {
      throw new Error("Hotel already exists");
    }
    let imageUrl = "";
    if (req.file) {
      try {
        // Convert image to base64 and upload to Cloudinary
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        const cldRes = await cloudinary.uploader.upload(dataURI, {
          resource_type: "auto",
        });

        imageUrl = cldRes.secure_url;
      } catch (uploadError) {
        console.error(
          "Error uploading primary image to Cloudinary:",
          uploadError
        );
        return res.status(500).json({ error: "Error uploading primary image" });
      }
    }

    const hotel = await Hotel.create({ name, address, logo: imageUrl });
    res.status(201).json(hotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels) {
      throw new Error("No hotels found");
    }
    res.status(200).json(hotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
