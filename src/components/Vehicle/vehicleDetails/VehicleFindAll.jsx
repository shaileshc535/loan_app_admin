import React, { useState, useEffect } from "react";
import { Table, Button, Tabs, Tab } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllVehicles,
  deleteVehicleDetails,
  loadSingleVehicle,
  loadAllUnapprovedVehicles,
} from "../../../redux/action/vehicleAction";
import VehicleCreate from "./VehicleCreate";
import VehicleUpdate from "./VehicleUpdate";
import VehicleDocs from "./VehicleDocs";
import VehicleInfo from "./VehicleInfo";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  faEdit,
  faTrash,
  faUpload,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { loadAllVehicleModel } from "../../../redux/action/vehicleModelAction";
import { loadAllVehicleType } from "../../../redux/action/vehicleTypeAction";
import { loadAllVehicleCategories } from "../../../redux/action/vehicleCategoryAction";
import { loadAllUnapprovedVehicleDriver } from "../../../redux/action/vehicleDriverAction";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

const VehicleFindAll = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [upload, setUpload] = useState(false);
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

  function actionAdd(id) {
    dispatch(loadAllVehicleModel());
    dispatch(loadAllVehicleType());
    dispatch(loadAllVehicleCategories());
    dispatch(loadAllUnapprovedVehicleDriver());
    setAdd(true);
  }

  function actionUpdate(id) {
    setId(id);
    dispatch(loadAllVehicleModel());
    dispatch(loadAllVehicleType());
    dispatch(loadAllVehicleCategories());
    dispatch(loadAllUnapprovedVehicleDriver());
    dispatch(loadSingleVehicle(id));
    setUpdate(true);
  }

  function actionProfile(id) {
    setProfile(true);
    setId(id);
  }

  function actionUpload(id) {
    setUpload(true);
    setId(id);
  }

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
    setUpload(false);
    setProfile(false);
  };

  useEffect(() => {
    dispatch(loadAllVehicles());
    dispatch(loadAllUnapprovedVehicles());
  }, []);

  const vehicleDetails = useSelector((state) => state.vehicleDetails.result);
  const vehicle = useSelector((state) => state.vehicleDetails);

  let { error, loading } = vehicle;

  const unapprovedVehicle = useSelector(
    (state) => state.vehicleDetails.result1
  );

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(vehicleDetails.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vehicleDetails.slice(indexOfFirstItem, indexOfLastItem);

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
    i <= Math.ceil(unapprovedVehicle.length / itemsPerPage1);
    i++
  ) {
    pages1.push(i);
  }

  const indexOfLastItem1 = currentPage1 * itemsPerPage1;
  const indexOfFirstItem1 = indexOfLastItem1 - itemsPerPage1;
  const currentItems1 = unapprovedVehicle.slice(
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
      dispatch(deleteVehicleDetails(id));
    }
  };

  if (add === true) {
    var detail = <VehicleCreate showChange={showChange} />;
  } else if (update === true) {
    detail = <VehicleUpdate id={id} showChange={showChange} />;
  } else if (profile === true) {
    detail = <VehicleInfo id={id} showChange={showChange} />;
  } else if (upload === true) {
    detail = <VehicleDocs id={id} showChange={showChange} />;
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
            <Tab eventKey="approved" title="Active Vehicles">
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
                            Add New Vehicle
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h4 className="card-title">Active Vehicles</h4>
                          </div>
                          <Table
                            id="datatable"
                            className="table table-bordered dt-responsive  nowrap w-100"
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>
                                  Driver
                                  <br />
                                  Name
                                </th>
                                <th>
                                  License
                                  <br />
                                  Plate
                                </th>
                                <th>
                                  Vehicle
                                  <br />
                                  Brand
                                </th>
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
                                <th>Color</th>
                                <th>
                                  Seating
                                  <br />
                                  Capacity
                                </th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {currentItems &&
                                currentItems.map((item, i) => (
                                  <tr key={i}>
                                    <td>{k++}</td>
                                    {item.driver_name !== null ? (
                                      <td>{item.driver_name}</td>
                                    ) : (
                                      <td>{item.first_name}</td>
                                    )}
                                    <td>{item.license_plate}</td>
                                    <td>{item.vehicle_brand}</td>
                                    <td>{item.vehicle_type}</td>
                                    <td>{item.model_name}</td>
                                    <td>{item.color}</td>
                                    <td>{item.seating_avaibility}</td>
                                    <td>
                                      <Button
                                        onClick={() =>
                                          actionProfile(item.vehicle_id)
                                        }
                                        className="btn btn-sm btn-success mx-2"
                                      >
                                        <FontAwesomeIcon icon={faEye} />
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          actionUpload(item.vehicle_id)
                                        }
                                        className="btn btn-sm btn-primary mx-2"
                                      >
                                        <FontAwesomeIcon icon={faUpload} />
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          actionUpdate(item.vehicle_id)
                                        }
                                        className="btn btn-sm btn-secondary mx-2"
                                      >
                                        <FontAwesomeIcon icon={faEdit} />
                                      </Button>

                                      <Button
                                        onClick={() =>
                                          handleDelete(item.vehicle_id)
                                        }
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

            <Tab eventKey="un-approved" title="Un-Approved Vehicles">
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
                            Add New Vehicle
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-12">
                        <div className="card">
                          <div className="card-header">
                            <h4 className="card-title">Un-Approved Vehicles</h4>
                          </div>
                          <Table
                            id="datatable"
                            className="table table-bordered dt-responsive  nowrap w-100"
                          >
                            <thead>
                              <tr>
                                <th>#</th>
                                <th>
                                  Driver
                                  <br />
                                  Name
                                </th>
                                <th>
                                  License
                                  <br />
                                  Plate
                                </th>
                                <th>
                                  Vehicle
                                  <br />
                                  Brand
                                </th>
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
                                <th>Color</th>
                                <th>
                                  Seating
                                  <br />
                                  Capacity
                                </th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>

                            <tbody>
                              {currentItems1 &&
                                currentItems1.map((item, i) => (
                                  <tr key={i}>
                                    <td>{j++}</td>
                                    {item.driver_name !== null ? (
                                      <td>{item.driver_name}</td>
                                    ) : (
                                      <td>{item.first_name}</td>
                                    )}
                                    <td>{item.license_plate}</td>
                                    <td>{item.vehicle_brand}</td>
                                    <td>{item.vehicle_type}</td>
                                    <td>{item.model_name}</td>
                                    <td>{item.color}</td>
                                    <td>{item.seating_avaibility}</td>
                                    <td>
                                      <Button
                                        onClick={() =>
                                          actionProfile(item.vehicle_id)
                                        }
                                        className="btn btn-sm btn-success  mx-2"
                                      >
                                        <FontAwesomeIcon icon={faEye} />
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          actionUpload(item.vehicle_id)
                                        }
                                        className="btn btn-sm btn-primary mx-2"
                                      >
                                        <FontAwesomeIcon icon={faUpload} />
                                      </Button>
                                      <Button
                                        onClick={() =>
                                          actionUpdate(item.vehicle_id)
                                        }
                                        className="btn btn-sm btn-secondary mx-2"
                                      >
                                        <FontAwesomeIcon icon={faEdit} />
                                      </Button>

                                      <Button
                                        onClick={() =>
                                          handleDelete(item.vehicle_id)
                                        }
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

export default VehicleFindAll;
