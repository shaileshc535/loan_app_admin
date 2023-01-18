import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createJobRider } from "../../redux/action/jobRiderAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function JobRiderCreate({ showChange, notifyCreate }) {
  const [state, setState] = useState({
    driver_id: "",
    vehicle_id: "",
    shift_start_time: "",
    shift_end_time: "",
    geo_location: "",
    gprs_location: "",
    location_address: "",
    latitude: "",
    longitude: "",
    isactive: "",
    isavailable: "",
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  let dispatch = useDispatch();

  const {
    driver_id,
    vehicle_id,
    shift_start_time,
    shift_end_time,
    geo_location,
    gprs_location,
    location_address,
    latitude,
    longitude,
    isactive,
    isavailable,
  } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!driver_id || !vehicle_id) {
      setError("Please input all input Field");
    } else {
      dispatch(createJobRider(state));
      setError("");
      showChange();
      notifyCreate();
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
                    <h4 className="card-title">Add Cab Details</h4>
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
                              <label for="driver_id" className="text-dark">
                                Driver :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Driver"
                                name="driver_id"
                                value={driver_id}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-6">
                              <label for="vehicle_id" className="text-dark">
                                Vehicle :
                              </label>
                              <input
                                type="text"
                                placeholder="Vehicle"
                                className="form-control"
                                value={vehicle_id}
                                name="vehicle_id"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label
                                for="shift_start_time"
                                className="text-dark"
                              >
                                Shift Start Time :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="shift_start_time"
                                name="shift_start_time"
                                value={shift_start_time}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-6">
                              <label for="shift_end_time" className="text-dark">
                                Shift End Time :
                              </label>
                              <input
                                type="text"
                                placeholder="shift_end_time"
                                className="form-control"
                                value={shift_end_time}
                                name="shift_end_time"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label for="geo_location" className="text-dark">
                                GEO Location :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="GEO Location"
                                name="geo_location"
                                value={geo_location}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-6">
                              <label for="gprs_location" className="text-dark">
                                GPRS Location :
                              </label>
                              <input
                                type="text"
                                placeholder="GPRS Location"
                                className="form-control"
                                value={gprs_location}
                                name="gprs_location"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-4">
                              <label for="latitude" className="text-dark">
                                Latitude :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Latitude"
                                name="latitude"
                                value={latitude}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-4">
                              <label for="longitude" className="text-dark">
                                Longitude :
                              </label>
                              <input
                                type="text"
                                placeholder="Longitude"
                                className="form-control"
                                value={longitude}
                                name="longitude"
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-4">
                              <label
                                for="location_address"
                                className="text-dark"
                              >
                                Location Address :
                              </label>
                              <input
                                type="text"
                                placeholder="Location Address"
                                className="form-control"
                                value={location_address}
                                name="location_address"
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label for="isactive" className="text-dark">
                                Status :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Status"
                                name="isactive"
                                value={isactive}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-6">
                              <label for="isavailable" className="text-dark">
                                Availability :
                              </label>
                              <input
                                type="text"
                                placeholder="Availability"
                                className="form-control"
                                value={isavailable}
                                name="isavailable"
                                onChange={handleInputChange}
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

export default JobRiderCreate;
