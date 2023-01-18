import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createCab } from "../../redux/action/cabAction";
import { loadAllVehicleDriver } from "../../redux/action/vehicleDriverAction";
import { loadAllVehicles } from "../../redux/action/vehicleAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CabCreate({ showChange }) {
  const [driver_id, setDriver_id] = useState("");
  const [vehicle_id, setVehicle_id] = useState("");
  const [shift_start_time, setShift_start_time] = useState("");
  const [shift_end_time, setShift_end_time] = useState("");
  const [isactive, setIsactive] = useState("");
  const [isavailable, setIsavailable] = useState("");
  const [error, setError] = useState("");

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllVehicles());
    dispatch(loadAllVehicleDriver());
  }, []);

  const vehicleDetails = useSelector((state) => state.vehicleDetails.result);
  const vehicleDriver = useSelector((state) => state.vehicleDriver.result);

  const handleDriverSelect = (e) => {
    const driverSelect = e.target.value;
    setDriver_id(driverSelect);
  };
  const handleVehicleSelect = (e) => {
    const vehicleSelect = e.target.value;
    setVehicle_id(vehicleSelect);
  };
  const handleshift_start_timeSelect = (e) => {
    const shift_start_timeSel = e.target.value;
    setShift_start_time(shift_start_timeSel);
  };
  const handleshift_end_timeSelect = (e) => {
    const shift_end_timeSel = e.target.value;
    setShift_end_time(shift_end_timeSel);
  };
  const handleisactiveSelect = (e) => {
    const isactiveSel = e.target.value;
    setIsactive(isactiveSel);
  };
  const handleisavailableSelect = (e) => {
    const isavailableSel = e.target.value;
    setIsavailable(isavailableSel);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!driver_id || !vehicle_id) {
      setError("Please input all input Field");
    } else {
      dispatch(
        createCab(
          driver_id,
          vehicle_id,
          shift_start_time,
          shift_end_time,
          isactive,
          isavailable
        )
      );
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
                              <label htmlFor="driver_id" className="text-dark">
                                Driver :
                              </label>
                              <select
                                name="driver_id"
                                onChange={(e) => handleDriverSelect(e)}
                                value={driver_id}
                                className="form-control"
                              >
                                <option value="">Select Driver</option>
                                {vehicleDriver.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.driverName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="col-6">
                              <label htmlFor="vehicle_id" className="text-dark">
                                Vehicle :
                              </label>
                              <select
                                name="vehicle_id"
                                onChange={(e) => handleVehicleSelect(e)}
                                value={vehicle_id}
                                className="form-control"
                              >
                                <option value="">Select Vehicle</option>
                                {vehicleDetails.map((item) => (
                                  <option
                                    key={item.vehicleId}
                                    value={item.vehicleId}
                                  >
                                    {item.license_plate}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label
                                htmlFor="shift_start_time"
                                className="text-dark"
                              >
                                Shift Start Time:
                              </label>
                              <select
                                name="shift_start_time"
                                onChange={(e) =>
                                  handleshift_start_timeSelect(e)
                                }
                                value={shift_start_time}
                                className="form-control"
                              >
                                <option value="">
                                  Select Shift End Timing
                                </option>
                                <option value="05AM to 11AM">
                                  05AM to 11AM
                                </option>
                                <option value="11AM to 05PM">
                                  11AM to 05PM
                                </option>
                                <option value="11AM to 05PM">
                                  05PM to 11PM
                                </option>
                                <option value="11AM to 05PM">
                                  11PM to 05AM
                                </option>
                              </select>
                            </div>
                            <div className="col-6">
                              <label
                                htmlFor="shift_end_time"
                                className="text-dark"
                              >
                                Shift End Time:
                              </label>
                              <select
                                name="shift_end_time"
                                onChange={(e) => handleshift_end_timeSelect(e)}
                                value={shift_end_time}
                                className="form-control"
                              >
                                <option value="">
                                  Select Shift End Timing
                                </option>
                                <option value="05AM to 11AM">
                                  05AM to 11AM
                                </option>
                                <option value="11AM to 05PM">
                                  11AM to 05PM
                                </option>
                                <option value="11AM to 05PM">
                                  05PM to 11PM
                                </option>
                                <option value="11AM to 05PM">
                                  11PM to 05AM
                                </option>
                              </select>
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label htmlFor="isactive" className="text-dark">
                                Status :
                              </label>
                              <select
                                name="isactive"
                                onChange={(e) => handleisactiveSelect(e)}
                                value={isactive}
                                className="form-control"
                              >
                                <option value="">Select Status</option>
                                <option value="1">Active</option>
                                <option value="0">Deactive</option>
                              </select>
                            </div>
                            <div className="col-6">
                              <label
                                htmlFor="isavailable"
                                className="text-dark"
                              >
                                Availability Status :
                              </label>
                              <select
                                name="isavailable"
                                onChange={(e) => handleisavailableSelect(e)}
                                value={isavailable}
                                className="form-control"
                              >
                                <option value="">Availability Status</option>
                                <option value="1">Availabl</option>
                                <option value="0">Busy</option>
                              </select>
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

export default CabCreate;
