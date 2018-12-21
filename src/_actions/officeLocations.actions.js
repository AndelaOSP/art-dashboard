import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE,
  RESET_STATUS_MESSAGE
} = constants;

export const loadOfficeLocations = (pageNumber, limit) => (dispatch) => {
  dispatch({ type: LOAD_LOCATIONS_REQUEST });

  return axios.get(`andela-centres/?page=${pageNumber}&page_size=${limit}`)
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

export const resetMessage = () => ({ type: RESET_STATUS_MESSAGE });
