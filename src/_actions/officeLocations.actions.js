import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE
} = constants;

export const loadOfficeLocations = () => (dispatch) => {
  dispatch({ type: LOAD_LOCATIONS_REQUEST });

  return axios.get('andela-centres/')
    .then((response) => {
      dispatch(loadOfficeLocationsSuccess(response.data));
    }).catch((error) => {
      dispatch(loadOfficeLocationsFailure(error));
    });
};

export const loadOfficeLocationsSuccess = centres => ({
  type: LOAD_LOCATIONS_SUCCESS,
  payload: centres
});

export const loadOfficeLocationsFailure = error => ({
  type: LOAD_LOCATIONS_FAILURE,
  payload: error
});
