import React, { useState, useEffect } from "react";
import { Table, Button, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllVehicleDriver,
  deleteVehicleDriver,
  loadDriverEarning,
  loadPaymentHistory,
  loadSingleVehicleDriver,
  loadAllUnapprovedVehicleDriver,
} from "../../../redux/action/vehicleDriverAction";
import VehicleDriverCreate from "./VehicleDriverCreate";
import VehicleDriverUpdate from "./VehicleDriverUpdate";
import DriverDocs from "./DriverDocs";
import DriverInfo from "./DriverInfo";
import UnapprovedDriver from "./UnapprovedDriver";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faEdit,
  faTrash,
  faUpload,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

const VehicleDriverFindAll = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [upload, setUpload] = useState(false);
  const [profile, setProfile] = useState(false);
  const [profile2, setProfile2] = useState(false);
  const [id, setId] = useState("");
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

  let dispatch = useDispatch();

  function actionAdd() {
    setAdd(true);
  }

  function actionUpload(id) {
    setUpload(true);
    setId(id);
  }

  function actionProfile(id) {
    dispatch(loadSingleVehicleDriver(id));
    dispatch(loadDriverEarning(id));
    dispatch(loadPaymentHistory(id));
    setProfile(true);
    setId(id);
  }

  function actionProfile2(id) {
    dispatch(loadSingleVehicleDriver(id));
    setProfile2(true);
    setId(id);
  }

  function actionUpdate(id) {
    setId(id);
    dispatch(loadSingleVehicleDriver(id));
    setUpdate(true);
  }

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
    setUpload(false);
    setProfile(false);
    setProfile2(false);
  };

  useEffect(() => {
    dispatch(loadAllVehicleDriver());
    dispatch(loadAllUnapprovedVehicleDriver());
  }, []);

  const driver = useSelector((state) => state.vehicleDriver.result);
  let vehicleDriver = useSelector((state) => state.vehicleDriver);
  let { error, loading } = vehicleDriver;

  const unapprovedDriver = useSelector((state) => state.vehicleDriver.result1);

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(driver.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = driver.slice(indexOfFirstItem, indexOfLastItem);

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
  for (
    let i = 1;
    i <= Math.ceil(unapprovedDriver.length / itemsPerPage1);
    i++
  ) {
    pages1.push(i);
  }

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = unapprovedDriver.slice(
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

  let j = currentPage1 * 10 + 1 - 10;
  let k = currentPage * 10 + 1 - 10;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the Vehicle detail ?")) {
      dispatch(deleteVehicleDriver(id));
    }
  };

  if (add === true) {
    var detail = <VehicleDriverCreate showChange={showChange} />;
  } else if (update === true) {
    detail = <VehicleDriverUpdate id={id} showChange={showChange} />;
  } else if (upload === true) {
    detail = <DriverDocs id={id} showChange={showChange} />;
  } else if (profile === true) {
    detail = <DriverInfo id={id} showChange={showChange} />;
  } else if (profile2 === true) {
    detail = <UnapprovedDriver id={id} showChange={showChange} />;
  } else {
    detail = (
      <div className="content">
        <ToastContainer />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Tabs
            defaultActiveKey="approved"
            id="controlled-tab-example"
            className="mb-3 mt-3"
          >
            <Tab eventKey="approved" title="Active Drivers">
              <div className="main-content">
                <div className="page-content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="my-4">
                          <Button
                            onClick={() => actionAdd()}
                            className="btn btn-success btn-sm mx-2"
                          >
                            Add New Driver
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h4 className="card-title">Active Drivers</h4>
                          </div>
                          <Table
                            id="datatable"
                            className="table table-bordered dt-responsive  nowrap w-100"
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>
                                  DL
                                  <br />
                                  Number
                                </th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {currentItems &&
                                currentItems.map((item, i) => (
                                  <tr key={i}>
                                    <td>{k++}</td>
                                    <td>{item.driverName}</td>
                                    <td>{item.driving_licence_number}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>
                                      <Button
                                        className="openModalBtn btn btn-sm btn-success mx-2"
                                        onClick={() => actionProfile(item.id)}
                                      >
                                        <FontAwesomeIcon icon={faEye} />
                                      </Button>
                                      <Button
                                        onClick={() => actionUpload(item.id)}
                                        className="btn btn-sm btn-primary mx-2"
                                      >
                                        <FontAwesomeIcon icon={faUpload} />
                                      </Button>
                                      <Button
                                        onClick={() => actionUpdate(item.id)}
                                        className="btn btn-sm btn-secondary mx-2"
                                      >
                                        <FontAwesomeIcon icon={faEdit} />
                                      </Button>

                                      <Button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-sm btn-danger mx-2"
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
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
            </Tab>
            <Tab eventKey="un-approved" title="Un-Approved Drivers">
              <div className="main-content">
                <div className="page-content">
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-12">
                        <div className="my-4">
                          <Button
                            onClick={() => actionAdd()}
                            className="btn btn-success btn-sm mx-2"
                          >
                            Add New Driver
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h4 className="card-title">Un-Approved Drivers</h4>
                          </div>
                          <Table
                            id="datatable"
                            className="table table-bordered dt-responsive  nowrap w-100"
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>
                                  DL
                                  <br />
                                  Number
                                </th>
                                <th>Mobile</th>
                                <th>Email</th>
                                <th>Gender</th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {currentItems1 &&
                                currentItems1.map((item, i) => (
                                  <tr key={i}>
                                    <td>{j++}</td>
                                    <td>{item.driverName}</td>
                                    <td>{item.driving_licence_number}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.email}</td>
                                    <td>{item.gender}</td>
                                    <td>
                                      <Button
                                        className="openModalBtn btn btn-sm btn-success mx-2"
                                        onClick={() => actionProfile2(item.id)}
                                      >
                                        <FontAwesomeIcon icon={faEye} />
                                      </Button>
                                      <Button
                                        onClick={() => actionUpload(item.id)}
                                        className="btn btn-sm btn-primary mx-2"
                                      >
                                        <FontAwesomeIcon icon={faUpload} />
                                      </Button>
                                      <Button
                                        onClick={() => actionUpdate(item.id)}
                                        className="btn btn-sm btn-secondary mx-2"
                                      >
                                        <FontAwesomeIcon icon={faEdit} />
                                      </Button>

                                      <Button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-sm btn-danger mx-2"
                                      >
                                        <FontAwesomeIcon icon={faTrash} />
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
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Tab>
          </Tabs>
        )}
      </div>
    );
  }

  return <div>{detail}</div>;
};

export default VehicleDriverFindAll;
