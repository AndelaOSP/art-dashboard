import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_USER_DETAILS_SUCCESS,
  LOAD_USER_DETAILS_FAILURE
} = constants;

const loadUsers = () => dispatch =>
  axios
    .get('users')
    .then((response) => {
      dispatch(loadUsersSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loadUsersFailure(error));
    });

const loadUsersSuccess = users => ({
  type: LOAD_USER_DETAILS_SUCCESS,
  payload: users
});

const loadUsersFailure = error => ({
  type: LOAD_USER_DETAILS_FAILURE,
  payload: error
});

export default loadUsers;
