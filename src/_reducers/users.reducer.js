import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_DROPDOWN_USERS_SUCCESS,
  LOAD_DROPDOWN_USERS_FAILURE,
  LOADING_DROPDOWN_USERS
} = constants;

export default (state = initialState.usersList, action) => {
  switch (action.type) {
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload.results],
        usersCount: action.payload.count,
        hasError: false,
        isLoading: false
      };
    case LOAD_USERS_FAILURE:
      return {
        ...state,
        users: [],
        usersCount: 0,
        errorMessage: action.payload,
        hasError: true,
        isLoading: false
      };
    case LOADING_USERS:
      return {
        ...state,
        isLoading: true
      };
    case LOAD_DROPDOWN_USERS_SUCCESS:
      return {
        ...state,
        users: [...action.payload],
        isLoading: false
      };
    case LOAD_DROPDOWN_USERS_FAILURE:
      return {
        ...state,
        users: [],
        errorMessage: action.payload,
        hasError: true,
        isLoading: false
      };
    case LOADING_DROPDOWN_USERS:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};

