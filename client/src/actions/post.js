import * as actionTypes from './types';
import { setNotify } from '../utils/alert';
import http from '../utils/http';

// Get All Posts
export const getPosts = () => async dispatch => {
  try {
    const { data: payload } = await http.get('/api/posts');
    dispatch({ type: actionTypes.GET_POSTS, payload });
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.POST_ERROR });
  }
};

// Get single post
export const getPost = id => async dispatch => {
  try {
    const { data: payload } = await http.get(`/api/posts/${id}`);
    dispatch({ type: actionTypes.GET_POST, payload });
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.POST_ERROR });
  }
};

// Add like
export const updateLike = (postId, type) => async dispatch => {
  try {
    const { data: likes } = await http.put(
      `/api/posts/${type}/${postId}`
    );
    dispatch({
      type: actionTypes.UPDATE_LIKES,
      payload: { id: postId, likes }
    });
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.POST_ERROR });
  }
};

// Delete post
export const deletePost = postId => async dispatch => {
  try {
    await http.delete(`/api/posts/${postId}`);

    dispatch({ type: actionTypes.DELETE_POST, payload: postId });

    setNotify('Post deleted', 'success');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.POST_ERROR });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  try {
    const { data: payload } = await http.post('/api/posts', formData);

    dispatch({ type: actionTypes.ADD_POST, payload });

    setNotify('Post Created', 'success');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.POST_ERROR });
  }
};

// Add comment
export const addComment = (postId, formData) => async dispatch => {
  try {
    const { data: payload } = await http.post(
      `/api/posts/comment/${postId}`,
      formData
    );

    dispatch({ type: actionTypes.ADD_COMMENT, payload });

    setNotify('Comment Added', 'success');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.POST_ERROR });
  }
};

// Remove comment
export const deleteComment = (
  postId,
  commentId
) => async dispatch => {
  try {
    await http.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({
      type: actionTypes.REMOVE_COMMENT,
      payload: commentId
    });

    setNotify('Comment Removed', 'success');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.POST_ERROR });
  }
};
