import constants from '../_constants';
import initialState from './initialState';
import findSecurityUserIndex from '../_utils/updatePaginatedObject';

const {
  CREATE_SECURITY_USER_REQUEST,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE,
  LOAD_SECURITY_USERS_REQUEST,
  LOAD_SECURITY_USERS_SUCCESS,
  LOAD_SECURITY_USERS_FAILURE,
  SET_USERS_ACTIVE_PAGE,
  RESET_STATUS_MESSAGE,
  UPDATE_ACTIVE_STATUS_REQUEST,
  UPDATE_ACTIVE_STATUS_SUCCESS,
  UPDATE_ACTIVE_STATUS_FAILURE
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

const updateSecurityUser = (securityUser, usersList) => {
  const securityUserIndex = findSecurityUserIndex(securityUser, usersList);

  if (!securityUserIndex) {
    return usersList;
  }

  const { page, index } = securityUserIndex;
  const pageData = usersList[page];

  pageData[index] = securityUser;

  return {
    ...usersList,
    [page]: pageData
  };
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

    case UPDATE_ACTIVE_STATUS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case UPDATE_ACTIVE_STATUS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        usersList: updateSecurityUser(action.payload, state.usersList),
        successMessage: 'Active status updated successfully.',
        errorMessage: ''
      };

    case UPDATE_ACTIVE_STATUS_FAILURE:
      return {
        ...state,
        isLoading: false,
        successMessage: '',
        errorMessage: 'Active status update unsuccessful. Please try again.'
      };

    default:
      return state;
  }
};
