import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createVehicle } from "../../../redux/action/vehicleAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VehicleCreate({ showChange }) {
  const [vehicle_type, setVehicle_type] = useState("");
  const [vehicle_category, setVehicle_category] = useState("");
  const [vehicle_model_id, setVehicle_model_id] = useState("");
  const [vehicle_driver, setVehicle_driver] = useState("");
  const [vehicle_brand, setVehicle_brand] = useState("");
  const [engine_no, setEngine_no] = useState("");
  const [chachis_no, setChachis_no] = useState("");
  const [seating_avaibility, setSeating_avaibility] = useState("");
  const [manufacture_year, setManufacture_year] = useState("");
  const [license_plate, setLicense_plate] = useState("");
  const [color, setColor] = useState("");
  const [valid_till, setValid_till] = useState("");

  let dispatch = useDispatch();

  const vehicleType = useSelector((state) => state.vehicleType.result);
  const vehicleCategory = useSelector((state) => state.vehicleCategory.result);
  const vehicleModel = useSelector((state) => state.vehicleModel.result);
  const vehicleDriver = useSelector((state) => state.vehicleDriver.result1);

  const handleVehicleDriverSelect = (e) => {
    const vehicleDriverSel = e.target.value;
    setVehicle_driver(vehicleDriverSel);
  };

  const handleVehicleTypeSelect = (e) => {
    const vehicleTypeSel = e.target.value;
    setVehicle_type(vehicleTypeSel);
  };

  const handlevehicleModelSelect = (e) => {
    const vehicleModelSel = e.target.value;
    setVehicle_model_id(vehicleModelSel);
  };

  const handleVehicleCategorySelect = (e) => {
    const vehicleCat = e.target.value;
    setVehicle_category(vehicleCat);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!license_plate || !vehicle_model_id) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(
        createVehicle(
          vehicle_type,
          vehicle_category,
          vehicle_model_id,
          vehicle_driver,
          manufacture_year,
          license_plate,
          valid_till,
          color,
          vehicle_brand,
          engine_no,
          chachis_no,
          seating_avaibility
        )
      );
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
                    <h4 className="card-title">Add New Vehicle</h4>
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
                                onChange={(e) => handleVehicleTypeSelect(e)}
                                value={vehicle_type}
                                className="form-control"
                              >
                                <option value="">Select Vehicle Owner</option>
                                {vehicleType.map((item) => (
                                  <option key={item.id} value={item.id}>
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
                                onChange={(e) => handlevehicleModelSelect(e)}
                                value={vehicle_model_id}
                                className="form-control"
                              >
                                <option value="">Select Vehicle Model</option>
                                {vehicleModel.map((item) => (
                                  <option key={item.id} value={item.id}>
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
                                onChange={(e) => handleVehicleCategorySelect(e)}
                                value={vehicle_category}
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
                              <label for="vehicle_driver" className="text-dark">
                                Vehicle Driver :
                              </label>
                              <select
                                name="vehicle_driver"
                                onChange={(e) => handleVehicleDriverSelect(e)}
                                value={vehicle_driver}
                                className="form-control"
                              >
                                <option value="">Select Vehicle Driver</option>
                                {vehicleDriver.map((item) => (
                                  <option key={item.id} value={item.id}>
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
                              <label for="vehicle_brand" className="text-dark">
                                Vehicle Brand :
                              </label>
                              <input
                                type="text"
                                placeholder="Vehicle Brand"
                                className="form-control"
                                value={vehicle_brand}
                                name="vehicle_brand"
                                onChange={(e) =>
                                  setVehicle_brand(e.target.value)
                                }
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
                                value={color}
                                name="color"
                                onChange={(e) => setColor(e.target.value)}
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
                                value={engine_no}
                                name="engine_no"
                                onChange={(e) => setEngine_no(e.target.value)}
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
                                value={chachis_no}
                                name="chachis_no"
                                onChange={(e) => setChachis_no(e.target.value)}
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
                                value={manufacture_year}
                                name="manufacture_year"
                                onChange={(e) =>
                                  setManufacture_year(e.target.value)
                                }
                              />
                            </div>

                            <div className="col-6">
                              <label for="license_plate" className="text-dark">
                                License Plate Number :
                              </label>
                              <input
                                type="text"
                                placeholder="License Plate Number"
                                className="form-control"
                                value={license_plate}
                                name="license_plate"
                                onChange={(e) =>
                                  setLicense_plate(e.target.value)
                                }
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
                                value={valid_till}
                                name="valid_till"
                                onChange={(e) => setValid_till(e.target.value)}
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
                                value={seating_avaibility}
                                name="seating_avaibility"
                                onChange={(e) =>
                                  setSeating_avaibility(e.target.value)
                                }
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

export default VehicleCreate;
