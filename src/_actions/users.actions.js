import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_DROPDOWN_USERS_SUCCESS
} = constants;

export const loadUsers = (pageNumber, limit) => (dispatch) => {
  dispatch(loading(true));
  return axios.get(`users?page=${pageNumber}&page_size=${limit}`)
    .then((response) => {
      dispatch(loading(false));
      dispatch(loadUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loading(false));
      dispatch(loadUsersFailure(error.message));
    });
};

export const loadDropDownUsers = () => (dispatch) => {
  dispatch(loading(true));
  return axios.get('/users/?paginate=false')
    .then((response) => {
      dispatch(loading(false));
      dispatch(loadDropdownSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loading(false));
      dispatch(loadUsersFailure(error.message));
    });
};

const loading = isLoading => ({
  type: LOADING_USERS,
  isLoading
});

const loadUsersSuccess = users => ({
  type: LOAD_USERS_SUCCESS,
  payload: users
});
const loadUsersFailure = error => ({
  type: LOAD_USERS_FAILURE,
  payload: error
});
const loadDropdownSuccess = users => ({
  type: LOAD_DROPDOWN_USERS_SUCCESS,
  payload: users
});
