import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadAllShift, deleteShift } from "../../redux/action/shiftAction";
import ShiftCreate from "./ShiftCreate";
import ShiftUpdate from "./ShiftUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShiftFindAll = () => {
  const [add, setAdd] = useState(false);
  const [update, setUpdate] = useState(false);
  const [id, setId] = useState("");

  function actionAdd(_id) {
    setAdd(true);
  }

  function actionUpdate(_id) {
    setUpdate(true);
    // dispatch(getSingleAssignTeacher(id));
    setId(_id);
  }

  const showChange = () => {
    setAdd(false);
    setUpdate(false);
  };

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllShift());
  }, []);

  const shiftDetails = useSelector((state) => state.shiftDetails.result);

  const handleDelete = (_id) => {
    if (
      window.confirm("Are you sure wanted to delete the Vehicle Shift detail ?")
    ) {
      dispatch(deleteShift(_id));
    }
  };
  let j = 1;

  if (add === true) {
    var detail = <ShiftCreate showChange={showChange} />;
  } else if (update === true) {
    var detail = <ShiftUpdate id={id} showChange={showChange} />;
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
                          <th>Payment Type</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {shiftDetails &&
                          shiftDetails.map((item, i) => (
                            <tr key={i}>
                              <td>{j++}</td>
                              <td>{item.type_name}</td>
                              <td>{item.isactive}</td>
                              <td>
                                <Button
                                  onClick={() => actionUpdate(item._id)}
                                  className="btn btn-sm btn-secondary mx-2"
                                >
                                  Edit
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

export default ShiftFindAll;
