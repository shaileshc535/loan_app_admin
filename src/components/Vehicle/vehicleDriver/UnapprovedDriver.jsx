import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./Driver.css";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";
import {
  ApproveDriver,
  UnApproveDriver,
} from "../../../redux/action/vehicleDriverAction";
import { ToastContainer } from "react-toastify";

const UnapprovedDriver = ({ showChange, id }) => {
  const dispatch = useDispatch();

  let driver = useSelector((state) => state.vehicleDriver.singledata);

  let error = useSelector((state) => state.vehicleDriver.error);
  let loading = useSelector((state) => state.vehicleDriver.loading);

  let handleUnApprove = (e) => {
    e.preventDefault();
    dispatch(UnApproveDriver(id));
    showChange();
  };

  let handleApprove = (e) => {
    e.preventDefault();
    dispatch(ApproveDriver(id));
    showChange();
  };

  return (
    <div className="content">
      <ToastContainer />
      <div className="my-4">
        <Button
          onClick={() => showChange()}
          className="btn btn-sm btn-warning mx-2"
        >
          Back
        </Button>
      </div>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          {driver.map((item) => (
            <Col key={item.id} xs={12} xl={12}>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Header xs={12}>
                  <h5 className="mb-4">Driver information</h5>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter your first name"
                          value={item.first_name}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Also your last name"
                          value={item.last_name}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="mobile">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Contact Number"
                          value={item.mobile}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          placeholder="Email Address"
                          value={item.email}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Gender"
                          value={item.gender}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="driving_licence_number">
                        <Form.Label>Driving License Number</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Driving License Number"
                          value={item.driving_licence_number}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group id="adhaar_no">
                        <Form.Label>Adhar Number</Form.Label>
                        <Form.Control
                          required
                          type="number"
                          placeholder="Adhar Number"
                          value={item.adhaar_no}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Group id="pan_no">
                        <Form.Label>Pan Card Number</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Pan Card Number"
                          value={item.pan_no}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6} className="mb-3">
                      <Form.Group id="address">
                        <Form.Label>Address</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          placeholder="Enter your home address"
                          value={item.address}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <h5 className="my-4">Driver Documents</h5>

                  <Row>
                    <Col sm={6} className="mb-3">
                      <Form.Group id="dl_front">
                        <Form.Label>Driving License Front</Form.Label>
                        <Card className="my-3 p-3 rounded docsCard">
                          <Card.Img
                            src={
                              "http://103.145.51.109:3010/driverDocuments/" +
                              item.driving_licence_front
                            }
                            alt=""
                            width="50"
                            height="50"
                            variant="top"
                            className="docsCardImage"
                          />
                        </Card>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group id="dl_back">
                        <Form.Label>Driving License Back</Form.Label>
                        <Card className="my-3 p-3 rounded docsCard">
                          <Card.Img
                            src={
                              "http://103.145.51.109:3010/driverDocuments/" +
                              item.driving_licence_back
                            }
                            alt=""
                            width="50"
                            height="50"
                            className="docsCardImage"
                            variant="top"
                          />
                        </Card>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6} className="mb-3">
                      <Form.Group id="stateName">
                        <Form.Label>Adhar Card Front</Form.Label>
                        <Card className="my-3 p-3 rounded docsCard">
                          <Card.Img
                            src={
                              "http://103.145.51.109:3010/driverDocuments/" +
                              item.adhar_front
                            }
                            alt=""
                            width="50"
                            height="50"
                            className="docsCardImage"
                            variant="top"
                          />
                        </Card>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group id="pincode">
                        <Form.Label>Adhar Card Back</Form.Label>
                        <Card className="my-3 p-3 rounded docsCard">
                          <Card.Img
                            src={
                              "http://103.145.51.109:3010/driverDocuments/" +
                              item.adhar_back
                            }
                            alt=""
                            width="50"
                            className="docsCardImage"
                            height="50"
                            variant="top"
                          />
                        </Card>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm={6} className="mb-3">
                      <Form.Group id="pan_front">
                        <Form.Label>Pan Card Front</Form.Label>
                        <Card className="my-3 p-3 rounded docsCard">
                          <Card.Img
                            src={
                              "http://103.145.51.109:3010/driverDocuments/" +
                              item.pan_front
                            }
                            alt=""
                            width="50"
                            height="50"
                            className="docsCardImage"
                            variant="top"
                          />
                        </Card>
                      </Form.Group>
                    </Col>
                    <Col sm={6}>
                      <Form.Group id="dl_back">
                        <Form.Label>Driver Image</Form.Label>
                        <Card className="my-3 p-3 rounded docsCard">
                          <Card.Img
                            src={
                              "http://103.145.51.109:3010/driverDocuments/" +
                              item.photo
                            }
                            alt=""
                            width="50"
                            height="50"
                            className="docsCardImage"
                            variant="top"
                          />
                        </Card>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mt-3">
                    {item.is_approved === 0 ? (
                      <Col sm={12} className="text-center">
                        <Button
                          variant="success"
                          type="submit"
                          onClick={handleApprove}
                        >
                          Approve
                        </Button>
                      </Col>
                    ) : (
                      <Col sm={12} className="text-center">
                        <Button
                          variant="danger"
                          type="submit"
                          onClick={handleUnApprove}
                        >
                          Un-Approve
                        </Button>
                      </Col>
                    )}
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default UnapprovedDriver;
