import React from "react";
import { Spinner } from "react-bootstrap";

const Loader = () => (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ height: "80vh" }}
  >
    <Spinner animation="border" role="status" variant="primary" />
    <span className="ms-3 fs-5">Loading backend...</span>
  </div>
);

export default Loader;
