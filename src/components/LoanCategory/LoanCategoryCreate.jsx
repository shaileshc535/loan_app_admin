import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createLoanCategory } from "../../redux/action/loanCategoryAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoanCategoryCreate = ({ showChange }) => {
  const [name, setName] = useState("");
  const [type, setType] = useState([]);

  let dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      toast.warning("Please input all input Field!");
    } else {
      dispatch(createLoanCategory({ name: name, slug: name, type: type }));
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
                            <div className="col-6 px-4">
                              <label htmlFor="name" className="text-dark mb-2">
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

                            <div className="col-6 px-4">
                              <label htmlFor="name" className="text-dark mb-2">
                                Category Type :
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Category Type"
                                name="type"
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="form-group row mt-4 px-4">
                            <Button
                              type="submit"
                              className="update mt-4 btn btn-success btn-block form-control"
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

export default LoanCategoryCreate;
