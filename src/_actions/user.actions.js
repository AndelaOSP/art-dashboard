import axios from 'axios';
import constants from '../_constants';

const { LOAD_USER_SUCCESS, LOAD_USER_FAILURE } = constants;

export const loadUserDetail = userId => dispatch => axios.get(`users${userId}`)
  .then((response) => {
    dispatch(loadUserDetailSuccess(response.data));
  })
  .catch((error) => {
    dispatch(loadUserDetailFailure(error.message));
  });

export const loadUserDetailSuccess = successData => ({
  type: LOAD_USER_SUCCESS, payload: successData
});

export const loadUserDetailFailure = errorMessage => ({
  type: LOAD_USER_FAILURE, payload: errorMessage
});

