import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicleDetails } from "../../../redux/action/vehicleAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

function VehicleUpdate({ id, showChange }) {
  const [state, setState] = useState({
    vehicle_type: "",
    vehicle_category: "",
    vehicle_model_id: "",
    vehicle_driver: "",
    vehicle_brand: "",
    engine_no: "",
    chachis_no: "",
    seating_avaibility: "",
    manufacture_year: "",
    license_plate: "",
    color: "",
    valid_till: "",
  });

  const {
    vehicle_type,
    vehicle_category,
    vehicle_model_id,
    vehicle_driver,
    vehicle_brand,
    engine_no,
    chachis_no,
    seating_avaibility,
    manufacture_year,
    license_plate,
    color,
    valid_till,
  } = state;

  let dispatch = useDispatch();

  const vehicleType = useSelector((state1) => state1.vehicleType.result);
  const vehicleCategory = useSelector(
    (state2) => state2.vehicleCategory.result
  );
  const vehicleModel = useSelector((state3) => state3.vehicleModel.result);
  const vehicleDriver = useSelector((state4) => state4.vehicleDriver.result1);

  let vehicleDetails = useSelector((state5) => state5.vehicleDetails);

  let { error, loading, singledata } = vehicleDetails;

  let vehicle = singledata[0];

  useEffect(() => {
    if (vehicle) {
      setState({ ...vehicle });
    }
  }, [vehicle]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!license_plate || !vehicle_model_id) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(updateVehicleDetails(id, state));
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
                      <h4 className="card-title">Update Vehicle Details</h4>
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
                                <label for="vehicle_type" className="text-dark">
                                  Vehicle Type :
                                </label>
                                <select
                                  name="vehicle_type"
                                  onChange={handleInputChange}
                                  value={vehicle_type || ""}
                                  className="form-control"
                                >
                                  <option value="">Select Vehicle Type</option>
                                  {vehicleType.map((item, i) => (
                                    <option key={i} value={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div className="col-6">
                                <label
                                  for="vehicle_model_id"
                                  className="text-dark"
                                >
                                  Vehicle model :
                                </label>
                                <select
                                  name="vehicle_model_id"
                                  onChange={handleInputChange}
                                  value={vehicle_model_id || ""}
                                  className="form-control"
                                >
                                  <option value="">Select Vehicle Model</option>
                                  {vehicleModel.map((item, i) => (
                                    <option key={i} value={item.id}>
                                      {item.model_name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label
                                  for="vehicle_category"
                                  className="text-dark"
                                >
                                  Vehicle Category :
                                </label>
                                <select
                                  name="vehicle_category"
                                  onChange={handleInputChange}
                                  value={vehicle_category || ""}
                                  className="form-control"
                                >
                                  <option value="">
                                    Select Vehicle Category
                                  </option>
                                  {vehicleCategory.map((item, i) => (
                                    <option key={i} value={item.id}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="col-6">
                                <label
                                  for="vehicle_driver"
                                  className="text-dark"
                                >
                                  Vehicle Driver :
                                </label>
                                <select
                                  name="vehicle_driver"
                                  onChange={handleInputChange}
                                  value={vehicle_driver || ""}
                                  className="form-control"
                                >
                                  <option value="">
                                    Select Vehicle Driver
                                  </option>
                                  {vehicleDriver.map((item, i) => (
                                    <option key={i} value={item.id}>
                                      {item.driverName !== null &&
                                      item.driverName !== undefined
                                        ? item.driverName
                                        : item.mobile}
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>

                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label
                                  for="vehicle_brand"
                                  className="text-dark"
                                >
                                  Vehicle Brand :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Vehicle Brand"
                                  className="form-control"
                                  value={vehicle_brand || ""}
                                  name="vehicle_brand"
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6">
                                <label for="color" className="text-dark">
                                  Color :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Color"
                                  className="form-control"
                                  value={color || ""}
                                  name="color"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label for="engine_no" className="text-dark">
                                  Engine Number :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Engine Number"
                                  className="form-control"
                                  value={engine_no || ""}
                                  name="engine_no"
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="col-6">
                                <label for="chachis_no" className="text-dark">
                                  Chashis Number :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Chashis Number"
                                  className="form-control"
                                  value={chachis_no || ""}
                                  name="chachis_no"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label
                                  for="manufacture_year"
                                  className="text-dark"
                                >
                                  Manufacture Year :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Manufacture Year"
                                  className="form-control"
                                  value={manufacture_year || ""}
                                  name="manufacture_year"
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="col-6">
                                <label
                                  for="license_plate"
                                  className="text-dark"
                                >
                                  License Plate Number :
                                </label>
                                <input
                                  type="text"
                                  placeholder="License Plate Number"
                                  className="form-control"
                                  value={license_plate || ""}
                                  name="license_plate"
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label for="valid_till" className="text-dark">
                                  Valid Till :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Valid Till"
                                  className="form-control"
                                  value={valid_till || ""}
                                  name="valid_till"
                                  onChange={handleInputChange}
                                />
                              </div>

                              <div className="col-6">
                                <label
                                  for="seating_avaibility"
                                  className="text-dark"
                                >
                                  Seating Capacity :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Valid Till"
                                  className="form-control"
                                  value={seating_avaibility || ""}
                                  name="seating_avaibility"
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
      )}
    </div>
  );
}

export default VehicleUpdate;
