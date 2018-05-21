import constants from '../_constants';

const { LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE } = constants;

const initialState = {
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: action.payload
      }
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        isAuthenticated: action.payload,
      }
    default:
      return state;
  }
}
