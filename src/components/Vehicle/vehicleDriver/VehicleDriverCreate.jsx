import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createVehicleDriver } from "../../../redux/action/vehicleDriverAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VehicleDriverCreate({ showChange }) {
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [mobile, setMobile] = useState("");
  const [alternate_mobile, setAlternate_mobile] = useState("");
  const [birth_date, setBirth_date] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [house_no, setHouse_no] = useState("");
  const [street_no, setStreet_no] = useState("");
  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state_name, setState_name] = useState("");
  const [driving_licence_number, setDriving_licence_number] = useState("");
  const [adhaar_no, setAdhaar_no] = useState("");
  const [pan_no, setPan_no] = useState("");

  let dispatch = useDispatch();

  let data = {
    first_name: first_name,
    last_name: last_name,
    mobile: mobile,
    alternate_mobile: alternate_mobile,
    birth_date: birth_date,
    email: email,
    gender: gender,
    house_no: house_no,
    street_no: street_no,
    pincode: pincode,
    city: city,
    state_name: state_name,
    driving_licence_number: driving_licence_number,
    adhaar_no: adhaar_no,
    pan_no: pan_no,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!first_name || !mobile) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(createVehicleDriver(data));
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
                    <h4 className="card-title">Add Driver Information</h4>
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
                              <label htmlFor="first_name" className="text-dark">
                                First Name :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="First Name"
                                name="first_name"
                                value={first_name || ""}
                                onChange={(e) => setFirst_name(e.target.value)}
                              />
                            </div>
                            <div className="col-6 mt-2">
                              <label htmlFor="last_name" className="text-dark">
                                Last Name :
                              </label>
                              <input
                                type="text"
                                placeholder="Last Name"
                                className="form-control"
                                value={last_name || ""}
                                name="last_name"
                                onChange={(e) => setLast_name(e.target.value)}
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
                                onChange={(e) => setMobile(e.target.value)}
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
                                onChange={(e) =>
                                  setAlternate_mobile(e.target.value)
                                }
                              />
                            </div>
                            <div className="col-4 mt-2">
                              <label htmlFor="birth_date" className="text-dark">
                                Date Of Birth :
                              </label>
                              <input
                                type="date"
                                className="form-control"
                                value={birth_date || ""}
                                name="birth_date"
                                onChange={(e) => setBirth_date(e.target.value)}
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
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                            <div className="col-6 mt-2">
                              <label htmlFor="gender" className="text-dark">
                                Gender :
                              </label>
                              <select
                                name="gender"
                                onChange={(e) => setGender(e.target.value)}
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
                                onChange={(e) => setHouse_no(e.target.value)}
                              />
                            </div>
                            <div className="col-6 mt-2">
                              <label htmlFor="street_no" className="text-dark">
                                Street Number :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Street Number"
                                name="street_no"
                                value={street_no || ""}
                                onChange={(e) => setStreet_no(e.target.value)}
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
                                onChange={(e) => setCity(e.target.value)}
                              />
                            </div>
                            <div className="col-6 mt-2">
                              <label htmlFor="state_name" className="text-dark">
                                State Name :
                              </label>
                              <input
                                type="text"
                                placeholder="State Name"
                                className="form-control"
                                value={state_name || ""}
                                name="state_name"
                                onChange={(e) => setState_name(e.target.value)}
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
                                onChange={(e) => setPincode(e.target.value)}
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
                                onChange={(e) =>
                                  setDriving_licence_number(e.target.value)
                                }
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2 mt-2">
                            <div className="col-6 mt-2">
                              <label htmlFor="adhaar_no" className="text-dark">
                                Adhaar Number :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Adhaar Number"
                                name="adhaar_no"
                                value={adhaar_no || ""}
                                onChange={(e) => setAdhaar_no(e.target.value)}
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
                                onChange={(e) => setPan_no(e.target.value)}
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

export default VehicleDriverCreate;
