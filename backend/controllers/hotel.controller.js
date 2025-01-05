import Hotel from "../models/hotel.model.js";
import cloudinary from "cloudinary";
import QRCode from "qrcode";
import User from "../models/user.model.js";

export const createHotel = async (req, res) => {
  const { name, address, userId } = req.body;
  try {
    if (name === "" || address === "") {
      throw new Error("All fields are required");
    }
    const existingHotel = await Hotel.findOne({ name });
    if (existingHotel) {
      throw new Error("Hotel already exists");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
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

    const hotel = await Hotel.create({ name, address, logo: imageUrl, user });
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

export const getHotelById = async (req, res) => {
  const { id } = req.params;
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    res.status(200).json(hotel);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getHotelsByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    const hotels = await Hotel.find({ user });
    if (!hotels) {
      throw new Error("No hotels found");
    }
    res.status(200).json(hotels);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const { name, address } = req.body;
  try {
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      throw new Error("Hotel not found");
    }
    hotel.name = name || hotel.name;
    hotel.address = address || hotel.address;
    if (req.file) {
      try {
        // Convert image to base64 and upload to Cloudinary
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file.mimetype};base64,${b64}`;

        const cldRes = await cloudinary.uploader.upload(dataURI, {
          resource_type: "auto",
        });

        hotel.logo = cldRes.secure_url;
      } catch (uploadError) {
        console.error(
          "Error uploading primary image to Cloudinary:",
          uploadError
        );
        return res.status(500).json({ error: "Error uploading primary image" });
      }
    }
    await hotel.save();
    res.status(200).json(hotel);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const generateQRCode = async (req, res) => {
  const { data } = req.body; // Data to encode in the QR code

  try {
    if (!data) {
      return res
        .status(400)
        .json({ error: "Data is required to generate QR code" });
    }

    // Generate QR code as a base64 image
    const qrCode = await QRCode.toDataURL(data);

    res.status(200).json({ qrCode });
  } catch (error) {
    console.error("Error generating QR code:", error);
    res.status(500).json({ error: "Failed to generate QR code" });
  }
};
