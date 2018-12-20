import axios from 'axios';
import { fetchData } from '../_utils/helpers';
import constants from '../_constants';

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

export const loadSecurityUsers = (pageNumber, limit) => (dispatch) => {
  const url = `/security-users/?page=${pageNumber}&page_size=${limit}`;

  dispatch(loadSecurityUsersRequest());

  return fetchData(url)
    .then((response) => {
      dispatch(loadSecurityUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loadSecurityUsersFailure(error.message));
    });
};

export const loadSecurityUsersRequest = () => ({
  type: LOAD_SECURITY_USERS_REQUEST
});

export const loadSecurityUsersSuccess = securityUsers => ({
  type: LOAD_SECURITY_USERS_SUCCESS,
  payload: securityUsers
});

export const loadSecurityUsersFailure = error => ({
  type: LOAD_SECURITY_USERS_FAILURE,
  payload: error
});

export const addSecurityUser = securityUser => (dispatch) => {
  dispatch(addSecurityUserRequest());

  return axios.post('/security-users/', securityUser)
    .then((response) => {
      dispatch(addSecurityUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(addSecurityUserFailure(error.message));
    });
};

export const addSecurityUserRequest = () => ({
  type: CREATE_SECURITY_USER_REQUEST
});

export const addSecurityUserSuccess = securityUser => ({
  type: CREATE_SECURITY_USER_SUCCESS,
  payload: securityUser
});

export const addSecurityUserFailure = error => ({
  type: CREATE_SECURITY_USER_FAILURE,
  payload: error
});

export const setActivePage = page => ({
  type: SET_USERS_ACTIVE_PAGE,
  payload: page
});

export const resetMessage = () => ({ type: RESET_STATUS_MESSAGE });
