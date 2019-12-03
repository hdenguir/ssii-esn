import axios from "axios";
import * as actionTypes from "../actions/types";
import { setAlert } from "./alert";

// Get Current user Profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get All Profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: actionTypes.CLEAR_PROFILE });
  try {
    const res = await axios.get("/api/profile");
    dispatch({
      type: actionTypes.GET_PROFILES,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Profile By User ID
export const getProfileById = userID => async dispatch => {
  try {
    const res = await axios.get("/api/profile/user/" + userID);
    dispatch({
      type: actionTypes.GET_PROFILE,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get Github Repos
export const getGithubRepos = username => async dispatch => {
  try {
    const res = await axios.get("/api/profile/github/" + username);
    dispatch({
      type: actionTypes.GET_REPOS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: actionTypes.PROFILE_SUCCESS,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    if (!edit) history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Experience / Add Education
export const updateProfile = (formData, history, type) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.put(
      "/api/profile/" + type.toLowerCase(),
      formData,
      config
    );

    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(`${type} Added`, "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Experience / Delete Education
export const deleteProfileItem = (id, type) => async dispatch => {
  try {
    const res = await axios.delete(`/api/profile/${type.toLowerCase()}/${id}`);

    dispatch({
      type: actionTypes.UPDATE_PROFILE,
      payload: res.data
    });

    dispatch(setAlert(`${type} Deleted`, "success"));

    //history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.PROFILE_FAIL,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete Account & Profile
export const deleteAcount = () => async dispatch => {
  if (window.confirm("Are you sure? Thi cant Not be undone!")) {
    try {
      await axios.delete(`/api/profile`);

      dispatch({ type: actionTypes.CLEAR_PROFILE });

      dispatch({ type: actionTypes.DELETE_ACCOUNT });

      dispatch(
        setAlert(`Your account has been permanantly Deleted`, "success")
      );

      //history.push("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors)
        errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

      dispatch({
        type: actionTypes.PROFILE_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  }
};
