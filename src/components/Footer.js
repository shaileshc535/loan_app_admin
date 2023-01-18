import React from "react";
import { Row, Col, Card } from "@themesberg/react-bootstrap";
import moment from "moment-timezone";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const currentYear = moment().get("year");

  return (
    <div>
      <footer className="footer section py-5">
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2022-{`${currentYear} `}
              <Card.Link
                href="#"
                className="text-blue text-decoration-none fw-normal"
              >
                DAMS Loan
              </Card.Link>
            </p>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
