import constants from '../_constants';

const { LOGIN_USER_SUCCESS } = constants;

const initialState = {
  isAuthenticated: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true
      }
    default:
      return state;
  }
}
