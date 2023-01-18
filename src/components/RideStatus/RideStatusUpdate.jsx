import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadSingleRideStatus,
  updateRideStatus,
} from "../../redux/action/rideStatusAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function RideStatusUpdate({ id, showChange }) {
  const [status_name, setStatusName] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleRideStatus(id));
  }, []);

  const rideStatus = useSelector((state) => state.rideStatus.singledata[0]);

  useEffect(() => {
    if (rideStatus) {
      setStatusName(rideStatus.status_name);
    }
  }, [setStatusName]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!status_name) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(updateRideStatus(id, status_name));
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
                    <h4 className="card-title">Update Ride Status</h4>
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
                              <label
                                htmlFor="status_name"
                                className="text-dark"
                              >
                                Ride Status :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Ride Status"
                                name="type_name"
                                value={status_name || ""}
                                onChange={(e) => setStatusName(e.target.value)}
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

export default RideStatusUpdate;
