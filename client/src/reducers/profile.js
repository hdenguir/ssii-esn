import * as actionTypes from "../actions/types";

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_PROFILES:
    case actionTypes.PROFILE_SUCCESS:
      return {
        ...state,
        profiles: payload,
        loading: false
      };
    case actionTypes.GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false
      };
    case actionTypes.GET_PROFILE:
    case actionTypes.UPDATE_PROFILE:
      return { ...state, profile: payload, loading: false };
    case actionTypes.PROFILE_FAIL:
      return { ...state, error: payload, loading: false };
    case actionTypes.CLEAR_PROFILE:
      return { ...state, profile: null, repos: [], loading: false };
    default:
      return state;
  }
}
