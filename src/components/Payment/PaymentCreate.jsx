import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createPayment } from "../../redux/action/paymentAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaymentCreate({ showChange }) {
  const [type_name, setType_name] = useState("");
  const [isactive, setIsactive] = useState("");

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  let dispatch = useDispatch();

  const handleActiveStatus = (e) => {
    const activeStatus = e.target.value;
    setIsactive(activeStatus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type_name) {
      setError("Please input all input Field");
    } else {
      dispatch(createPayment(type_name, isactive));
      setError("");
      showChange();
    }
  };

  return (
    <div className="content">
      <div className="main-content">
        <ToastContainer />
        <div className="page-content">
          <div className="container-fluid">
            <div className="my-4">
              <Button
                onClick={() => showChange()}
                className="btn btn-sm btn-warning mx-2"
              >
                Back
              </Button>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Add New Payment-Type</h4>
                    {error && <h3 style={{ color: "red" }}>{error}</h3>}
                  </div>
                  <div className="card-body">
                    <div className="card-body">
                      <form
                        noValidate
                        autoComplete="off"
                        onSubmit={handleSubmit}
                      >
                        <div className="new_user">
                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label htmlFor="type_name" className="text-dark">
                                Payment type :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Payment type"
                                name="type_name"
                                value={type_name}
                                onChange={(e) => setType_name(e.target.value)}
                              />
                            </div>
                            <div className="col-6">
                              <label htmlFor="isactive" className="text-dark">
                                Status :
                              </label>
                              <select
                                name="isactive"
                                onChange={(e) => handleActiveStatus(e)}
                                value={isactive}
                                className="form-control"
                              >
                                <option value="">Select Status</option>
                                <option value="1">Active</option>
                                <option value="0">Deactive</option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group row mt-4 mx-1">
                            <Button
                              type="submit"
                              className="update btn btn-sm btn-success btn-block form-control"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
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

export default PaymentCreate;
