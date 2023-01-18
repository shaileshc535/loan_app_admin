import React from "react";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./Payment.css";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { faRupeeSign } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

const BookingPaymentDetails = ({ showChange }) => {
  let PaymentDeatils = useSelector(
    (state) => state.PaymentDeatils.bookingResult
  );
  let PaymentDeatil = useSelector((state) => state.PaymentDeatils);
  let { error, loading } = PaymentDeatil;

  let formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  });

  return (
    <div className="content">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <div className="my-4">
            <Button
              onClick={() => showChange()}
              className="btn btn-sm btn-warning mx-2"
            >
              Back
            </Button>
          </div>

          <Row>
            {PaymentDeatils.map((item) => (
              <Col key={item.id} xs={12} xl={12}>
                <Card border="light" className="bg-white shadow-sm mb-4">
                  <Card.Body>
                    <h5 className="mb-4">Ride information</h5>
                    <Row>
                      <Col sm={4} className="mb-3">
                        <Form.Group id="driverName">
                          <Form.Label>Driver Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Driver Name"
                            value={item.driverName}
                            readOnly
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={4} className="mb-3">
                        <Form.Group id="status_name">
                          <Form.Label>Ride Status</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Ride Status"
                            value={item.status_name}
                            readOnly
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={4} className="mb-3">
                        <Form.Group id="created_at">
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Date"
                            readOnly
                            value={formatter.format(
                              Date.parse(item.booking_time)
                            )}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={4} className="mb-3">
                        <Form.Group id="userName">
                          <Form.Label>User Name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="User Name"
                            value={item.userName}
                            readOnly
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4} className="mb-3">
                        <Form.Group id="mobile">
                          <Form.Label>User Email Address</Form.Label>
                          <Form.Control
                            required
                            type="email"
                            placeholder="User Email Address"
                            value={item.email}
                            readOnly
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4} className="mb-3">
                        <Form.Group id="mobile">
                          <Form.Label>User Contact Number</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="User Contact Number"
                            value={item.mobile}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={9} className="mb-3">
                        <Form.Group id="book_originaddress">
                          <Form.Label>Booking Address</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Booking Address"
                            value={item.book_originaddress}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3} className="mb-3">
                        <Form.Group id="type">
                          <Form.Label>Payment Type</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Payment Type"
                            value={item.type}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={9} className="mb-3">
                        <Form.Group id="book_destinationaddress">
                          <Form.Label>Destination Address</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Destination Address"
                            value={item.book_destinationaddress}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={3} className="mb-3">
                        <Form.Group id="book_distance">
                          <Form.Label>Book Distance</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Book Distance"
                            value={item.book_distance + " " + "KM"}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={3} className="mb-3">
                        <Form.Group id="book_price">
                          <Form.Label>Booking Price</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Booking Price"
                            value={item.book_price}
                            icon={faRupeeSign}
                            readOnly
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={3} className="mb-3">
                        <Form.Group id="base_amount">
                          <Form.Label>Amount</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Amount"
                            value={item.base_amount}
                            icon={faRupeeSign}
                            readOnly
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={3} className="mb-3">
                        <Form.Group id="tax_amount">
                          <Form.Label>Tax Amount</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Tax Amount"
                            value={item.tax_amount}
                            icon={faRupeeSign}
                            readOnly
                          />
                        </Form.Group>
                      </Col>

                      <Col sm={3} className="mb-3">
                        <Form.Group id="amount">
                          <Form.Label>Total Amount</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Total Amount"
                            value={item.amount}
                            icon={faRupeeSign}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6} className="mb-3">
                        <Form.Group id="driver_earning">
                          <Form.Label>Driver Earning</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Driver Earning"
                            value={item.driver_earning}
                            icon={faRupeeSign}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={6} className="mb-3">
                        <Form.Group id="company_earning">
                          <Form.Label>Payana Commision</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Access Fees"
                            value={item.company_earning}
                            readOnly
                            icon={faRupeeSign}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col sm={6} className="mb-3">
                        <Form.Group id="transiction_id">
                          <Form.Label>Transiction Id</Form.Label>
                          <Form.Control
                            required
                            readOnly
                            type="text"
                            placeholder="Transiction Id"
                            value={item.transiction_id}
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Row>
      )}
    </div>
  );
};

export default BookingPaymentDetails;
