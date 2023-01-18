import React, { useState, useEffect } from "react";
import { Table, Button, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllCab,
  deleteCab,
  loadSingleCab,
  loadAllUnapprovedCab,
} from "../../redux/action/cabAction";
import { loadAllVehicleDriver } from "../../redux/action/vehicleDriverAction";
import { loadAllVehicles } from "../../redux/action/vehicleAction";
import CabCreate from "./CabCreate";
import CabUpdate from "./CabUpdate";
import CabInfo from "./CabInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

const CabFindAll = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [profile, setProfile] = useState(false);
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

  function actionUpdate(id) {
    setId(id);
    dispatch(loadSingleCab(id));
    dispatch(loadAllVehicles());
    dispatch(loadAllVehicleDriver());
    setUpdate(true);
  }

  function actionProfile(id) {
    setProfile(true);
    setId(id);
  }

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
    setProfile(false);
  };

  useEffect(() => {
    dispatch(loadAllCab());
    dispatch(loadAllUnapprovedCab());
  }, []);

  const cabDetails = useSelector((state) => state.cabDetails.result);
  const cab = useSelector((state) => state.cabDetails);
  let { error, loading } = cab;
  const unapproveCab = useSelector((state) => state.cabDetails.result1);

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(cabDetails.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = cabDetails.slice(indexOfFirstItem, indexOfLastItem);

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
  for (let i = 1; i <= Math.ceil(unapproveCab.length / itemsPerPage1); i++) {
    pages1.push(i);
  }

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = unapproveCab.slice(indexOfFirstItem1, indexOfLastItem1);

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
    if (window.confirm("Are you sure wanted to delete the cab detail ?")) {
      dispatch(deleteCab(id));
    }
  };

  if (add === true) {
    var detail = <CabCreate showChange={showChange} />;
  } else if (update === true) {
    detail = <CabUpdate id={id} showChange={showChange} />;
  } else if (profile === true) {
    detail = <CabInfo id={id} showChange={showChange} />;
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
            defaultActiveKey="active"
            id="controlled-tab-example"
            className="mb-3 mt-3"
          >
            <Tab eventKey="active" title="Active Cabs">
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
                            Add New Cab
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h4 className="card-title">Active Cabs</h4>
                          </div>
                          <Table
                            id="datatable"
                            className="table table-bordered dt-responsive  nowrap w-100"
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>
                                  Vehicle
                                  <br />
                                  Type
                                </th>
                                <th>
                                  Model
                                  <br />
                                  Name
                                </th>
                                <th>
                                  License
                                  <br />
                                  Plate
                                </th>
                                <th>Driver</th>
                                <th>
                                  Driver
                                  <br />
                                  Mobile
                                </th>
                                <th>
                                  DL
                                  <br />
                                  number
                                </th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {currentItems &&
                                currentItems.map((item, i) => (
                                  <tr key={i}>
                                    <td>{k++}</td>
                                    <td>{item.vehicle_type}</td>
                                    <td>{item.model_name}</td>
                                    <td>{item.license_plate}</td>
                                    <td>{item.driverName}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.driving_licence_number}</td>
                                    <td>
                                      <Button
                                        onClick={() => actionProfile(item.id)}
                                        className="btn btn-sm btn-success mx-2"
                                      >
                                        Profile
                                      </Button>
                                      <Button
                                        onClick={() => actionUpdate(item.id)}
                                        className="btn btn-sm btn-secondary mx-2"
                                      >
                                        Edit
                                      </Button>

                                      <Button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-sm btn-danger mx-2"
                                      >
                                        Delete
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
            <Tab eventKey="un-approved" title="Un-Approved Cabs">
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
                            Add New Cab
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h4 className="card-title">Cab Details</h4>
                          </div>
                          <Table
                            id="datatable"
                            className="table table-bordered dt-responsive  nowrap w-100"
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>
                                  Vehicle
                                  <br />
                                  Type
                                </th>
                                <th>
                                  Model
                                  <br />
                                  Name
                                </th>
                                <th>
                                  License
                                  <br />
                                  Plate
                                </th>
                                <th>Driver</th>
                                <th>
                                  Driver
                                  <br />
                                  Mobile
                                </th>
                                <th>
                                  DL
                                  <br />
                                  number
                                </th>
                                <th>Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {currentItems1 &&
                                currentItems1.map((item, i) => (
                                  <tr key={i}>
                                    <td>{j++}</td>
                                    <td>{item.vehicle_type}</td>
                                    <td>{item.model_name}</td>
                                    <td>{item.license_plate}</td>
                                    <td>{item.driverName}</td>
                                    <td>{item.mobile}</td>
                                    <td>{item.driving_licence_number}</td>
                                    <td>
                                      <Button
                                        onClick={() => actionProfile(item.id)}
                                        className="btn btn-sm btn-success mx-2"
                                      >
                                        Profile
                                      </Button>
                                      <Button
                                        onClick={() => actionUpdate(item.id)}
                                        className="btn btn-sm btn-secondary mx-2"
                                      >
                                        Edit
                                      </Button>

                                      <Button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-sm btn-danger mx-2"
                                      >
                                        Delete
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

export default CabFindAll;
