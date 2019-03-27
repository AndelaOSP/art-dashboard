import axios from 'axios';
import { isEmpty } from 'lodash';
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
  RESET_STATUS_MESSAGE,
  UPDATE_ACTIVE_STATUS_REQUEST,
  UPDATE_ACTIVE_STATUS_SUCCESS,
  UPDATE_ACTIVE_STATUS_FAILURE
} = constants;

export const loadSecurityUsers = (pageNumber, limit, filters = {}) => (dispatch) => {
  const url = !isEmpty(filters)
    ? `/security-users/?page=${pageNumber}&page_size=${limit}&is_active=${filters.Active[0]}`
    : `/security-users/?page=${pageNumber}&page_size=${limit}&is_active=${'true'}`;

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

  return axios
    .post('/security-users/', securityUser)
    .then((response) => {
      dispatch(addSecurityUserSuccess(response.data));
    })
    .catch((error) => {
      dispatch(addSecurityUserFailure(error));
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

export const updateActiveStatus = (id, securityUser) => (dispatch) => {
  dispatch(updateActiveStatusRequest());

  return axios
    .put(`/security-users/${id}`, securityUser)
    .then((response) => {
      dispatch(updateActiveStatusSuccess(response.data));
    })
    .catch((error) => {
      dispatch(updateActiveStatusFailure(error));
    });
};

export const updateActiveStatusRequest = () => ({ type: UPDATE_ACTIVE_STATUS_REQUEST });

export const updateActiveStatusSuccess = usersList => ({
  type: UPDATE_ACTIVE_STATUS_SUCCESS,
  payload: usersList
});

export const updateActiveStatusFailure = error => ({
  type: UPDATE_ACTIVE_STATUS_FAILURE,
  payload: error.message
});
