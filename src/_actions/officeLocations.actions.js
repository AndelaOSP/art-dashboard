import axios from 'axios';
import constants from '../_constants';
import { handleAxiosErrors } from '../_utils/ajax';

const {
  LOAD_LOCATIONS_REQUEST,
  LOAD_LOCATIONS_SUCCESS,
  LOAD_LOCATIONS_FAILURE,
  RESET_STATUS_MESSAGE,
  CREATE_LOCATIONS_REQUEST,
  CREATE_LOCATIONS_SUCCESS,
  CREATE_LOCATIONS_FAILURE,
  LOAD_COUNTRIES_REQUEST,
  LOAD_COUNTRIES_SUCCESS,
  LOAD_COUNTRIES_FAILURE,
  UPDATE_ANDELA_CENTRE_REQUEST,
  UPDATE_ANDELA_CENTRE_SUCCESS,
  UPDATE_ANDELA_CENTRE_FAILURE
} = constants;

export const loadOfficeLocations = (pageNumber, limit) => (dispatch) => {
  dispatch({ type: LOAD_LOCATIONS_REQUEST });

  return axios
    .get(`andela-centres/?page=${pageNumber}&page_size=${limit}`)
    .then((response) => {
      dispatch(loadOfficeLocationsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loadOfficeLocationsFailure(error));
    });
};

export const createOfficeLocation = data => (dispatch) => {
  dispatch({ type: CREATE_LOCATIONS_REQUEST });
  return axios
    .post('andela-centres', data)
    .then((response) => {
      dispatch({ type: CREATE_LOCATIONS_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      const message = retrieveErrorMessage(error);
      dispatch({ type: CREATE_LOCATIONS_FAILURE, payload: message });
    });
};

const retrieveErrorMessage = (error) => {
  const axiosError = handleAxiosErrors(error);
  if (axiosError.name) {
    return axiosError.name.shift();
  }

  return axiosError;
};

export const loadCountries = () => (dispatch) => {
  dispatch({ type: LOAD_COUNTRIES_REQUEST });

  return axios
    .get('countries')
    .then((response) => {
      dispatch({ type: LOAD_COUNTRIES_SUCCESS, payload: response.data.results });
    })
    .catch((error) => {
      dispatch({ type: LOAD_COUNTRIES_FAILURE, payload: error.message });
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

export const updateAndelaCentre = (centreId, centre) => (dispatch) => {
  dispatch({ type: UPDATE_ANDELA_CENTRE_REQUEST });

  return axios.put(`andela-centres/${centreId}`, centre)
    .then((response) => {
      dispatch(updateAndelaCentreSuccess(response.data));
    }).catch((error) => {
      const message = retrieveErrorMessage(error);
      dispatch(updateAndelaCentreFail(message));
    });
};

export const updateAndelaCentreSuccess = centre => ({
  type: UPDATE_ANDELA_CENTRE_SUCCESS,
  payload: centre
});

export const updateAndelaCentreFail = error => ({
  type: UPDATE_ANDELA_CENTRE_FAILURE,
  payload: error
});

export const resetMessage = () => ({ type: RESET_STATUS_MESSAGE });
