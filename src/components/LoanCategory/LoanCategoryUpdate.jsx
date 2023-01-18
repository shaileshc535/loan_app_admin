import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateLoanCategory } from "../../redux/action/loanCategoryAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../pages/Shared/Loader";
import Message from "../../pages/Shared/Message";

const LoanCategoryUpdate = ({ id, showChange }) => {
  const [state, setState] = useState({
    name: "",
    type: "",
  });

  const { name, type } = state;

  let dispatch = useDispatch();

  let loanCategory = useSelector((state) => state.LoanCategory);

  let { error, loading, singledata } = loanCategory;

  console.log("loanCategory", loanCategory);

  let category = singledata;

  console.log("category", category);

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
      dispatch(
        updateLoanCategory({
          categoryId: id,
          name: name,
          slug: name,
          type: type,
        })
      );
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
                      <h4 className="card-title">Update Category Details</h4>
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
                                <label
                                  htmlFor="name"
                                  className="text-dark mb-2"
                                >
                                  Category Name :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Loan Category Name"
                                  name="name"
                                  value={name}
                                  onChange={handleInputChange}
                                />
                              </div>
                              <div className="col-6 px-4">
                                <label
                                  htmlFor="icon"
                                  className="text-dark mb-2"
                                >
                                  Icon :
                                </label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Loan Category Type"
                                  name="type"
                                  value={type}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="form-group row mt-4 mx-1">
                              <Button
                                type="submit"
                                className="update btn btn-sm btn-success btn-block form-control"
                              >
                                Update
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
};

export default LoanCategoryUpdate;
