import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Room from "./models/Room.js";

dotenv.config();

const seedRooms = async () => {
  try {
    await connectDB();

    // clear old data
    await Room.deleteMany();

    const rooms = [];

    // Floors 1–9 has 10 rooms each
    for (let floor = 1; floor <= 9; floor++) {
      for (let i = 1; i <= 10; i++) {
        const roomNumber = floor * 100 + i;
        rooms.push({ roomNumber, floor, isBooked: false });
      }
    }

    // Floor 10 has 7 rooms
    for (let i = 1; i <= 7; i++) {
      const roomNumber = 1000 + i;
      rooms.push({ roomNumber, floor: 10, isBooked: false });
    }

    await Room.insertMany(rooms);

    console.log("Rooms seeded successfully");
    process.exit();
  } catch (err) {
    console.error("Error seeding rooms:", err.message);
    process.exit(1);
  }
};

seedRooms();
