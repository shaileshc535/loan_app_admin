import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadAllUser } from "../../redux/action/userAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

const UserFindAll = () => {
  const [currentPage, setcurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllUser());
  }, []);

  const userDetails = useSelector((state) => state.userDetails.result);
  const userDetail = useSelector((state) => state.userDetails);
  let { error, loading } = userDetail;

  const handleClick = (e) => {
    setcurrentPage(Number(e.target.id));
  };

  const pages = [];
  for (let i = 1; i <= Math.ceil(userDetails.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userDetails.slice(indexOfFirstItem, indexOfLastItem);

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
  //   if (
  //     window.confirm("Are you sure wanted to delete the Vehicle Shift detail ?")
  //   ) {
  //     dispatch(deleteUser(id));
  //   }
  // };
  let j = currentPage * 10 + 1 - 10;

  var detail = (
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
                  <div className="card mt-5">
                    <div className="card-header">
                      <h4 className="card-title">User/Customer Details</h4>
                    </div>
                    <Table
                      id="datatable"
                      className="table table-bordered dt-responsive  nowrap w-100"
                    >
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Mobile</th>
                          <th>Gender</th>
                          <th>Age</th>
                          {/* <th>Photo</th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {currentItems &&
                          currentItems.map((item, i) => (
                            <tr key={i}>
                              <td>{j++}</td>
                              <td>{item.name}</td>
                              <td>{item.email}</td>
                              <td>{item.mobile}</td>
                              <td>{item.gender}</td>
                              <td>{item.age}</td>
                              {/* <td>
                                <img src={item.photo} alt={item.name} />
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

  return <div>{detail}</div>;
};

export default UserFindAll;
