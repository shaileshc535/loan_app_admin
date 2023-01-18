import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createRideStatus } from "../../redux/action/rideStatusAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RideStatusCreate({ showChange }) {
  const [status_name, setStatus_name] = useState("");

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!status_name) {
      setError("Please input all input Field");
    } else {
      dispatch(createRideStatus(status_name));
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
                    <h4 className="card-title">Add New Ride Status </h4>
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
                                Ride Status :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Ride Status"
                                name="type_name"
                                value={status_name}
                                onChange={(e) => setStatus_name(e.target.value)}
                              />
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

export default RideStatusCreate;
