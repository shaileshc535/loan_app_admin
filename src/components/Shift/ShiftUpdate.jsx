import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadSingleShift, updateShift } from "../../redux/action/shiftAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ShiftUpdate({ id, showChange }) {
  const [state, setState] = useState({
    type_name: "",
    isactive: "",
  });
  const [error, setError] = useState("");

  let dispatch = useDispatch();
  const { type_name, isactive } = state;

  useEffect(() => {
    dispatch(loadSingleShift(id));
  }, []);

  const shiftDetails = useSelector((state) => state.shiftDetails.singledata);

  useEffect(() => {
    if (shiftDetails) {
      setState({ ...shiftDetails });
    }
  }, [shiftDetails]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!type_name) {
      setError("Please input all input Field");
    } else {
      dispatch(updateShift(id, state));
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
                    <h4 className="card-title">Update Vehicle Details</h4>
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
                              <label for="type_name" className="text-dark">
                                Payment type :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Payment type"
                                name="type_name"
                                value={type_name || ""}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-6">
                              <label for="isactive" className="text-dark">
                                Status :
                              </label>
                              <input
                                type="text"
                                placeholder="Status"
                                className="form-control"
                                value={isactive || ""}
                                name="isactive"
                                onChange={handleInputChange}
                              />
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

export default ShiftUpdate;
