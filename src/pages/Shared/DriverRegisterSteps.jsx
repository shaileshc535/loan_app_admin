import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Routes } from "../../routes";

const DriverRegisterSteps = ({ step1, step2 }) => {
  return (
    <div>
      <Nav className="justify-content-center mb-4">
        <Nav.Item>
          {step1 ? (
            <LinkContainer to={Routes.DriverInfo.path}>
              <Nav.Link>Driver Info</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Driver Info</Nav.Link>
          )}
        </Nav.Item>

        <Nav.Item>
          {step2 ? (
            <LinkContainer to={Routes.DriverDocs.path}>
              <Nav.Link>Driver Documents</Nav.Link>
            </LinkContainer>
          ) : (
            <Nav.Link disabled>Driver Documents</Nav.Link>
          )}
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default DriverRegisterSteps;
