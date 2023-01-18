import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllVehicleType,
  deleteVehicleType,
  loadSingleVehicleType,
} from "../../../redux/action/vehicleTypeAction";
import { loadAllVehicleCategories } from "../../../redux/action/vehicleCategoryAction";
import VehicleTypeCreate from "./VehicleTypeCreate";
import VehicleTypeUpdate from "./VehicleTypeUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

const VehicleTypeFindAll = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllVehicleType());
  }, []);

  const type = useSelector((state) => state.vehicleType.result);
  let vehicleType = useSelector((state) => state.vehicleType);
  let { error, loading } = vehicleType;

  console.log("type", type);
  console.log("vehicleType", vehicleType);

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(type.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = type.slice(indexOfFirstItem, indexOfLastItem);

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

  function actionAdd(id) {
    dispatch(loadAllVehicleCategories());
    setAdd(true);
  }

  function actionUpdate(id) {
    setId(id);
    dispatch(loadSingleVehicleType(id));
    dispatch(loadAllVehicleCategories());
    setUpdate(true);
  }

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
  };

  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure wanted to delete the Vehicle Type detail ?")
    ) {
      dispatch(deleteVehicleType(id));
    }
  };
  let j = currentPage * 10 + 1 - 10;

  if (add === true) {
    var detail = <VehicleTypeCreate showChange={showChange} />;
  } else if (update === true) {
    detail = <VehicleTypeUpdate id={id} showChange={showChange} />;
  } else {
    detail = (
      <div className="content">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="main-content">
            <ToastContainer />
            <div className="page-content">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-12">
                    <div className="my-4">
                      <Button
                        onClick={() => actionAdd()}
                        className="btn btn-success btn-sm mx-2"
                      >
                        Add Vehicle Type
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Vehicle Type Details</h4>
                      </div>
                      <Table
                        id="datatable"
                        className="table table-bordered dt-responsive  nowrap w-100"
                      >
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Name</th>
                            <th className="text-center">
                              Price
                              <br />
                              /KM
                            </th>
                            <th className="text-center">
                              Access
                              <br />
                              Fees
                            </th>
                            <th className="text-center">
                              Base
                              <br />
                              Price
                            </th>
                            <th className="text-center">
                              Waiting
                              <br />
                              charge
                            </th>
                            <th className="text-center">Commision</th>
                            <th className="text-center">
                              Base
                              <br />
                              KM
                            </th>

                            <th className="text-center">Tax</th>
                            <th className="text-center">D-Tax</th>
                            <th className="text-center">Icon</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems &&
                            currentItems.map((item, i) => (
                              <tr key={i}>
                                <td className="text-center">{j++}</td>
                                <td className="text-center">{item.name}</td>
                                <td className="text-center">
                                  <i className="fas fa-rupee-sign"></i>
                                  {" " + item.price_km}
                                </td>
                                <td className="text-center">
                                  <i className="fas fa-rupee-sign"></i>
                                  {" " + item.access_fee}
                                </td>
                                <td className="text-center">
                                  <i className="fas fa-rupee-sign"></i>
                                  {" " + item.base_charge}
                                </td>
                                <td className="text-center">
                                  <i className="fas fa-rupee-sign"></i>
                                  {" " + item.waiting_coast + "/Minute"}
                                </td>
                                <td className="text-center">
                                  {item.commision + "%"}
                                </td>
                                <td className="text-center">{item.base_km}</td>
                                <td className="text-center">
                                  {item.gst + "%"}
                                </td>
                                <td className="text-center">
                                  {item.driver_tax + "%"}
                                </td>
                                <td className="text-center">
                                  <img
                                    src={
                                      "http://103.145.51.109:3010/vehicle/" +
                                      item.icon
                                    }
                                    alt=""
                                    width="50"
                                    height="50"
                                  />
                                </td>
                                <td>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return <div>{detail}</div>;
};

export default VehicleTypeFindAll;
