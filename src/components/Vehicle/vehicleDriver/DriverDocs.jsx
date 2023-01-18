import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { updateDriverDocs } from "../../../redux/action/vehicleDriverAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const DriverDocs = ({ id, showChange }) => {
  const [adhar_front, setAdhar_front] = useState([]);
  const [adhar_back, setAdhar_back] = useState([]);
  const [pan_front, setPan_front] = useState([]);
  const [driving_licence_front, setDriving_licence_front] = useState([]);
  const [driving_licence_back, setDriving_licence_back] = useState([]);
  const [photo, setPhoto] = useState([]);

  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!adhar_front || !pan_front || !driving_licence_front) {
      toast.warning("Please input all input Field!");
    } else {
      let formData = new FormData();
      formData.append("adhar_front", adhar_front[0]);
      formData.append("adhar_back", adhar_back[0]);
      formData.append("pan_front", pan_front[0]);
      formData.append("driving_licence_front", driving_licence_front[0]);
      formData.append("driving_licence_back", driving_licence_back[0]);
      formData.append("photo", photo[0]);
      dispatch(updateDriverDocs(id, formData));
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
                    <h4 className="card-title">Driver Documents</h4>
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
                              <label for="adhar_front" className="text-dark">
                                Adhar Front Image :
                              </label>
                              <input
                                type="file"
                                name="adhar_front"
                                className="form-control"
                                onChange={(e) => setAdhar_front(e.target.files)}
                                accept="image/*"
                              />
                            </div>
                            <div className="col-6">
                              <label for="adhar_back" className="text-dark">
                                Adhar Back Image :
                              </label>
                              <input
                                type="file"
                                name="adhar_back"
                                className="form-control"
                                onChange={(e) => setAdhar_back(e.target.files)}
                                accept="image/*"
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label
                                for="driving_licence_front"
                                className="text-dark"
                              >
                                DL Front Image :
                              </label>
                              <input
                                type="file"
                                name="driving_licence_front"
                                className="form-control"
                                onChange={(e) =>
                                  setDriving_licence_front(e.target.files)
                                }
                                accept="image/*"
                              />
                            </div>
                            <div className="col-6">
                              <label
                                for="driving_licence_back"
                                className="text-dark"
                              >
                                DL Front Image :
                              </label>
                              <input
                                type="file"
                                name="driving_licence_back"
                                className="form-control"
                                onChange={(e) =>
                                  setDriving_licence_back(e.target.files)
                                }
                                accept="image/*"
                              />
                            </div>
                          </div>

                          <div className="form-group row my-2">
                            <div className="col-6">
                              <label for="pan_front" className="text-dark">
                                Pan Card Image :
                              </label>
                              <input
                                type="file"
                                name="pan_front"
                                className="form-control"
                                onChange={(e) => setPan_front(e.target.files)}
                                accept="image/*"
                              />
                            </div>
                            <div className="col-6">
                              <label htmlFor="photo" className="text-dark">
                                Driver Photo :
                              </label>
                              <input
                                type="file"
                                name="photo"
                                className="form-control"
                                onChange={(e) => setPhoto(e.target.files)}
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

export default DriverDocs;
