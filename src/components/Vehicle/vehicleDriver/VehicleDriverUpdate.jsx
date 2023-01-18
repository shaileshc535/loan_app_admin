import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  updateVehicleDriver,
  loadSingleVehicleDriver,
} from "../../../redux/action/vehicleDriverAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

function VehicleDriverUpdate({ id, showChange }) {
  const [state, setState] = useState({
    first_name: "",
    last_name: "",
    mobile: "",
    alternate_mobile: "",
    birth_date: "",
    email: "",
    gender: "",
    house_no: "",
    street_no: "",
    pincode: "",
    city: "",
    state_name: "",
    driving_licence_number: "",
    adhaar_no: "",
    pan_no: "",
  });

  const {
    first_name,
    last_name,
    mobile,
    alternate_mobile,
    birth_date,
    email,
    gender,
    house_no,
    street_no,
    pincode,
    city,
    state_name,
    driving_licence_number,
    adhaar_no,
    pan_no,
  } = state;

  let dispatch = useDispatch();

  let vehicleDriver = useSelector((state) => state.vehicleDriver);

  let { error, loading, singledata } = vehicleDriver;

  let driver = singledata[0];

  useEffect(() => {
    if (driver) {
      setState({ ...driver });
    }
  }, [driver]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !mobile) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(updateVehicleDriver(id, state));
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
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-header">
                      <h4 className="card-title">Update Driver Information</h4>
                    </div>

                    <div className="card-body">
                      <div className="card-body">
                        <form
                          noValidate
                          autoComplete="off"
                          onSubmit={handleSubmit}
                          encType="multipart/form-data"
                        >
                          <div className="new_user">
                            <div className="form-group row my-2">
                              <div className="col-6 mt-2">
                                <label
                                  htmlFor="first_name"
                                  className="text-dark"
                                >
                                  First Name :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="First Name"
                                  name="first_name"
                                  value={first_name || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6 mt-2">
                                <label
                                  htmlFor="last_name"
                                  className="text-dark"
                                >
                                  Last Name :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Last Name"
                                  className="form-control"
                                  value={last_name || ""}
                                  name="last_name"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2 mt-2">
                              <div className="col-4 mt-2">
                                <label htmlFor="mobile" className="text-dark">
                                  Contact Number :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Contact Number"
                                  className="form-control"
                                  value={mobile || ""}
                                  name="mobile"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-4 mt-2">
                                <label
                                  htmlFor="alternate_mobile"
                                  className="text-dark"
                                >
                                  Alternate Contact Number :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Alternate Contact Number"
                                  className="form-control"
                                  value={alternate_mobile || ""}
                                  name="alternate_mobile"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-4 mt-2">
                                <label
                                  htmlFor="birth_date"
                                  className="text-dark"
                                >
                                  Date Of Birth :
                                </label>
                                <input
                                  type="date"
                                  className="form-control"
                                  value={birth_date || ""}
                                  name="birth_date"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2 mt-2">
                              <div className="col-6 mt-2">
                                <label htmlFor="email" className="text-dark">
                                  Email Address :
                                </label>
                                <input
                                  type="email"
                                  placeholder="Email Address"
                                  className="form-control"
                                  value={email || ""}
                                  name="email"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6 mt-2">
                                <label htmlFor="gender" className="text-dark">
                                  Gender :
                                </label>
                                <select
                                  name="gender"
                                  onChange={handleInputChange}
                                  value={gender || ""}
                                  className="form-control"
                                >
                                  <option value="">Select Gender</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                  <option value="Other">Other</option>
                                </select>
                              </div>
                            </div>

                            <div className="form-group row my-2 mt-2">
                              <div className="col-6 mt-2">
                                <label htmlFor="house_no" className="text-dark">
                                  House Number :
                                </label>
                                <input
                                  type="text"
                                  placeholder="House Number"
                                  className="form-control"
                                  value={house_no || ""}
                                  name="house_no"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6 mt-2">
                                <label
                                  htmlFor="street_no"
                                  className="text-dark"
                                >
                                  Street Number :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Street Number"
                                  name="street_no"
                                  value={street_no || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2 mt-2">
                              <div className="col-6 mt-2">
                                <label htmlFor="city" className="text-dark">
                                  City :
                                </label>
                                <input
                                  type="text"
                                  placeholder="City"
                                  className="form-control"
                                  value={city || ""}
                                  name="city"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6 mt-2">
                                <label
                                  htmlFor="state_name"
                                  className="text-dark"
                                >
                                  State Name :
                                </label>
                                <input
                                  type="text"
                                  placeholder="State Name"
                                  className="form-control"
                                  value={state_name || ""}
                                  name="state_name"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2 mt-2">
                              <div className="col-6 mt-2">
                                <label htmlFor="pincode" className="text-dark">
                                  Postal Code :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Postal Code"
                                  className="form-control"
                                  value={pincode || ""}
                                  name="pincode"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6 mt-2">
                                <label
                                  htmlFor="driving_licence_number"
                                  className="text-dark"
                                >
                                  Driving Licence Number :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Driving Licence Number"
                                  className="form-control"
                                  value={driving_licence_number || ""}
                                  name="driving_licence_number"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2 mt-2">
                              <div className="col-6 mt-2">
                                <label
                                  htmlFor="adhaar_no"
                                  className="text-dark"
                                >
                                  Adhaar Number :
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder="Adhaar Number"
                                  name="adhaar_no"
                                  value={adhaar_no || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6 mt-2">
                                <label htmlFor="pan_no" className="text-dark">
                                  Pan Card Number :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Pan Card Number"
                                  className="form-control"
                                  value={pan_no || ""}
                                  name="pan_no"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VehicleDriverUpdate;
