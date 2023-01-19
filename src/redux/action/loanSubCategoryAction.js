import { toast } from "react-toastify";
import axios from "axios";
import {
  ADD_LOAN_SUB_CATEGORY_FAIL,
  ADD_LOAN_SUB_CATEGORY_REQUEST,
  ADD_LOAN_SUB_CATEGORY_SUCCESS,
  DELETE_LOAN_SUB_CATEGORY_FAIL,
  DELETE_LOAN_SUB_CATEGORY_REQUEST,
  DELETE_LOAN_SUB_CATEGORY_SUCCESS,
  CHANGE_STATUS_LOAN_SUB_CATEGORY_FAIL,
  CHANGE_STATUS_LOAN_SUB_CATEGORY_REQUEST,
  CHANGE_STATUS_LOAN_SUB_CATEGORY_SUCCESS,
  FIND_ALL_LOAN_SUB_CATEGORY_FAIL,
  FIND_ALL_LOAN_SUB_CATEGORY_REQUEST,
  FIND_ALL_LOAN_SUB_CATEGORY_SUCCESS,
  FIND_ONE_LOAN_SUB_CATEGORY_FAIL,
  FIND_ONE_LOAN_SUB_CATEGORY_REQUEST,
  FIND_ONE_LOAN_SUB_CATEGORY_SUCCESS,
  UPDATE_LOAN_SUB_CATEGORY_FAIL,
  UPDATE_LOAN_SUB_CATEGORY_REQUEST,
  UPDATE_LOAN_SUB_CATEGORY_SUCCESS,
} from "../constant/loanSubCategoryConstant";

// Find All Loan Sub Categories
const loadAllLoanSubCategories = (data) => {
  return function (dispatch) {
    dispatch({
      type: FIND_ALL_LOAN_SUB_CATEGORY_REQUEST,
      payload: true,
    });

    const token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt"))
      : "";

    let OPTION = {
      url: `${process.env.REACT_APP_API_URL}/loan-subcategory/admin/loan-subcategory`,
      method: "POST",
      data: data,
      headers: {
        "content-type": "application/json",
        token: token,
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(loadAllLoanSubCategoriesPre(res.data));
      })
      .catch((error) => {
        dispatch({
          type: FIND_ALL_LOAN_SUB_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const loadAllLoanSubCategoriesPre = (data) => {
  console.log("data", data);
  return {
    type: FIND_ALL_LOAN_SUB_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// Find Single Loan Sub Category
const loadSingleLoanSubCategory = (id) => {
  return function (dispatch) {
    dispatch({
      type: FIND_ONE_LOAN_SUB_CATEGORY_REQUEST,
      payload: true,
    });
    const token = JSON.parse(localStorage.getItem("jwt"))
      ? JSON.parse(localStorage.getItem("jwt"))
      : "";
    let OPTION = {
      url: `${process.env.REACT_APP_API_URL}/loan-category/loan-category/${id}`,
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
          type: FIND_ONE_LOAN_SUB_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const loadSingleLoanCategoryPre = (data) => {
  return {
    type: FIND_ONE_LOAN_SUB_CATEGORY_SUCCESS,
    singledata: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// add New Loan Sub Category
const createLoanCategory = (data) => {
  return function (dispatch) {
    dispatch({
      type: ADD_LOAN_SUB_CATEGORY_REQUEST,
      payload: true,
    });

    let OPTION = {
      url: `${process.env.REACT_APP_API_URL}/loan-category/create/`,
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
        dispatch(loadAllLoanSubCategories());
      })
      .catch((error) => {
        dispatch({
          type: ADD_LOAN_SUB_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const createLoanCategoryPre = (data) => {
  toast.success("Loan Sub Category Created Successfully!");
  return {
    type: ADD_LOAN_SUB_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// update Loan Sub CatEGORY
const updateLoanCategory = (data) => {
  return function (dispatch) {
    dispatch({
      type: UPDATE_LOAN_SUB_CATEGORY_REQUEST,
      payload: true,
    });

    let OPTION = {
      url: `${process.env.REACT_APP_API_URL}/loan-category/edit/`,
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
        dispatch(loadAllLoanSubCategories());
      })
      .catch((error) => {
        dispatch({
          type: UPDATE_LOAN_SUB_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const updateLoanCategoryPre = (data) => {
  toast.success("Loan Sub Category Updated Successfully!");
  return {
    type: UPDATE_LOAN_SUB_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// Loan Sub Category Status Change Delete
const deleteLoanCategory = (data) => {
  return function (dispatch) {
    dispatch({
      type: DELETE_LOAN_SUB_CATEGORY_REQUEST,
      payload: "",
    });

    let OPTION = {
      url: `${process.env.REACT_APP_API_URL}/loan-category/delete/`,
      method: "PUT",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(deleteLoanCategoryPre(res.data));
        dispatch(loadAllLoanSubCategories());
      })
      .catch((error) => {
        dispatch({
          type: DELETE_LOAN_SUB_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const deleteLoanCategoryPre = (data) => {
  toast.error("Loan Sub Category Deleted Successfully!");
  return {
    type: DELETE_LOAN_SUB_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

// Loan Sub Category Status Change
const changeStatusLoanCategory = (data) => {
  return function (dispatch) {
    dispatch({
      type: CHANGE_STATUS_LOAN_SUB_CATEGORY_REQUEST,
      payload: "",
    });

    let OPTION = {
      url: `${process.env.REACT_APP_API_URL}/loan-category/change-activate-status/`,
      method: "PUT",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTION)
      .then((res) => {
        dispatch(changeStatusLoanCategoryPre(res.data));
        dispatch(loadAllLoanSubCategories());
      })
      .catch((error) => {
        dispatch({
          type: CHANGE_STATUS_LOAN_SUB_CATEGORY_FAIL,
          payload: false,
          error: error,
          msg: "Failed to load the information",
        });
      });
  };
};
export const changeStatusLoanCategoryPre = (data) => {
  toast.error("Loan Sub Category Deleted Successfully!");
  return {
    type: CHANGE_STATUS_LOAN_SUB_CATEGORY_SUCCESS,
    result: data,
    payload: false,
    msg: "SUCCESS",
  };
};

export {
  loadAllLoanSubCategories,
  loadSingleLoanSubCategory,
  createLoanCategory,
  updateLoanCategory,
  deleteLoanCategory,
  changeStatusLoanCategory,
};
