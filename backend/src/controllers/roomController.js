import Room from "../models/Room.js";
import { calculateBooking } from "../utils/bookingLogic.js";

// Get all rooms
export const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find().sort({ floor: 1, roomNumber: 1 });
    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching rooms", error });
  }
};

// Book rooms
export const bookRooms = async (req, res) => {
  try {
    const { count } = req.body;
    if (!count || count < 1 || count > 5) {
      return res
        .status(400)
        .json({ message: "You can book between 1 and 5 rooms only." });
    }

    const rooms = await Room.find().lean();
    const { bookedRooms, travelTime } = calculateBooking(rooms, count);

    if (!bookedRooms || bookedRooms.length === 0) {
      return res.status(400).json({ message: "Not enough rooms available." });
    }

    await Room.updateMany(
      { roomNumber: { $in: bookedRooms } },
      { $set: { isBooked: true } }
    );

    res.json({
      message: "Rooms booked successfully",
      bookedRooms,
      travelTime,
    });
  } catch (error) {
    res.status(500).json({ message: "Error booking rooms", error: error.message });
  }
};

// Randomize occupancy
export const randomizeRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    const updates = rooms.map((room) => ({
      updateOne: {
        filter: { _id: room._id },
        update: { isBooked: Math.random() < 0.3 },
      },
    }));

    await Room.bulkWrite(updates);
    res.json({ message: "Rooms randomized successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error randomizing rooms", error });
  }
};

// Reset all rooms
export const resetRooms = async (req, res) => {
  try {
    await Room.updateMany({}, { isBooked: false });
    res.json({ message: "All rooms reset successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting rooms", error });
  }
};
