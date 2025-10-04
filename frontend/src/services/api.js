import axios from "axios";

const API = axios.create({
  baseURL: "https://hotel-room-reservation-system-t7lq.onrender.com/api/rooms",
});

export const getRooms = () => API.get("/");
export const bookRooms = (count) => API.post("/book", { count });
export const resetRooms = () => API.post("/reset");
export const randomizeRooms = () => API.post("/randomize");
export const checkHealth = async () => {
  const res = await axios.get(
    "https://hotel-room-reservation-system-t7lq.onrender.com/api/health"
  );
  return res.data;
};
