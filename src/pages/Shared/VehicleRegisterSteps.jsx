import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const VehicleRegisterSteps = ({ step1, step2 }) => {
  return (
    <div>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to="/vehicle-info">
              <Nav.Link>Vehicle Info</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Vehicle Info</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step2 ? (
            <LinkContainer to="/vehicle-docs">
              <Nav.Link>Vehicle Documents</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Vehicle Documents</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default VehicleRegisterSteps;
