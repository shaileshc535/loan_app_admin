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

const initialState = {
  loading: false,
  action: "Loan-Category",
  result: [],
  response: {},
  singledata: [],
  msg: "",
  error: "",
};

const LoanCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_ALL_LOAN_CATEGORY_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case FIND_ALL_LOAN_CATEGORY_SUCCESS:
      return {
        ...state,
        result: action.result.data,
        loading: action.payload,
        msg: action.msg,
      };
    case FIND_ALL_LOAN_CATEGORY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case DELETE_LOAN_CATEGORY_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case DELETE_LOAN_CATEGORY_SUCCESS:
      return {
        ...state,
        result: state.result.filter(
          (item) => item._id !== action.result.data._id
        ),
        response: action.result.msg,
        loading: action.payload,
        msg: action.msg,
      };
    case DELETE_LOAN_CATEGORY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case CHANGE_STATUS_LOAN_CATEGORY_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case CHANGE_STATUS_LOAN_CATEGORY_SUCCESS:
      return {
        ...state,
        result: state.result.map((item) =>
          item._id === action.result.data._id ? action.result.data : item
        ),
        response: action.result.msg,
        singledata: [],
        loading: action.payload,
        msg: action.msg,
      };
    case CHANGE_STATUS_LOAN_CATEGORY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case ADD_LOAN_CATEGORY_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_LOAN_CATEGORY_SUCCESS:
      return {
        ...state,
        result: state.result.concat(action.result.data),
        response: action.result.msg,
        loading: action.payload,
        msg: action.msg,
      };
    case ADD_LOAN_CATEGORY_FAIL:
      return {
        ...state,
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case UPDATE_LOAN_CATEGORY_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case UPDATE_LOAN_CATEGORY_SUCCESS:
      return {
        ...state,
        result: state.result.map((item) =>
          item._id === action.result.data._id ? action.result.data : item
        ),
        response: action.result.msg,
        singledata: [],
        loading: action.payload,
        msg: action.msg,
      };
    case UPDATE_LOAN_CATEGORY_FAIL:
      return {
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    case FIND_ONE_LOAN_CATEGORY_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case FIND_ONE_LOAN_CATEGORY_SUCCESS:
      return {
        ...state,
        singledata: action.singledata.data,
        loading: action.payload,
        msg: action.msg,
      };
    case FIND_ONE_LOAN_CATEGORY_FAIL:
      return {
        error: action.error,
        loading: action.payload,
        msg: action.msg,
      };

    default:
      return state;
  }
};

export default LoanCategoryReducer;
