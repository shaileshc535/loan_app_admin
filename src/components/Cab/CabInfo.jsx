import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSingleCab,
  ApproveCab,
  UnApproveCab,
} from "../../redux/action/cabAction";
import "react-toastify/dist/ReactToastify.css";
// import "./Driver.css";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

const CabInfo = ({ showChange, id }) => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleCab(id));
  }, []);

  const cabDetails = useSelector((state) => state.cabDetails.singledata);
  const cabDetail = useSelector((state) => state.cabDetails);

  let { loading, error } = cabDetail;

  let handleUnApprove = (e) => {
    e.preventDefault();
    dispatch(UnApproveCab(id));
    showChange();
  };

  let handleApprove = (e) => {
    e.preventDefault();
    dispatch(ApproveCab(id));
    showChange();
  };

  return (
    <div className="content">
      <Row>
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
            {cabDetails.map((item) => (
              <Col>
                <Card border="light" className="bg-white shadow-sm mb-4">
                  <Card.Header>
                    <h5 className="mb-4">Cab Information</h5>
                  </Card.Header>
                  <Card.Body>
                    <h5 className="mb-4">Vehicle Information</h5>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="vehicle_type">
                          <Form.Label>Vehicle Type</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Vehicle Type"
                            value={item.vehicle_type}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="category_name">
                          <Form.Label>Vehicle Category</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Vehicle Category"
                            value={item.category_name}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="vehicle_brand">
                          <Form.Label>Vehicle Brand</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Vehicle Brand"
                            value={item.vehicle_brand}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="model_name">
                          <Form.Label>Vehicle Model Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Vehicle Model Name"
                            value={item.model_name}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="vehicle_name">
                          <Form.Label>Vehicle Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Vehicle Name"
                            value={item.vehicle_name}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="color">
                          <Form.Label>Color</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Color"
                            value={item.color}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="engine_no">
                          <Form.Label>Engine Number</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Engine Number"
                            value={item.engine_no}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="chachis_no">
                          <Form.Label>Chasis Number</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Chasis Number"
                            value={item.chachis_no}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="seating_avaibility">
                          <Form.Label>Seating Availability</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Seating Availability"
                            value={item.seating_avaibility}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="manufacture_year">
                          <Form.Label>Manufacturing Year</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Manufacturing Year"
                            value={item.manufacture_year}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group id="license_plate">
                          <Form.Label>Licence Plate Number</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Licence Plate Number"
                            value={item.license_plate}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group id="valid_till">
                          <Form.Label>Vehicle Validity</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Vehicle Validity"
                            value={item.valid_till}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <hr className="mt-4" />
                    <h5 className="mb-4">Driver Information</h5>
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

                    <hr className="mt-4" />
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

                    <hr className="mt-4" />
                    <h5 className="my-4">Vehicle Documents</h5>

                    <Row>
                      <Col sm={6} className="mb-3">
                        <Form.Group id="front_image">
                          <Form.Label>Vehicle Front Images</Form.Label>
                          <Card className="my-3 p-3 rounded docsCard">
                            <Card.Img
                              src={
                                "http://103.145.51.109:3010/driverDocuments/" +
                                item.front_image
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
                        <Form.Group id="back_image">
                          <Form.Label>Vehicle Back Image</Form.Label>
                          <Card className="my-3 p-3 rounded docsCard">
                            <Card.Img
                              src={
                                "http://103.145.51.109:3010/driverDocuments/" +
                                item.back_image
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
                        <Form.Group id="polution">
                          <Form.Label>Polution Certificate</Form.Label>
                          <Card className="my-3 p-3 rounded docsCard">
                            <Card.Img
                              src={
                                "http://103.145.51.109:3010/driverDocuments/" +
                                item.polution
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
                        <Form.Group id="insurence">
                          <Form.Label>Insurence Certificate</Form.Label>
                          <Card className="my-3 p-3 rounded docsCard">
                            <Card.Img
                              src={
                                "http://103.145.51.109:3010/driverDocuments/" +
                                item.insurence
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
                        <Form.Group id="vehicle_rc">
                          <Form.Label>Registration Certificate</Form.Label>
                          <Card className="my-3 p-3 rounded docsCard">
                            <Card.Img
                              src={
                                "http://103.145.51.109:3010/driverDocuments/" +
                                item.vehicle_rc
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
                      {item.cab_approve === 0 ? (
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
      </Row>
    </div>
  );
};

export default CabInfo;
