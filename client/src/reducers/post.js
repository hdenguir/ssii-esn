import * as actionTypes from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: false,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
        error: {}
      };
    case actionTypes.POST_ERROR:
      return {
        ...state,
        loading: false
        //error: payload,
      };
    case actionTypes.UPDATE_LIKES:
      return {
        ...state,
        loading: false,
        posts: state.posts.map(post =>
          post._id === payload.id
            ? { ...post, likes: payload.likes }
            : post
        )
      };
    case actionTypes.DELETE_POST:
      return {
        ...state,
        loading: false,
        posts: state.posts.filter(post => post._id !== payload)
      };
    case actionTypes.GET_POST:
      return {
        ...state,
        loading: false,
        post: payload
      };
    case actionTypes.ADD_POST:
      return {
        ...state,
        loading: false,
        posts: [payload, ...state.posts]
      };
    case actionTypes.ADD_COMMENT:
      return {
        ...state,
        loading: false,
        post: { ...state.post, comments: payload }
      };
    case actionTypes.REMOVE_COMMENT:
      return {
        ...state,
        loading: false,
        post: {
          ...state.post,
          comments: state.post.comments.filter(
            comment => comment._id !== payload
          )
        }
      };
    default:
      return state;
  }
}
