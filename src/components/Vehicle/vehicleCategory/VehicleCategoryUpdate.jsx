import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateVehicleCategory } from "../../../redux/action/vehicleCategoryAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../../pages/Shared/Loader";
import Message from "../../../pages/Shared/Message";

function VehicleCategoryUpdate({ id, showChange }) {
  const [state, setState] = useState({
    name: "",
  });

  const { name } = state;

  const [icon, setIcon] = useState([]);

  let dispatch = useDispatch();

  let vehicleCategory = useSelector((state) => state.vehicleCategory);

  let { error, loading, singledata } = vehicleCategory;

  let category = singledata[0];

  useEffect(() => {
    if (category) {
      setState({ ...category });
    }
  }, [category]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.warning("Please input all input Field!");
    } else {
      let formData = new FormData();
      formData.append("icon", icon[0]);
      formData.append("name", name);

      dispatch(updateVehicleCategory(id, formData));
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
                        Update Category Details
                      </h4>
                    </div>
                    <div className="card-body">
                      <div className="card-body">
                        <form
                          onSubmit={handleSubmit}
                          noValidate
                          autoComplete="off"
                          encType="multipart/form-data"
                        >
                          <div className="new_user">
                            <div className="form-group row my-2">
                              <div className="col-6">
                                <label htmlFor="name" className="text-dark">
                                  Category Name :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Category Name"
                                  name="name"
                                  value={name}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6">
                                <label htmlFor="icon" className="text-dark">
                                  Icon :
                                </label>
                                <input
                                  type="file"
                                  name="icon"
                                  className="form-control"
                                  onChange={(e) => setIcon(e.target.files)}
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

export default VehicleCategoryUpdate;
