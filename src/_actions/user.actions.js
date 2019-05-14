import axios from 'axios';
import constants from '../_constants';

const {
  LOADING_USER,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE
} = constants;
export const loadUserDetail = userId => (
  (dispatch) => {
    dispatch(loading(true));
    return axios.get(`users/${userId}`)
      .then((response) => {
        dispatch(loading(false));
        dispatch(loadUserDetailSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loading(false));
        dispatch(loadUserDetailFailure(error.message));
      });
  }
);

export const updateUserDetail = user => (
  (dispatch) => {
    dispatch(loading(true));
    return axios.patch(`users/${user.id}`, user)
      .then((response) => {
        dispatch(loading(false));
        dispatch(updateUserDetailSuccess(response.data));
      })
      .catch((error) => {
        dispatch(loading(false));
        dispatch(updateUserDetailFailure(error.message));
      });
  }
);

const loading = isLoading => ({
  type: LOADING_USER,
  isLoading
});

export const loadUserDetailSuccess = successData => ({
  type: LOAD_USER_SUCCESS,
  payload: successData
});

export const loadUserDetailFailure = errorMessage => ({
  type: LOAD_USER_FAILURE,
  payload: errorMessage
});

export const updateUserDetailSuccess = successData => ({
  type: UPDATE_USER_SUCCESS,
  payload: successData
});

export const updateUserDetailFailure = errorMessage => ({
  type: UPDATE_USER_FAILURE,
  payload: errorMessage
});
