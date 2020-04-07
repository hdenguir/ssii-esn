import * as actionTypes from './types';
import { setNotify } from '../utils/alert';
import http from '../utils/http';

// Get Current user Profile
export const getCurrentProfile = () => async dispatch => {
  try {
    const { data: payload } = await http.get('/api/profile/me');
    dispatch({ type: actionTypes.GET_PROFILE, payload });
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.PROFILE_FAIL });
  }
};

// Get All Profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type: actionTypes.CLEAR_PROFILE });
  try {
    const {
      data: { results, profiles }
    } = await http.get('/api/profile');

    dispatch({
      type: actionTypes.GET_PROFILES,
      payload: { results, profiles }
    });
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.PROFILE_FAIL });
  }
};

// Get Profile By User ID
export const getProfileById = userID => async dispatch => {
  try {
    const { data: payload } = await http.get(
      `/api/profile/user/${userID}`
    );
    dispatch({ type: actionTypes.GET_PROFILE, payload });
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.PROFILE_FAIL });
  }
};

// Get Github Repos
export const getGithubRepos = username => async dispatch => {
  try {
    const { data: payload } = await http.get(
      `/api/profile/github/${username}`
    );
    dispatch({ type: actionTypes.GET_REPOS, payload });
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.PROFILE_FAIL });
  }
};

export const updateProfilePhoto = (
  formData,
  history
) => async dispatch => {
  dispatch({ type: actionTypes.LOADING });
  try {
    http.defaults.headers['Content-type'] = 'multipart/form-data';
    const { data: payload } = await http.post(
      '/api/profile/photo/edit',
      formData
    );

    dispatch({ type: actionTypes.PROFILE_SUCCESS, payload });

    setNotify('Profile Photo Updated', 'success');

    history.push('/dashboard');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.PROFILE_FAIL });
  }
};

// Create or update profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  dispatch({ type: actionTypes.LOADING });
  try {
    const { data: payload } = await http.post(
      '/api/profile',
      formData
    );
    dispatch({ type: actionTypes.PROFILE_SUCCESS, payload });

    setNotify(
      edit ? 'Profile Updated' : 'Profile Created',
      'success'
    );

    if (!edit) history.push('/dashboard');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.PROFILE_FAIL });
  }
};

// Add Experience / Add Education
export const updateProfile = (
  formData,
  history,
  type
) => async dispatch => {
  try {
    const { data: payload } = await http.put(
      `/api/profile/${type.toLowerCase()}`,
      formData
    );

    dispatch({ type: actionTypes.UPDATE_PROFILE, payload });

    setNotify(`${type} Added`, 'success');

    history.push('/dashboard');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.PROFILE_FAIL });
  }
};

// Delete Experience / Delete Education
export const deleteProfileItem = (id, type) => async dispatch => {
  try {
    const { data: payload } = await http.delete(
      `/api/profile/${type.toLowerCase()}/${id}`
    );

    dispatch({ type: actionTypes.UPDATE_PROFILE, payload });

    setNotify(`${type} Deleted`, 'success');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.PROFILE_FAIL });
  }
};

// Delete Account & Profile
export const deleteAcount = () => async dispatch => {
  if (window.confirm('Are you sure? Thi cant Not be undone!')) {
    try {
      await http.delete('/api/profile');

      dispatch({ type: actionTypes.CLEAR_PROFILE });

      dispatch({ type: actionTypes.DELETE_ACCOUNT });

      setNotify(
        'Your account has been permanantly Deleted',
        'success'
      );
    } catch (err) {
      setNotify(err);

      dispatch({ type: actionTypes.PROFILE_FAIL });
    }
  }
};
