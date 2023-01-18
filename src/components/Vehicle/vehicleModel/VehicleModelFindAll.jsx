import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllVehicleModel,
  deleteVehicleModel,
  loadSingleVehicleModel,
} from "../../../redux/action/vehicleModelAction";
import { loadAllVehicleType } from "../../../redux/action/vehicleTypeAction";
import VehicleModelCreate from "./VehicleModelCreate";
import VehicleModelUpdate from "./VehicleModelUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

const VehicleModelFindAll = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  let dispatch = useDispatch();

  function actionAdd() {
    setAdd(true);
  }

  function actionUpdate(id) {
    setId(id);
    dispatch(loadSingleVehicleModel(id));
    dispatch(loadAllVehicleType());
    setUpdate(true);
  }

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
  };

  useEffect(() => {
    dispatch(loadAllVehicleModel());
  }, []);

  const model = useSelector((state) => state.vehicleModel.result);
  const vehicleModel = useSelector((state) => state.vehicleModel);
  let { error, loading } = vehicleModel;

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];

  for (let i = 1; i <= Math.ceil(model.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = model.slice(indexOfFirstItem, indexOfLastItem);

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

  const handleDelete = (id) => {
    if (window.confirm("Are you sure wanted to delete the Vehicle detail ?")) {
      dispatch(deleteVehicleModel(id));
    }
  };
  let j = currentPage * 10 + 1 - 10;

  if (add === true) {
    var detail = <VehicleModelCreate showChange={showChange} />;
  } else if (update === true) {
    detail = <VehicleModelUpdate id={id} showChange={showChange} />;
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
                        Add-New
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Vehicle Model Details</h4>
                      </div>
                      <Table
                        id="datatable"
                        className="table table-bordered dt-responsive  nowrap w-100"
                      >
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Model-Name</th>
                            <th className="text-center">Vehicle-Type</th>
                            <th className="text-center">Description</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems &&
                            currentItems.map((item, i) => (
                              <tr key={i}>
                                <td className="text-center">{j++}</td>
                                <td className="text-center">
                                  {item.model_name}
                                </td>
                                <td className="text-center">{item.type}</td>
                                <td className="text-center">
                                  {item.model_descritpion}
                                </td>
                                <td className="text-center">
                                  <Button
                                    onClick={() => actionUpdate(item.id)}
                                    className="btn btn-sm btn-secondary mx-2"
                                  >
                                    Update
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

export default VehicleModelFindAll;
