import axios from "axios";
import * as actionTypes from "../actions/types";
import { setAlert } from "./alert";

// Get All Posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get("/api/posts");
    dispatch({
      type: actionTypes.GET_POSTS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get single post
export const getPost = id => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);
    dispatch({
      type: actionTypes.GET_POST,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add like
export const updateLike = (postId, type) => async dispatch => {
  try {
    const res = await axios.put(
      `/api/posts/${type}/${postId}`
    );
    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { id: postId, likes: res.data }
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete post
export const deletePost = postId => async dispatch => {
  try {
    await axios.delete(`/api/posts/${postId}`);
    dispatch({
      type: actionTypes.DELETE_POST,
      payload: postId
    });
    dispatch(setAlert("Post deleted", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  try {
    const res = await axios.post(
      `/api/posts`,
      formData,
      config
    );
    dispatch({
      type: actionTypes.ADD_POST,
      payload: res.data
    });
    dispatch(setAlert("Post Created", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  const config = {
    headers: { "Content-Type": "application/json" }
  };

  try {
    const res = await axios.post(
      `/api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: actionTypes.ADD_COMMENT,
      payload: res.data
    });
    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try {
    await axios.delete(
      `/api/posts/comment/${postId}/${commentId}`
    );
    dispatch({
      type: actionTypes.REMOVE_COMMENT,
      payload: commentId
    });
    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors)
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));

    dispatch({
      type: actionTypes.POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
