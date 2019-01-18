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

// Currently the API returns three error messages. All are within objects with asset_code,
//  serial_number and non_field_errors as the keys. The use of .replace() is due to the fact
// that the response is not as well structured. e.g. {"asset_code": {"['error message']"}}
// TODO: The error messages should be updated once the API returns the error messages
// in a better format
const getErrorMessage = (error) => {
  if (error.hasOwnProperty('email')) {
    return error.email[0].replace(/[[\]']/g, '');
  }

  if (error.hasOwnProperty('badge_number')) {
    return error.badge_number[0].replace(/[[\]']/g, '');
  }

  if (error.hasOwnProperty('non_field_errors')) {
    return error.non_field_errors[0]; // eslint-disable-line
  }

  return '';
};

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
        successMessage:
          'Security user added successfully. You can create another user or close this modal to view all users',
        isLoading: false
      };

    case CREATE_SECURITY_USER_FAILURE:
      return {
        ...state,
        errorMessage: getErrorMessage(action.payload.response.data),
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
