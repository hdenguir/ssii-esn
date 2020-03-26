import * as actionTypes from './types';
import { setNotify } from '../utils/alert';
import http from '../utils/http';

// Load User
export const loadUser = () => async dispatch => {
  dispatch({ type: actionTypes.LOADING });
  try {
    const { data: payload } = await http.get('/api/auth');

    dispatch({ type: actionTypes.USER_LOADED, payload });
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.AUTH_FAIL });
  }
};

// Register User
export const register = ({
  name,
  email,
  password
}) => async dispatch => {
  dispatch({ type: actionTypes.LOADING });

  const body = JSON.stringify({ name, email, password });

  try {
    const { data: payload } = await http.post('/api/users', body);

    dispatch({ type: actionTypes.REGISTER_SUCCESS, payload });

    dispatch(loadUser());

    setNotify('User Registered successfully', 'success');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.REGISTER_FAIL });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  dispatch({ type: actionTypes.LOADING });

  const body = JSON.stringify({ email, password });
  try {
    const { data: payload } = await http.post('/api/auth', body);

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload });

    dispatch(loadUser());

    setNotify('User Logged in successfully', 'success');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.LOGIN_FAIL });
  }
};

// Logg out / Clear profile
export const logout = () => dispatch => {
  dispatch({ type: actionTypes.CLEAR_PROFILE });
  dispatch({ type: actionTypes.LOGOUT });
};

export const loginSocial = user => async dispatch => {
  dispatch({ type: actionTypes.LOADING });

  try {
    const { data: payload } = await http.post(
      '/api/auth/social-login/',
      JSON.stringify(user)
    );

    dispatch({ type: actionTypes.LOGIN_SUCCESS, payload });

    dispatch(loadUser());

    setNotify('User Logged in successfully', 'success');
  } catch (err) {
    setNotify(err);

    dispatch({ type: actionTypes.AUTH_FAIL });
  }
};
