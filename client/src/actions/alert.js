import uuid from 'uuid';
import * as actionTypes from './types';

export const setAlert = (
  msg,
  alertType,
  timer = 5000
) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: actionTypes.SET_ALERT,
    payload: {
      id,
      msg,
      alertType
    }
  });

  setTimeout(
    () => dispatch({ type: actionTypes.REMOVE_ALERT, payload: id }),
    timer
  );
};
