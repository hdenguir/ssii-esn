import * as actionTypes from "../actions/types";
import axios from "axios";
import { setAlert } from "./alert";

import setAuthToken from "../utils/setAuthToken";

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.getItem("token")) {
    setAuthToken(localStorage.getItem("token"));
  }

  try {
    const res = await axios.get("/api/auth");
    dispatch({
      type: actionTypes.USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: actionTypes.AUTH_FAIL
    });
  }
};

// Register User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: actionTypes.REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    dispatch(setAlert("User Registered successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.REGISTER_FAIL
    });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: actionTypes.LOGIN_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());

    dispatch(setAlert("User Logged in successfully", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.LOGIN_FAIL
    });
  }
};

// Logg out / Clear profile
export const logout = () => dispatch => {
  dispatch({ type: actionTypes.CLEAR_PROFILE });
  dispatch({ type: actionTypes.LOGOUT });
};
