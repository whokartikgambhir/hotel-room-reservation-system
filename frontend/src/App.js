import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import RoomGrid from "./components/RoomGrid";
import Controls from "./components/Controls";
import Loader from "./components/Loader";
import {
  getRooms,
  bookRooms,
  resetRooms,
  randomizeRooms,
  checkHealth,
} from "./services/api";

function App() {
  const [rooms, setRooms] = useState([]);
  const [travelTime, setTravelTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendReady, setBackendReady] = useState(false);

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
    const init = async () => {
      try {
        const health = await checkHealth();
        if (health.status === "ok") {
          setBackendReady(true);
          await fetchRooms();
        } else {
          console.warn("Backend not ready yet...");
        }
      } catch (err) {
        console.warn("Health check failed. Retrying in 5s...");
        setTimeout(init, 5000);
        return;
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  if (loading || !backendReady) return <Loader />;

  return (
    <Container>
      <h1 className="my-3 text-center">🏨 Hotel Room Reservation</h1>
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
