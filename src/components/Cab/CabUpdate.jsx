import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateCab } from "../../redux/action/cabAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

function CabUpdate({ id, showChange }) {
  const [state, setState] = useState({
    driver_id: "",
    vehicle_id: "",
    shift_start_time: "",
    shift_end_time: "",
    isactive: "",
    isavailable: "",
  });

  const {
    driver_id,
    vehicle_id,
    shift_start_time,
    shift_end_time,
    isactive,
    isavailable,
  } = state;

  let dispatch = useDispatch();

  const vehicleDetails = useSelector((state) => state.vehicleDetails.result);
  const vehicleDriver = useSelector((state) => state.vehicleDriver.result);

  let cabDetails = useSelector((state) => state.cabDetails);

  let { error, loading, singledata } = cabDetails;

  let cab = singledata[0];

  useEffect(() => {
    if (cab) {
      setState({ ...cab });
    }
  }, [cab]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!driver_id || !vehicle_id) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(updateCab(id, state));
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
                      <h4 className="card-title">Update Cab Details</h4>
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
                                  htmlFor="driver_id"
                                  className="text-dark"
                                >
                                  Driver :
                                </label>
                                <select
                                  name="driver_id"
                                  onChange={handleInputChange}
                                  value={driver_id || ""}
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
                                <label
                                  htmlFor="vehicle_id"
                                  className="text-dark"
                                >
                                  Vehicle :
                                </label>
                                <select
                                  name="vehicle_id"
                                  onChange={handleInputChange}
                                  value={vehicle_id || ""}
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
                                  onChange={handleInputChange}
                                  value={shift_start_time || ""}
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
                                  onChange={handleInputChange}
                                  value={shift_end_time || ""}
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
                                  onChange={handleInputChange}
                                  value={isactive || ""}
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
                                  onChange={handleInputChange}
                                  value={isavailable || ""}
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
      )}
    </div>
  );
}

export default CabUpdate;
