import axios from 'axios';
import { isEmpty } from 'lodash';
import { fetchData } from '../_utils/helpers';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_ASSET_ASSIGNEE_USERS_SUCCESS,
  CREATE_SECURITY_USER_SUCCESS,
  CREATE_SECURITY_USER_FAILURE,
  RESET_USERS,
  SET_USERS_ACTIVE_PAGE,
  RESET_STATUS_MESSAGE
} = constants;

const constructUrl = (pageNumber, limit, filters = {}) => {
  let url = `users?page=${pageNumber}&page_size=${limit}`;

  if (!isEmpty(filters)) {
    url = `${url}&asset_count=${filters['Asset Assigned'] || ''}&cohort=${filters.Cohort || ''}`;
  }
  return url;
};

export const loadUsers = (pageNumber, limit, filters = {}) => (dispatch) => {
  dispatch(loading(true));

  return fetchData(constructUrl(pageNumber, limit, filters))
    .then((response) => {
      dispatch(loading(false));
      const isFiltered = !isEmpty(filters);
      dispatch(loadUsersSuccess(response.data, isFiltered));
    })
    .catch((error) => {
      dispatch(loading(false));
      dispatch(loadUsersFailure(error.message));
    });
};

export const resetMessage = () => ({ type: RESET_STATUS_MESSAGE });

export const loadAssetAssigneeUsers = () => (dispatch) => {
  const url = 'asset-assignee/?paginate=false';
  dispatch(loading(true));
  return fetchData(url)
    .then((response) => {
      dispatch(loading(false));
      dispatch(loadAssetAssigneeSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loading(false));
      dispatch(loadUsersFailure(error.message));
    });
};

export const loading = isLoading => ({
  type: LOADING_USERS,
  isLoading
});

const loadUsersSuccess = (users, isFiltered = false) => ({
  type: LOAD_USERS_SUCCESS,
  payload: users,
  isFiltered
});
const loadUsersFailure = error => ({
  type: LOAD_USERS_FAILURE,
  payload: error
});
const loadAssetAssigneeSuccess = users => ({
  type: LOAD_ASSET_ASSIGNEE_USERS_SUCCESS,
  payload: users
});

export const addSecurityUser = securityUser => dispatch =>
  axios.post('/security-users/', securityUser)
    .then((response) => {
      dispatch({
        type: CREATE_SECURITY_USER_SUCCESS,
        payload: response.data
      });
      dispatch(updateToastMessageContent('New Security User Added Successfully', 'success'));
    })
    .catch((error) => {
      dispatch({
        type: CREATE_SECURITY_USER_FAILURE,
        payload: error.message
      });
      dispatch(updateToastMessageContent('Could not save Security User', 'error'));
    });

export const resetUsers = (isFiltered = false) => ({
  type: RESET_USERS,
  isFiltered
});

export const setActivePage = page => ({
  type: SET_USERS_ACTIVE_PAGE,
  payload: page
});
