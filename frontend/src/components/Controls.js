import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Controls = ({ onBook, onReset, onRandomize, travelTime }) => {
  const [count, setCount] = useState(1);

  return (
    <div className="d-flex flex-column gap-3 my-3">
      <div className="d-flex gap-3">
        <Form.Control
          type="number"
          min="1"
          max="5"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          style={{ width: "100px" }}
        />
        <Button variant="primary" onClick={() => onBook(count)}>
          Book
        </Button>
        <Button variant="danger" onClick={onReset}>
          Reset
        </Button>
        <Button variant="warning" onClick={onRandomize}>
          Randomize
        </Button>
      </div>

      {travelTime !== null && (
        <div className="alert alert-info p-2">
          🕓 Total travel time between booked rooms: <b>{travelTime} minutes</b>
        </div>
      )}
    </div>
  );
};

export default Controls;
