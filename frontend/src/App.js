import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import RoomGrid from "./components/RoomGrid";
import Controls from "./components/Controls";
import { getRooms, bookRooms, resetRooms, randomizeRooms } from "./services/api";

function App() {
  const [rooms, setRooms] = useState([]);
  const [travelTime, setTravelTime] = useState(null);

  const fetchRooms = async () => {
    const res = await getRooms();
    setRooms(res.data);
  };

  const handleBook = async (count) => {
    try {
      const res = await bookRooms(count);
      setTravelTime(res.data.travelTime || 0);
      fetchRooms();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  const handleReset = async () => {
    await resetRooms();
    setTravelTime(null);
    fetchRooms();
  };

  const handleRandomize = async () => {
    await randomizeRooms();
    setTravelTime(null);
    fetchRooms();
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  return (
    <Container>
      <h1 className="my-3 text-center">Hotel Room Reservation</h1>
      <Controls
        onBook={handleBook}
        onReset={handleReset}
        onRandomize={handleRandomize}
        travelTime={travelTime}
      />
      <RoomGrid rooms={rooms} />
    </Container>
  );
}

export default App;
