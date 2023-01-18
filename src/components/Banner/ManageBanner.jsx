import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBanner,
  loadAllBanner,
  loadSingleBanner,
  visibleBanner,
} from "../../redux/action/bannerAction";
import BannerCreate from "./BannerCreate";
import BannerUpdate from "./BannerUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Banner.css";
import "react-lightbox-pack/dist/index.css";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";
import axios from "axios";

const ManageBanner = () => {
  const [add, setAdd] = useState(false);
  const [name, setName] = useState("false");
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllBanner());
  }, []);

  const bannerDetails = useSelector((state) => state.Banners);

  const { loading, error, result } = bannerDetails;

  function actionAdd() {
    setAdd(true);
  }

  function actionUpdate(id) {
    dispatch(loadSingleBanner(id));
    setId(id);
    setUpdate(true);
  }

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
  };

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(result.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result.slice(indexOfFirstItem, indexOfLastItem);

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
    if (window.confirm("Are you sure wanted to delete the banner detail ?")) {
      dispatch(deleteBanner(id));
    }
  };

  let j = currentPage * 10 + 1 - 10;

  if (add === true) {
    var detail = <BannerCreate showChange={showChange} id={id} />;
  } else if (update === true) {
    detail = <BannerUpdate id={id} showChange={showChange} />;
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
                        Add New Banner
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">All Banner</h4>
                      </div>
                      <Table
                        id="datatable"
                        className="table table-bordered dt-responsive  nowrap w-100"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th className="text-center">Banner</th>
                            <th className="text-center">Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems &&
                            currentItems.map((item, i) => (
                              <tr key={i}>
                                <td>{j++}</td>
                                <td className="my-2 p-3 text-center">
                                  <img
                                    src={
                                      "http://103.145.51.109:3010/banners/" +
                                      item.img
                                    }
                                    alt={item.id}
                                    width="200"
                                    height="100"
                                  />
                                </td>
                                <td className="text-right">
                                  {item.visible === 1 ? (
                                    <Button
                                      className="btn btn-sm btn-success mx-2"
                                      onClick={() =>
                                        dispatch(visibleBanner(item.id))
                                      }
                                    >
                                      De-Activate
                                    </Button>
                                  ) : (
                                    <Button
                                      className="btn btn-sm btn-primary mx-2"
                                      onClick={() =>
                                        dispatch(visibleBanner(item.id))
                                      }
                                    >
                                      Activate
                                    </Button>
                                  )}
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

export default ManageBanner;
