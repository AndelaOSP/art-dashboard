import constants from '../_constants';
import initialState from './initialState';

const {
  CREATE_SECURITY_USER_REQUEST,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE,
  LOAD_SECURITY_USERS_REQUEST,
  LOAD_SECURITY_USERS_SUCCESS,
  LOAD_SECURITY_USERS_FAILURE,
  SET_USERS_ACTIVE_PAGE,
  RESET_STATUS_MESSAGE
} = constants;

export default (state = initialState.securityUsers, action) => {
  switch (action.type) {
    case CREATE_SECURITY_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_SECURITY_USER_SUCCESS:
      return {
        ...state,
        usersList: {
          [`page_${state.activePage}`]:
            [action.payload, ...state.usersList[`page_${state.activePage}`]]
        },
        usersCount: state.usersCount + 1,
        successMessage: 'Security user added successfully',
        isLoading: false
      };

    case CREATE_SECURITY_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        isLoading: false
      };

    case LOAD_SECURITY_USERS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOAD_SECURITY_USERS_SUCCESS:
      return {
        ...state,
        usersList: {
          ...state.usersList,
          [`page_${state.activePage}`]: action.payload.results
        },
        usersCount: action.payload.count,
        isLoading: false
      };

    case LOAD_SECURITY_USERS_FAILURE:
      return {
        ...state,
        errorMessage: action.payload,
        successMessage: '',
        isLoading: false
      };

    case RESET_STATUS_MESSAGE:
      return {
        ...state,
        successMessage: '',
        errorMessage: ''
      };

    case SET_USERS_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload
      };

    default:
      return state;
  }
};