import {
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_REQUEST,
  SET_CURRENT_USER,
  SIGNIN_USER_ERROR,
  SIGNOUT_USER,
} from "../constant/authContant";

const intialState = {
  isSigninIn: false,
  loading: false,
  email: "",
  password: "",
  action: "Signin",
  userResult: {},
  response: [],
  singledata: [],
  msg: "",
};

const AuthReducer = (state = intialState, action) => {
  switch (action.type) {
    case SIGNIN_USER_REQUEST:
      return {
        ...state,
        loading: action.payload,
      };
    case SIGNIN_USER_SUCCESS:
      return {
        ...state,
        isSigninIn: action.isSigninIn,
        loading: action.payload,
        msg: action.msg,
      };
    case SIGNIN_USER_ERROR:
      return {
        ...state,
        isSigninIn: false,
        msg: action.msg,
        loading: action.payload,
      };

    case SET_CURRENT_USER:
      return {
        ...state,
        userResult: action.payload,
        isSigninIn: true,
      };
    case SIGNOUT_USER:
      return {
        ...state,
        isSigninIn: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
