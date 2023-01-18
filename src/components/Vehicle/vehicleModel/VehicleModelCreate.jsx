import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createVehicleModel } from "../../../redux/action/vehicleModelAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadAllVehicleType } from "../../../redux/action/vehicleTypeAction";

function VehicleModelCreate({ showChange, notifyCreate }) {
  const [vihicle_type_id, setVihicle_type_id] = useState("");
  const [model_name, setModel_name] = useState("");
  const [model_descritpion, setModel_descritpion] = useState("");
  const [error, setError] = useState("");

  const handleModelName = (e) => setModel_name(e.target.value);
  const handleModelDesc = (e) => setModel_descritpion(e.target.value);

  const handleVehicleTypeSelect = (e) => {
    const vihicle_type_id = e.target.value;
    setVihicle_type_id(vihicle_type_id);
  };

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAllVehicleType());
  }, []);

  const VehicleType = useSelector((state) => state.vehicleType.result);

  const data = {
    vihicle_type_id,
    model_name,
    model_descritpion,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model_name) {
      setError("Please input all input Field");
    } else {
      dispatch(createVehicleModel(data));
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
                    <h4 className="card-title">Add New Model</h4>
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
                              <label htmlFor="model_name" className="text-dark">
                                Model Name :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Model Name"
                                name="model_name"
                                value={model_name}
                                required
                                onChange={handleModelName}
                              />
                            </div>
                            <div className="col-6">
                              <label
                                htmlFor="model_descritpion"
                                className="text-dark"
                              >
                                Model Description :
                              </label>
                              <input
                                type="text"
                                placeholder="Model Description"
                                className="form-control"
                                value={model_descritpion}
                                name="model_descritpion"
                                required
                                onChange={handleModelDesc}
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label
                                htmlFor="vihicle_type_id"
                                className="text-dark"
                              >
                                Vehicle Type :
                              </label>
                              <select
                                name="vihicle_type_id"
                                onChange={(e) => handleVehicleTypeSelect(e)}
                                value={vihicle_type_id}
                                className="form-control"
                                required
                              >
                                <option value="">Vehicle Type</option>
                                {VehicleType.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.name}
                                  </option>
                                ))}
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

export default VehicleModelCreate;
