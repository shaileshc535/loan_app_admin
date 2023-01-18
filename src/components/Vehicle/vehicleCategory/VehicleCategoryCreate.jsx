import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createVehicleCategory } from "../../../redux/action/vehicleCategoryAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function VehicleCategoryCreate({ showChange }) {
  const [name, setName] = useState("");
  const [icon, setIcon] = useState([]);

  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name && !icon) {
      toast.warning("Please input all input Field!");
    } else {
      let formData = new FormData();
      formData.append("icon", icon[0]);
      formData.append("name", name);

      dispatch(createVehicleCategory(formData));
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
                    <h4 className="card-title">Add New Category</h4>
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
                                onChange={(e) => setName(e.target.value)}
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
    </div>
  );
}

export default VehicleCategoryCreate;
