import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicleModel } from "../../../redux/action/vehicleModelAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

function VehicleModelUpdate({ id, showChange }) {
  const [state, setState] = useState({
    model_name: "",
    model_descritpion: "",
    vihicle_type_id: "",
  });

  const { model_name, model_descritpion, vihicle_type_id } = state;

  let dispatch = useDispatch();

  const VehicleType = useSelector((state) => state.vehicleType.result);

  let vehicleModel = useSelector((state) => state.vehicleModel);

  let { error, loading, singledata } = vehicleModel;

  let model = singledata[0];

  useEffect(() => {
    if (model) {
      setState({ ...model });
    }
  }, [model]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!model_name && !model_descritpion && !vihicle_type_id) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(updateVehicleModel(id, state));
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
                      <h4 className="card-title">Update Model Details</h4>
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
                                <label for="model_name" className="text-dark">
                                  Model Name :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Model Name"
                                  name="model_name"
                                  value={model_name || ""}
                                  required
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6">
                                <label
                                  for="model_descritpion"
                                  className="text-dark"
                                >
                                  Model Description :
                                </label>
                                <input
                                  type="text"
                                  placeholder="Model Description"
                                  className="form-control"
                                  value={model_descritpion || ""}
                                  name="model_descritpion"
                                  required
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label
                                  for="vihicle_type_id"
                                  className="text-dark"
                                >
                                  Vehicle Type :
                                </label>
                                <select
                                  required
                                  name="vihicle_type_id"
                                  onChange={handleInputChange}
                                  value={vihicle_type_id || ""}
                                  className="form-control"
                                >
                                  <option value="">Selct Vehicle Type</option>
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
      )}
    </div>
  );
}

export default VehicleModelUpdate;
