import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicleType } from "../../../redux/action/vehicleTypeAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

function VehicleTypeUpdate({ id, showChange }) {
  const [state, setState] = useState({
    name: "",
    price_km: "",
    gst: "",
    driver_tax: "",
    access_fee: "",
    vehicle_category: "",
    base_charge: "",
    base_km: "",
    waiting_coast: "",
    commision: "",
  });

  const {
    name,
    price_km,
    gst,
    driver_tax,
    access_fee,
    vehicle_category,
    base_charge,
    base_km,
    waiting_coast,
    commision,
  } = state;

  const [icon, setIcon] = useState([]);

  let dispatch = useDispatch();

  let vehicleType = useSelector((state) => state.vehicleType);

  let { error, loading, singledata } = vehicleType;

  let vehicleTypeDetails = singledata[0];

  useEffect(() => {
    if (vehicleTypeDetails) {
      setState({ ...vehicleTypeDetails });
    }
  }, [vehicleTypeDetails]);

  const vehicleCategory = useSelector((state) => state.vehicleCategory.result);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !name &&
      !price_km &&
      !access_fee &&
      !vehicle_category &&
      !base_charge &&
      !commision &&
      !icon &&
      !gst &&
      !driver_tax &&
      !base_km &&
      !waiting_coast &&
      !icon
    ) {
      toast.error("Please input all input Field!");
    } else {
      let formData = new FormData();
      formData.append("name", name);
      formData.append("price_km", price_km);
      formData.append("access_fee", access_fee);
      formData.append("gst", gst);
      formData.append("driver_tax", driver_tax);
      formData.append("vehicle_category", vehicle_category);
      formData.append("base_charge", base_charge);
      formData.append("base_km", base_km);
      formData.append("waiting_coast", waiting_coast);
      formData.append("commision", commision);
      formData.append("icon", icon[0]);

      dispatch(updateVehicleType(id, formData));
      showChange();
    }
  };

  return (
    <div className="content">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
                      <h4 className="card-title">
                        Update Vehicle Type Details
                      </h4>
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
                                <label htmlFor="name" className="text-dark">
                                  Name :
                                </label>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  placeholder="Type Name"
                                  name="name"
                                  value={name || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6">
                                <label htmlFor="price_km" className="text-dark">
                                  Price Per KM :
                                </label>
                                <input
                                  required
                                  type="text"
                                  placeholder="Price Per KM"
                                  className="form-control"
                                  value={price_km || ""}
                                  name="price_km"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2">
                              <div className="col-4">
                                <label
                                  htmlFor="access_fee"
                                  className="text-dark"
                                >
                                  Total Access Fee :
                                </label>
                                <input
                                  required
                                  type="text"
                                  placeholder="Price Per KM"
                                  className="form-control"
                                  value={access_fee || ""}
                                  name="access_fee"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-4">
                                <label htmlFor="gst" className="text-dark">
                                  Tax :
                                </label>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  placeholder="GST"
                                  name="gst"
                                  value={gst || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-4">
                                <label
                                  htmlFor="driver_tax"
                                  className="text-dark"
                                >
                                  Driver Tax :
                                </label>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  placeholder="Driver Tax"
                                  name="driver_tax"
                                  value={driver_tax || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label
                                  htmlFor="base_charge"
                                  className="text-dark"
                                >
                                  Basic Charges :
                                </label>
                                <input
                                  required
                                  type="text"
                                  placeholder="Base Charges"
                                  className="form-control"
                                  value={base_charge || ""}
                                  name="base_charge"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6">
                                <label htmlFor="base_km" className="text-dark">
                                  Basic KM Value :
                                </label>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  placeholder="Basic KM Value"
                                  name="base_km"
                                  value={base_km || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label
                                  htmlFor="waiting_coast"
                                  className="text-dark"
                                >
                                  Waiting Coast Per Minute :
                                </label>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  placeholder="Waiting Coast Per Minute"
                                  name="waiting_coast"
                                  value={waiting_coast || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6">
                                <label
                                  htmlFor="commision"
                                  className="text-dark"
                                >
                                  Company Commision Per Ride :
                                </label>
                                <input
                                  required
                                  type="text"
                                  className="form-control"
                                  placeholder="Company Commision Per Ride"
                                  name="commision"
                                  value={commision || ""}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label
                                  htmlFor="vehicle_category"
                                  className="text-dark"
                                >
                                  Vehicle Category :
                                </label>
                                <select
                                  required
                                  name="vehicle_category"
                                  onChange={handleInputChange}
                                  value={vehicle_category || ""}
                                  className="form-control"
                                >
                                  <option value="">
                                    Select Vehicle Category
                                  </option>
                                  {vehicleCategory.map((item) => (
                                    <option key={item.id} value={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-6">
                                <label htmlFor="icon" className="text-dark">
                                  Set New Icon/Logo :
                                </label>
                                <input
                                  required
                                  type="file"
                                  name="icon"
                                  className="form-control"
                                  onChange={(e) => setIcon(e.target.files)}
                                  // onChange={setBtn(true)}
                                  accept="image/*"
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
      )}
    </div>
  );
}

export default VehicleTypeUpdate;
