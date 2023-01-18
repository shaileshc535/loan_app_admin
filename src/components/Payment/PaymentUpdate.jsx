import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSinglePayment,
  updatePayment,
} from "../../redux/action/paymentAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function PaymentUpdate({ id, showChange }) {
  const [type_name, setType_name] = useState("");
  const [isactive, setIsactive] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSinglePayment(id));
  }, []);

  const paymentDetails = useSelector(
    (state) => state.paymentDetails.singledata[0]
  );

  useEffect(() => {
    if (paymentDetails) {
      setType_name(paymentDetails.type_name);
      setIsactive(paymentDetails.isactive);
    }
  }, [setType_name, setIsactive]);

  const handleActiveStatus = (e) => {
    const activeStatus = e.target.value;
    setIsactive(activeStatus);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type_name) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(updatePayment(id, type_name, isactive));
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
                    <h4 className="card-title">Update Payment-Type</h4>
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
                              <label for="type_name" className="text-dark">
                                Payment type :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Payment type"
                                name="type_name"
                                value={type_name || ""}
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
                              Update
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

export default PaymentUpdate;
