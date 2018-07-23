import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS,
  LOAD_DROPDOWN_USERS_SUCCESS,
  LOAD_DROPDOWN_USERS_FAILURE,
  LOADING_DROPDOWN_USERS
} = constants;

export const loadUsers = (pageNumber, limit) => (dispatch) => {
  dispatch({ type: LOADING_USERS });
  return axios.get(`users?page=${pageNumber}&page_size=${limit}`)
    .then(response => dispatch({
      type: LOAD_USERS_SUCCESS,
      payload: response.data
    })).catch(error => dispatch({
      type: LOAD_USERS_FAILURE,
      payload: error.message
    }));
};

export const loadDropDownUsers = () => (dispatch) => {
  dispatch({ type: LOADING_DROPDOWN_USERS });
  return axios.get('/users/?paginate=false')
    .then(response => dispatch({
      type: LOAD_DROPDOWN_USERS_SUCCESS,
      payload: response.data
    })).catch(error => dispatch({
      type: LOAD_DROPDOWN_USERS_FAILURE,
      payload: error.message
    }));
};
