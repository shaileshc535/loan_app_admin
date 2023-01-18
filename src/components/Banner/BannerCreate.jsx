import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createBanner } from "../../redux/action/bannerAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BannerCreate = ({ showChange }) => {
  const [img, setImg] = useState([]);

  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!img) {
      toast.warning("Please input all input Field!");
    } else {
      let formData = new FormData();
      formData.append("img", img[0]);

      dispatch(createBanner(formData));
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
                    <h4 className="card-title">Add New Banner</h4>
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
                              <label htmlFor="img" className="text-dark">
                                Banner Image :
                              </label>
                              <input
                                type="file"
                                className="form-control"
                                name="img"
                                accept="image/*"
                                onChange={(e) => setImg(e.target.files)}
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

export default BannerCreate;
