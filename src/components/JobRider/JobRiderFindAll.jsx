import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllJobRider,
  deleteJobRider,
} from "../../redux/action/jobRiderAction";
import JobRiderCreate from "./JobRiderCreate";
import JobRiderUpdate from "./JobRiderUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

const JobRiderFindAll = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  function actionAdd(id) {
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
    dispatch(loadAllJobRider());
  }, []);

  const jobRider = useSelector((state) => state.jobRider.result);
  const ridesDetail = useSelector((state) => state.jobRider);
  let { error, loading } = ridesDetail;

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(jobRider.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = jobRider.slice(indexOfFirstItem, indexOfLastItem);

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

  // const handleDelete = (id) => {
  //   if (window.confirm("Are you sure wanted to delete the cab detail ?")) {
  //     dispatch(deleteJobRider(id));
  //   }
  // };
  let j = currentPage * 10 + 1 - 10;

  let formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  });

  if (add === true) {
    var detail = <JobRiderCreate showChange={showChange} />;
  } else if (update === true) {
    detail = <JobRiderUpdate id={id} showChange={showChange} />;
  } else {
    detail = (
      <div className="content">
        <ToastContainer />
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="main-content">
            <div className="page-content">
              <div className="container-fluid mt-5">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">All Ride Details</h4>
                      </div>
                      <Table
                        id="datatable"
                        className="table table-bordered dt-responsive  nowrap w-100"
                      >
                        <thead>
                          <tr>
                            <th className="text-center">#</th>
                            <th className="text-center">Date</th>
                            <th className="text-center">
                              User
                              <br />
                              Name
                            </th>
                            <th className="text-center">
                              User
                              <br />
                              Contact
                            </th>
                            <th className="text-center">
                              Book
                              <br />
                              Price
                            </th>
                            <th className="text-center">
                              Travel
                              <br />
                              Distance
                            </th>
                            <th className="text-center">
                              Driver
                              <br />
                              Name
                            </th>
                            <th className="text-center">
                              Vehicle
                              <br />
                              Number
                            </th>
                            <th className="text-center">
                              Ride
                              <br />
                              Status
                            </th>
                            {/* <th className="text-center">Action</th> */}
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems &&
                            currentItems.map((item, i) => (
                              <tr key={i}>
                                <td className="text-center">{j++}</td>
                                <td className="text-center">
                                  {/* {item.booking_time} */}
                                  {formatter.format(
                                    Date.parse(item.booking_time)
                                  )}
                                </td>
                                <td className="text-center">
                                  {item.user_name}
                                </td>
                                <td className="text-center">{item.mobile}</td>
                                <td className="text-center">
                                  {item.book_price}
                                </td>
                                <td className="text-center">
                                  {item.book_distance} km
                                </td>
                                <td className="text-center">
                                  {item.driver_name}
                                </td>
                                <td className="text-center">
                                  {item.license_plate}
                                </td>
                                <td className="text-center">
                                  {item.status_name}
                                </td>
                                {/* <td className="text-center">
                                <Button
                                  onClick={() => handleDelete(item.jobRideId)}
                                  className="btn btn-sm btn-danger mx-2"
                                >
                                  Delete
                                </Button>
                              </td> */}
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

export default JobRiderFindAll;
