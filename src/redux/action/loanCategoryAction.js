import { toast } from "react-toastify";
import axios from "axios";
import {
  ADD_LOAN_CATEGORY_FAIL,
  ADD_LOAN_CATEGORY_REQUEST,
  ADD_LOAN_CATEGORY_SUCCESS,
  DELETE_LOAN_CATEGORY_FAIL,
  DELETE_LOAN_CATEGORY_REQUEST,
  DELETE_LOAN_CATEGORY_SUCCESS,
  CHANGE_STATUS_LOAN_CATEGORY_FAIL,
  CHANGE_STATUS_LOAN_CATEGORY_REQUEST,
  CHANGE_STATUS_LOAN_CATEGORY_SUCCESS,
  FIND_ALL_LOAN_CATEGORY_FAIL,
  FIND_ALL_LOAN_CATEGORY_REQUEST,
  FIND_ALL_LOAN_CATEGORY_SUCCESS,
  FIND_ONE_LOAN_CATEGORY_FAIL,
  FIND_ONE_LOAN_CATEGORY_REQUEST,
  FIND_ONE_LOAN_CATEGORY_SUCCESS,
  UPDATE_LOAN_CATEGORY_FAIL,
  UPDATE_LOAN_CATEGORY_REQUEST,
  UPDATE_LOAN_CATEGORY_SUCCESS,
} from "../constant/loanCategoryConstant";

// Find All Loan Categories
const loadAllLoanCategories = (data) => {
  return function (dispatch) {
    dispatch({
      type: FIND_ALL_LOAN_CATEGORY_REQUEST,
      payload: true,
    });

    const token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt"))
      : "";

    let OPTION = {
      url: `http://localhost:3010/loan-category/loan-category`,
      method: "POST",
      data: data,
      headers: {
        "content-type": "application/json",
        token: token,
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(loadAllLoanCategoriesPre(res.data));
      })
      .catch((error) => {
        dispatch({
          type: FIND_ALL_LOAN_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const loadAllLoanCategoriesPre = (data) => {
  console.log("data", data);
  return {
    type: FIND_ALL_LOAN_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// Find Single Loan Category
const loadSingleLoanCategory = (id) => {
  return function (dispatch) {
    dispatch({
      type: FIND_ONE_LOAN_CATEGORY_REQUEST,
      payload: true,
    });
    const token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt"))
      : "";
    let OPTION = {
      url: `http://localhost:3010/loan-category/loan-category/${id}`,
      method: "GET",
      headers: {
        "content-type": "application/json",
        token: token,
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(loadSingleLoanCategoryPre(res.data));
      })
      .catch((error) => {
        dispatch({
          type: FIND_ONE_LOAN_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const loadSingleLoanCategoryPre = (data) => {
  return {
    type: FIND_ONE_LOAN_CATEGORY_SUCCESS,
    singledata: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// add New Loan Category
const createLoanCategory = (data) => {
  return function (dispatch) {
    dispatch({
      type: ADD_LOAN_CATEGORY_REQUEST,
      payload: true,
    });

    let OPTION = {
      url: `http://localhost:3010/loan-category/create/`,
      method: "POST",
      data: data,
      headers: {
        Accept: "multipart/form-data",
        "content-type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(createLoanCategoryPre(res.data));
        dispatch(loadAllLoanCategories());
      })
      .catch((error) => {
        dispatch({
          type: ADD_LOAN_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const createLoanCategoryPre = (data) => {
  toast.success("Loan Category Created Successfully!");
  return {
    type: ADD_LOAN_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// update Loan CATEGORY
const updateLoanCategory = (data) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_LOAN_CATEGORY_REQUEST,
      payload: true,
    });

    let OPTION = {
      url: `http://localhost:3010/loan-category/edit/`,
      method: "PUT",
      data: data,
      headers: {
        Accept: "multipart/form-data",
        "content-type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(updateLoanCategoryPre(res.data));
        dispatch(loadAllLoanCategories());
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_LOAN_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const updateLoanCategoryPre = (data) => {
  toast.success("Loan Category Updated Successfully!");
  return {
    type: UPDATE_LOAN_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// Loan Category Status Change Delete
const deleteLoanCategory = (data) => {
  return function (dispatch) {
    dispatch({
      type: DELETE_LOAN_CATEGORY_REQUEST,
      payload: "",
    });

    let OPTION = {
      url: `http://localhost:3010/loan-category/delete/`,
      method: "PUT",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(deleteLoanCategoryPre(res.data));
        dispatch(loadAllLoanCategories());
      })
      .catch((error) => {
        dispatch({
          type: DELETE_LOAN_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const deleteLoanCategoryPre = (data) => {
  toast.error("Loan Category Deleted Successfully!");
  return {
    type: DELETE_LOAN_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// Loan Category Status Change
const changeStatusLoanCategory = (data) => {
  return function (dispatch) {
    dispatch({
      type: CHANGE_STATUS_LOAN_CATEGORY_REQUEST,
      payload: "",
    });

    let OPTION = {
      url: `http://localhost:3010/loan-category/change-activate-status/`,
      method: "PUT",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(changeStatusLoanCategoryPre(res.data));
        dispatch(loadAllLoanCategories());
      })
      .catch((error) => {
        dispatch({
          type: CHANGE_STATUS_LOAN_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const changeStatusLoanCategoryPre = (data) => {
  toast.error("Loan Category Deleted Successfully!");
  return {
    type: CHANGE_STATUS_LOAN_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

export {
  loadAllLoanCategories,
  loadSingleLoanCategory,
  createLoanCategory,
  updateLoanCategory,
  deleteLoanCategory,
  changeStatusLoanCategory,
};
