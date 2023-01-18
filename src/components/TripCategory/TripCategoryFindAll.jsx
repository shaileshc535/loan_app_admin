import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllTripCategory,
  deleteTripCategory,
} from "../../redux/action/tripCategoryAction";
import TripCategoryCreate from "./TripCategoryCreate";
import TripCategoryUpdate from "./TripCategoryUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TripCategoryFindAll = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  function actionAdd() {
    setAdd(true);
  }

  function actionUpdate(id) {
    setUpdate(true);
    setId(id);
  }

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
  };

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllTripCategory());
  }, []);

  const tripCategory = useSelector((state) => state.tripCategory.result);

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(tripCategory.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = tripCategory.slice(indexOfFirstItem, indexOfLastItem);

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
    if (
      window.confirm("Are you sure wanted to delete the Vehicle Shift detail ?")
    ) {
      dispatch(deleteTripCategory(id));
    }
  };
  let j = currentPage * 10 + 1 - 10;


  if (add === true) {
    var detail = <TripCategoryCreate showChange={showChange} />;
  } else if (update === true) {
    detail = <TripCategoryUpdate id={id} showChange={showChange} />;
  } else {
    detail = (
      <div className="content">
        <ToastContainer />
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
                      Add New Category
                    </Button>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Vehicle Categories</h4>
                    </div>
                    <Table
                      id="datatable"
                      className="table table-bordered dt-responsive  nowrap w-100"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Trip Category</th>
                          <th>Status</th>
                          <th>Icon</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems &&
                          currentItems.map((item, i) => (
                            <tr key={i}>
                              <td>{j++}</td>
                              <td>{item.name}</td>
                              <td>{item.active}</td>
                              <td>
                                <img src={item.icon} alt="item.name" />
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
      </div>
    );
  }

  return <div>{detail}</div>;
};

export default TripCategoryFindAll;
