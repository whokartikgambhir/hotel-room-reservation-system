import express from "express";
import {
  getAllRooms,
  bookRooms,
  randomizeRooms,
  resetRooms
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getAllRooms);
router.post("/book", bookRooms);
router.post("/randomize", randomizeRooms);
router.post("/reset", resetRooms);

export default router;
