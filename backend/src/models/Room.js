import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  floor: { type: Number, required: true },
  isBooked: { type: Boolean, default: false }
});

export default mongoose.model("Room", roomSchema);
