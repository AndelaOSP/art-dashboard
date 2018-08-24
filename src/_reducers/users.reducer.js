import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_DROPDOWN_USERS_SUCCESS,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE
} = constants;

export default (state = initialState.usersList, action) => {
  switch (action.type) {
    case LOADING_USERS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload.results,
        usersCount: action.payload.count,
        hasError: false
      };
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        users: [],
        usersCount: 0,
        errorMessage: action.payload,
        hasError: true
      };
    case LOAD_DROPDOWN_USERS_SUCCESS:
      return {
        ...state,
        usersDropdown: action.payload
      };
    case CREATE_SECURITY_USER_SUCCESS:
      return {
        ...state,
        securityUser: action.payload
      };
    case CREATE_SECURITY_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };
    default:
      return state;
  }
};
