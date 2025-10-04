import React from "react";
import { Card } from "react-bootstrap";

const RoomGrid = ({ rooms }) => {
  return (
    <div className="d-flex flex-wrap gap-2">
      {rooms.map((room) => (
        <Card
          key={room.roomNumber}
          style={{
            width: "80px",
            textAlign: "center",
            backgroundColor: room.isBooked ? "#f28b82" : "#81c995",
            border: "1px solid #ccc",
          }}
        >
          <Card.Body>{room.roomNumber}</Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default RoomGrid;
