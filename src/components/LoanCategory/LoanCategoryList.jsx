/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadAllLoanCategories,
  deleteLoanCategory,
  loadSingleLoanCategory,
  changeStatusLoanCategory,
} from "../../redux/action/loanCategoryAction";
import LoanCategoryCreate from "./LoanCategoryCreate";
import LoanCategoryUpdate from "./LoanCategoryUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

const LoanCategoryList = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);
  const [limit] = useState(10);
  const [page] = useState(1);

  let dispatch = useDispatch();

  function actionAdd() {
    setAdd(true);
  }

  function actionUpdate(id) {
    setId(id);
    dispatch(loadSingleLoanCategory(id));
    setUpdate(true);
  }

  const handleDelete = (id) => {
    dispatch(deleteLoanCategory({ categoryId: id }));
  };

  const handleStatus = (id) => {
    dispatch(changeStatusLoanCategory({ categoryId: id }));
  };

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
  };

  useEffect(() => {
    dispatch(loadAllLoanCategories({ limit, page }));
  }, []);

  const category = useSelector((state) => state.LoanCategory.result);

  const loanCategory = useSelector((state) => state.LoanCategory);

  let { loading, error } = loanCategory;

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(category.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = category.slice(indexOfFirstItem, indexOfLastItem);

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

  let j = currentPage * 10 + 1 - 10;

  if (add === true) {
    var detail = <LoanCategoryCreate showChange={showChange} />;
  } else if (update === true) {
    detail = <LoanCategoryUpdate id={id} showChange={showChange} />;
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
                        <h4 className="card-title">Loan Categories</h4>
                      </div>
                      <Table
                        id="datatable"
                        className="table table-bordered dt-responsive  nowrap w-100"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems &&
                            currentItems.map((item) => (
                              <tr key={item.id}>
                                <td>{j++}</td>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                {item.isactive ? (
                                  <td>Active</td>
                                ) : (
                                  <td>De-Active</td>
                                )}
                                <td className="text-center">
                                  <Button
                                    onClick={() => actionUpdate(item._id)}
                                    className="btn btn-sm btn-secondary mx-2"
                                  >
                                    Edit
                                  </Button>
                                  <Button
                                    onClick={() => handleStatus(item._id)}
                                    className="btn btn-sm btn-primary mx-2"
                                  >
                                    Change Status
                                  </Button>
                                  <Button
                                    onClick={() => handleDelete(item._id)}
                                    className="btn btn-sm btn-danger mx-2"
                                  >
                                    Delete
                                  </Button>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                      {currentItems && currentItems.length > 10 ? (
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
                      ) : (
                        <></>
                      )}
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

  return <>{detail}</>;
};

export default LoanCategoryList;
