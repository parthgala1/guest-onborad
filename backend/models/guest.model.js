import mongoose, { Schema } from "mongoose";

const guestSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    purposeOfVisit: {
      type: String,
      required: true,
    },
    stayDateFrom: {
      type: Date,
      required: true,
    },
    stayDateTo: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
    },
    idProofType: {
      type: String,
    },
    idProofNumber: {
      type: String,
    },
  },
  { timestamps: true }
);

const Guest = mongoose.model("Guest", guestSchema);
export default Guest;
