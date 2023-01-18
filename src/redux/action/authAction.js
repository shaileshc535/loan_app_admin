import setAuthorizationToken from "../../utils/setAutorization";
import jwt from "jsonwebtoken";
import { toast } from "react-toastify";
import {
  SIGNIN_USER_SUCCESS,
  SIGNIN_USER_REQUEST,
  SIGNIN_USER_ERROR,
  SET_CURRENT_USER,
  SIGNOUT_USER,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
} from "../constant/authContant";
const axios = require("axios");

// USER AUTH ACTION
export const signinUser = (data) => {
  return function (dispatch) {
    dispatch({
      type: SIGNIN_USER_REQUEST,
      payload: true,
    });

    let OPTIONS = {
      url: `http://localhost:3010/user/login`,
      method: "POST",
      data: data,
      headers: {
        "content-type": "application/json",
      },
    };

    axios(OPTIONS)
      .then((res) => {
        if (res.data.success === true) {
          const token = res.data.data.token;

          localStorage.setItem("token", token);

          setAuthorizationToken(token);

          dispatch(setCurrentUser(jwt.decode(token)));

          dispatch({
            type: SIGNIN_USER_SUCCESS,
            payload: false,
            isSigninIn: true,
            msg: res.data.msg,
          });
          toast.success("Admin Logged In!");
        } else {
          dispatch({
            type: SIGNIN_USER_ERROR,
            payload: false,
            isSigninIn: false,
            msg: res.data.msg,
          });
          toast.danger("Admin Login Fail!");
        }
      })
      .catch((error) => {
        dispatch({
          type: SIGNIN_USER_ERROR,
          loading: false,
          payload: false,
          message: error.message,
        });
      });
  };
};

export const signOut = () => {
  return function (dispatch) {
    dispatch({
      type: SIGNIN_USER_REQUEST,
      payload: true,
    });
    localStorage.removeItem("token");
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch({
      type: SIGNOUT_USER,
      payload: false,
    });
    toast.success("Admin Logout!");

    dispatch({
      type: SIGNIN_USER_ERROR,
      loading: false,
      payload: "",
    });
    window.location.href = "/";
  };
};
// SET CURRENT USER ACTION
export const setCurrentUser = (result) => {
  return {
    type: SET_CURRENT_USER,
    payload: result,
  };
};

// Register User
export const register = (name, email, password, mobile) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `http://localhost:3010/user/register`,
      { name, email, password, mobile },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: SIGNIN_USER_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
