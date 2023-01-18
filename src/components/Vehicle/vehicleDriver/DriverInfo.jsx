import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./Driver.css";
import {
  Col,
  Row,
  Card,
  Form,
  Button,
  Tabs,
  Tab,
  Table,
} from "@themesberg/react-bootstrap";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";
import {
  ApproveDriver,
  UnApproveDriver,
} from "../../../redux/action/vehicleDriverAction";
import { PaymentSettelmentAdmin } from "../../../redux/action/paymentDetailAction";
import { ToastContainer, toast } from "react-toastify";

const DriverInfo = ({ showChange, id }) => {
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [payAmount, setPayAmount] = useState("");
  const [type] = useState("db");

  const dispatch = useDispatch();

  let driver = useSelector((state) => state.vehicleDriver.singledata);
  let vehicleDriver = useSelector((state) => state.vehicleDriver);
  let { error, loading } = vehicleDriver;

  const driverEarning = useSelector((state) => state.vehicleDriver.earning);
  let paymentHistory = useSelector(
    (state) => state.vehicleDriver.paymentHistory
  );

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(paymentHistory.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = paymentHistory.slice(indexOfFirstItem, indexOfLastItem);

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick}
          className={currentPage === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setcurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setcurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  let j = 1;

  let formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!payAmount) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(PaymentSettelmentAdmin(id, payAmount, type));
      showChange();
    }
  };

  return (
    <div className="content">
      <ToastContainer />
      <Row>
        <Tabs
          defaultActiveKey="profile"
          id="controlled-tab-example"
          className="mb-3 mt-3"
        >
          <Tab eventKey="profile" title="Driver Profile">
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
          </Tab>

          <Tab eventKey="earning" title="Driver Earning Details">
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
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Driver Earning Information</h4>
                    </div>
                    <div className="card-body">
                      <div className="card-body">
                        {driverEarning &&
                          driverEarning.map((item, i) => (
                            <div className="modalbody">
                              <ul className="modalul">
                                <li className="modalli">
                                  <h6 className="modalheading">
                                    Total Earning Amount{" "}
                                  </h6>
                                  <p className="modalpara">
                                    <i className="fas fa-rupee-sign"></i>
                                    {" " + item.driverEarning}
                                  </p>
                                </li>

                                <li className="modalli">
                                  <h6 className="modalheading">
                                    Pending Amount{" "}
                                  </h6>
                                  <p className="modalpara">
                                    <i className="fas fa-rupee-sign"></i>
                                    {" " + item.pendingBalance}
                                  </p>
                                </li>
                              </ul>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tab>

          <Tab eventKey="history" title="Driver Payment History">
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
              <div className="main-content">
                <div className="page-content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h4 className="card-title">
                              Driver Payment History
                            </h4>
                          </div>
                          <Table
                            id="datatable"
                            className="table table-bordered dt-responsive  nowrap w-100"
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Date</th>
                                <th>
                                  Book
                                  <br />
                                  Distance
                                </th>
                                <th>
                                  Total
                                  <br />
                                  Amount
                                </th>
                                <th>
                                  Coupon
                                  <br />
                                  Value
                                </th>
                                <th>
                                  Final
                                  <br />
                                  Amount
                                </th>
                                <th>
                                  Driver
                                  <br />
                                  Earning
                                </th>
                                <th>
                                  Access
                                  <br />
                                  Fees
                                </th>
                                <th>
                                  Payment
                                  <br />
                                  Type
                                </th>
                                <th>Status</th>
                              </tr>
                            </thead>

                            <tbody>
                              {currentItems &&
                                currentItems.map((item, i) => (
                                  <tr key={i}>
                                    <td>{j++}</td>
                                    <td>
                                      {formatter.format(
                                        Date.parse(item.created_at)
                                      )}
                                    </td>
                                    <td>{item.book_distance}</td>
                                    <td>{item.total_amount}</td>
                                    <td>{item.promo_code_value}</td>
                                    <td>{item.grand_total}</td>
                                    <td>{item.driver_earning}</td>
                                    <td>{item.company_earning}</td>
                                    {item.type !== "cr" ? (
                                      <td>Online</td>
                                    ) : (
                                      <td>Cash</td>
                                    )}
                                    <td>{item.status_name}</td>
                                  </tr>
                                ))}
                            </tbody>
                          </Table>
                          <div className="mt-4">
                            <ul className="pageNumbers">
                              <li>
                                <button
                                  onClick={handlePrevbtn}
                                  disabled={
                                    currentPage === pages[0] ? true : false
                                  }
                                >
                                  Prev
                                </button>
                              </li>
                              {pageDecrementBtn}
                              {renderPageNumbers}
                              {pageIncrementBtn}

                              <li>
                                <button
                                  onClick={handleNextbtn}
                                  disabled={
                                    currentPage === pages[pages.length - 1]
                                      ? true
                                      : false
                                  }
                                >
                                  Next
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tab>

          <Tab eventKey="settelment" title="Balance Amount Settelment">
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
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Balance Amount Settelment</h4>
                    </div>
                    <div className="card-body">
                      <form
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                      >
                        <Row>
                          <Col md={6} className="mb-3">
                            <Form.Group id="payAmount">
                              <Form.Label>Amount</Form.Label>
                              <Form.Control
                                required
                                type="text"
                                placeholder="Enter Amount"
                                name="payAmount"
                                value={payAmount}
                                onChange={(e) => setPayAmount(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button type="submit" class="btn btn-success mt-4">
                              Pay Amount
                            </Button>
                          </Col>
                        </Row>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Tab>
        </Tabs>
      </Row>
    </div>
  );
};

export default DriverInfo;
