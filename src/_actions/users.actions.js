import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_USERS_SUCCESS,
  LOAD_USERS_FAILURE,
  LOADING_USERS
} = constants;

export const loadUsers = pageNumber => (dispatch) => {
  dispatch({ type: LOADING_USERS });
  return axios.get(`users?${pageNumber}`)
    .then(response => dispatch({
      type: LOAD_USERS_SUCCESS,
      payload: response.data
    })).catch(error => dispatch({
      type: LOAD_USERS_FAILURE,
      payload: error.message
    }));
};

export default loadUsers;
