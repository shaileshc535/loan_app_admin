import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  paymentDetails,
  bookingPaymentDetails,
} from "../../redux/action/paymentDetailAction";
import BookingPaymentDetails from "./BookingPaymentDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

const Payments = () => {
  const [add, setAdd] = useState(false);
  const [driver, setDriver] = useState(false);
  const [id, setId] = useState("");
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage, setitemsPerPage] = useState(10);
  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  let dispatch = useDispatch();

  function actionAdd(id) {
    setId(id);
    dispatch(bookingPaymentDetails(id));
    setAdd(true);
  }

  const showChange = () => {
    setAdd(false);
    setDriver(false);
  };

  useEffect(() => {
    dispatch(paymentDetails());
  }, []);

  const PaymentDeatils = useSelector((state) => state.PaymentDeatils.result);
  const PaymentDeatil = useSelector((state) => state.PaymentDeatils);
  let { error, loading } = PaymentDeatil;

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(PaymentDeatils.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = PaymentDeatils.slice(indexOfFirstItem, indexOfLastItem);

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

  let formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "numeric",
    day: "2-digit",
  });

  let j = currentPage * 10 + 1 - 10;

  if (add === true) {
    var detail = <BookingPaymentDetails showChange={showChange} id={id} />;
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
                    <div className="card">
                      <div className="card-header">
                        <h4 className="card-title">Payment History</h4>
                      </div>
                      <Table
                        id="datatable"
                        className="table table-bordered dt-responsive  nowrap w-100"
                      >
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Date</th>
                            <th>
                              Book
                              <br />
                              Distance
                            </th>
                            <th>
                              Total
                              <br />
                              Amount
                            </th>
                            <th>
                              Coupon
                              <br />
                              Value
                            </th>
                            <th>
                              Final
                              <br />
                              Amount
                            </th>
                            <th>
                              Driver
                              <br />
                              Earning
                            </th>
                            <th>
                              Access
                              <br />
                              Fees
                            </th>
                            <th>
                              Payment
                              <br />
                              Type
                            </th>
                            <th>Status</th>
                          </tr>
                        </thead>

                        <tbody>
                          {currentItems &&
                            currentItems.map((item, i) => (
                              <tr key={i}>
                                <td>{j++}</td>
                                <td>
                                  {formatter.format(
                                    Date.parse(item.created_at)
                                  )}
                                </td>
                                <td>{item.book_distance}</td>
                                <td>{item.total_amount}</td>
                                <td>{item.promo_code_value}</td>
                                <td>{item.grand_total}</td>
                                <td>{item.driver_earning}</td>
                                <td>{item.company_earning}</td>
                                {item.type !== "cr" ? (
                                  <td>Online</td>
                                ) : (
                                  <td>Cash</td>
                                )}
                                <td>{item.status_name}</td>
                                <td>
                                  <Button
                                    onClick={() => actionAdd(item.id)}
                                    className="btn btn-sm btn-secondary mx-2"
                                  >
                                    Details
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

export default Payments;
