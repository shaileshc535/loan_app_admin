import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateVehicleDocs } from "../../../redux/action/vehicleAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VehicleDocs = ({ showChange, id }) => {
  const [front_image, setFront_image] = useState([]);
  const [back_image, setBack_image] = useState([]);
  const [polution, setPolution] = useState([]);
  const [insurence, setInsurence] = useState([]);
  const [vehicle_rc, setVehicle_rc] = useState([]);

  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!insurence || !vehicle_rc) {
      toast.warning("Please input all input Field!");
    } else {
      let formData = new FormData();
      formData.append("front_image", front_image[0]);
      formData.append("back_image", back_image[0]);
      formData.append("polution", polution[0]);
      formData.append("insurence", insurence[0]);
      formData.append("vehicle_rc", vehicle_rc[0]);

      dispatch(updateVehicleDocs(id, formData));
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
                    <h4 className="card-title">Vehicle Documents</h4>
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
                            <div className="col-6">
                              <label
                                htmlFfor="front_image"
                                className="text-dark"
                              >
                                Vehicle Front Images :
                              </label>
                              <input
                                type="file"
                                name="front_image"
                                className="form-control"
                                onChange={(e) => setFront_image(e.target.files)}
                                accept="image/*"
                              />
                            </div>
                            <div className="col-6">
                              <label htmlFor="back_image" className="text-dark">
                                Vehicle Back Images :
                              </label>
                              <input
                                type="file"
                                name="back_image"
                                className="form-control"
                                onChange={(e) => setBack_image(e.target.files)}
                                accept="image/*"
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label htmlFor="polution" className="text-dark">
                                Polution Certificate :
                              </label>
                              <input
                                type="file"
                                name="polution"
                                className="form-control"
                                onChange={(e) => setPolution(e.target.files)}
                                accept="image/*"
                              />
                            </div>
                            <div className="col-6">
                              <label htmlFor="insurence" className="text-dark">
                                Insurence :
                              </label>
                              <input
                                type="file"
                                name="insurence"
                                className="form-control"
                                onChange={(e) => setInsurence(e.target.files)}
                                accept="image/*"
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label htmlFor="vehicle_rc" className="text-dark">
                                Registration Certificate :
                              </label>
                              <input
                                type="file"
                                name="vehicle_rc"
                                className="form-control"
                                onChange={(e) => setVehicle_rc(e.target.files)}
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
    </div>
  );
};

export default VehicleDocs;
