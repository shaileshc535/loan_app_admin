import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSingleVehicle,
  ApproveVehicle,
  UnApproveVehicle,
} from "../../../redux/action/vehicleAction";
import "react-toastify/dist/ReactToastify.css";
import "./Vehicle.css";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

const VehicleInfo = ({ showChange, id }) => {
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleVehicle(id));
  }, []);

  let vehicleDetails = useSelector((state) => state.vehicleDetails.singledata);
  let vehicleDetail = useSelector((state) => state.vehicleDetails);

  let { loading, error } = vehicleDetail;

  let handleUnApprove = (e) => {
    e.preventDefault();
    dispatch(UnApproveVehicle(id));
    showChange();
  };

  let handleApprove = (e) => {
    e.preventDefault();
    dispatch(ApproveVehicle(id));
    showChange();
  };

  return (
    <Row className="content">
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
          {vehicleDetails.map((item) => (
            <Col>
              <Card border="light" className="bg-white shadow-sm mb-4">
                <Card.Header>
                  <h5 className="mb-4">Vehicle Information</h5>
                </Card.Header>
                <Card.Body>
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
    </Row>
  );
};

export default VehicleInfo;
