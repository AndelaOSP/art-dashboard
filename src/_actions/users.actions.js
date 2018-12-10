import { isEmpty } from 'lodash';
import { fetchData } from '../_utils/helpers';
import constructUrl from '../_utils/constructUrl';
import constants from '../_constants';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_ASSET_ASSIGNEE_USERS_SUCCESS,
  RESET_USERS,
  SET_USERS_ACTIVE_PAGE,
  RESET_STATUS_MESSAGE
} = constants;

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

export const resetUsers = (isFiltered = false) => ({
  type: RESET_USERS,
  isFiltered
});

export const setActivePage = page => ({
  type: SET_USERS_ACTIVE_PAGE,
  payload: page
});
