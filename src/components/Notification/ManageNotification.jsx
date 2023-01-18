import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadAllUser } from "../../redux/action/userAction";
import { loadAllVehicleDriver } from "../../redux/action/vehicleDriverAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  Col,
  Row,
  Table,
  Button,
  Modal,
  Form,
} from "@themesberg/react-bootstrap";
import {
  driverNotification,
  userNotification,
  allDriverNotification,
  allUserNotification,
} from "../../redux/action/notificationAction";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

const ManageNotification = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [currentPage1, setcurrentPage1] = useState(1);
  const [itemsPerPage1] = useState(10);
  const [pageNumberLimit1] = useState(5);
  const [maxPageNumberLimit1, setmaxPageNumberLimit1] = useState(5);
  const [minPageNumberLimit1, setminPageNumberLimit1] = useState(0);
  const [driverPlayedId, setDriverPlayedId] = useState("");
  const [userPlayedId, setUserPlayedId] = useState("");
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [link, setLink] = useState("");
  const [allUser, setAllUser] = useState(false);
  const [allDriver, setAllDriver] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const setEmpty = () => {
    setTitle("");
    setMessage("");
    setLink("");
  };

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllUser());
    dispatch(loadAllVehicleDriver());
  }, []);

  const userDetails = useSelector((state) => state.userDetails.result);
  const userDetail = useSelector((state) => state.userDetails);
  let { error, loading } = userDetail;
  const driverDetails = useSelector((state) => state.vehicleDriver.result);

  const handleDriverMessage = (id) => {
    setDriverPlayedId(id);
    handleShow();
  };

  const handleUserMessage = (id) => {
    setUserPlayedId(id);
    handleShow();
  };

  const handleAllUser = () => {
    setAllUser(true);
    handleShow();
  };

  const handleAllDriver = () => {
    setAllDriver(true);
    console.log(allDriver);
    handleShow();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      driverPlayedId !== null &&
      driverPlayedId !== undefined &&
      driverPlayedId !== ""
    ) {
      dispatch(driverNotification(title, message, link, driverPlayedId));
      setEmpty();
    } else if (
      userPlayedId !== null &&
      userPlayedId !== undefined &&
      userPlayedId !== ""
    ) {
      dispatch(userNotification(title, message, link, userPlayedId));
      setEmpty();
    } else if (allUser === true) {
      dispatch(allUserNotification(title, message, link));
      setEmpty();
    } else {
      dispatch(allDriverNotification(title, message, link));
      setEmpty();
    }

    handleClose();
  };

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(userDetails.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userDetails.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleClick1 = (e) => {
    setcurrentPage1(Number(e.target.id));
  };

  const pages1 = [];
  for (let i = 1; i <= Math.ceil(driverDetails.length / itemsPerPage1); i++) {
    pages1.push(i);
  }

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = driverDetails.slice(
    indexOfFirstItem1,
    indexOfLastItem1
  );

  const renderPageNumbers1 = pages1.map((number) => {
    if (number < maxPageNumberLimit1 + 1 && number > minPageNumberLimit1) {
      return (
        <li
          key={number}
          id={number}
          onClick={handleClick1}
          className={currentPage1 === number ? "active" : null}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn1 = () => {
    setcurrentPage1(currentPage1 + 1);

    if (currentPage1 + 1 > maxPageNumberLimit1) {
      setmaxPageNumberLimit1(maxPageNumberLimit1 + pageNumberLimit1);
      setminPageNumberLimit1(minPageNumberLimit1 + pageNumberLimit1);
    }
  };

  const handlePrevbtn1 = () => {
    setcurrentPage1(currentPage1 - 1);

    if ((currentPage1 - 1) % pageNumberLimit1 === 0) {
      setmaxPageNumberLimit1(maxPageNumberLimit1 - pageNumberLimit1);
      setminPageNumberLimit1(minPageNumberLimit1 - pageNumberLimit1);
    }
  };

  let pageIncrementBtn1 = null;
  if (pages1.length > maxPageNumberLimit1) {
    pageIncrementBtn1 = <li onClick={handleNextbtn1}> &hellip; </li>;
  }

  let pageDecrementBtn1 = null;
  if (minPageNumberLimit1 >= 1) {
    pageDecrementBtn1 = <li onClick={handlePrevbtn1}> &hellip; </li>;
  }

  let j = currentPage * 10 + 1 - 10;
  let k = currentPage1 * 10 + 1 - 10;

  return (
    <div className="content">
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Card border="light" className="bg-white shadow-sm mb-4">
            <Card.Header>
              <Card.Title>Push Notifications</Card.Title>
            </Card.Header>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Send Push Notifications</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form onSubmit={onSubmit} noValidate autoComplete="off">
                  <Form.Group controlId="title" className="mt-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="title"
                      className="form-control"
                      placeholder="Notification Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="message" className="mt-3">
                    <Form.Label>Message</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="message"
                      className="form-control"
                      placeholder="Notification Message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="link" className="mt-3">
                    <Form.Label>Link</Form.Label>
                    <Form.Control
                      type="text"
                      name="link"
                      className="form-control"
                      placeholder="Notification Link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    className="btn btn-success mt-4 btn-block"
                  >
                    Send
                  </Button>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="danger"
                  className="btn btn-sm"
                  onClick={handleClose}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Card.Body>
              <Row>
                <Col sm={6}>
                  <Card className="mt-3 border-left-primary shadow h-100">
                    <Card.Header>
                      <Row>
                        <Col sm={6}>
                          <Card.Title>User List</Card.Title>
                        </Col>
                        <Col sm={6} className="text-right">
                          <Button
                            onClick={() => handleAllUser()}
                            className="btn btn-sm btn-success mx-2 my-2"
                          >
                            Send To All Users
                          </Button>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Table
                        id="datatable"
                        className="table table-bordered dt-responsive  nowrap w-100"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems &&
                            currentItems.map((item, i) => (
                              <tr key={i}>
                                <td>{j++}</td>
                                <td>{item.name}</td>
                                <td>{item.mobile}</td>
                                <td>
                                  <Button
                                    onClick={() =>
                                      handleUserMessage(item.playerid)
                                    }
                                    className="btn btn-sm btn-success mx-2"
                                  >
                                    Send
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      <div className="mt-4">
                        <ul className="pageNumbers">
                          <li>
                            <button
                              onClick={handlePrevbtn}
                              disabled={currentPage === pages[0] ? true : false}
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
                    </Card.Body>
                  </Card>
                </Col>

                <Col sm={6}>
                  <Card className="mt-3 border-left-primary shadow h-100">
                    <Card.Header>
                      <Row>
                        <Col sm={6}>
                          <Card.Title>Driver List</Card.Title>
                        </Col>
                        <Col sm={6} className="text-right">
                          <Button
                            onClick={() => handleAllDriver()}
                            className="btn btn-sm btn-success"
                          >
                            Send To All Drivers
                          </Button>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <Table
                        id="datatable"
                        className="table table-bordered dt-responsive  nowrap w-100"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems1 &&
                            currentItems1.map((item, i) => (
                              <tr key={i}>
                                <td>{k++}</td>
                                <td>{item.driverName}</td>
                                <td>{item.mobile}</td>
                                <td>
                                  <Button
                                    onClick={() =>
                                      handleDriverMessage(item.playerid)
                                    }
                                    className="btn btn-sm btn-success mx-2"
                                  >
                                    Send
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      <div className="mt-4">
                        <ul className="pageNumbers1">
                          <li>
                            <button
                              onClick={handlePrevbtn1}
                              disabled={
                                currentPage1 === pages[0] ? true : false
                              }
                            >
                              Prev
                            </button>
                          </li>
                          {pageDecrementBtn1}
                          {renderPageNumbers1}
                          {pageIncrementBtn1}

                          <li>
                            <button
                              onClick={handleNextbtn1}
                              disabled={
                                currentPage1 === pages[pages.length - 1]
                                  ? true
                                  : false
                              }
                            >
                              Next
                            </button>
                          </li>
                        </ul>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      )}
    </div>
  );
};

export default ManageNotification;
