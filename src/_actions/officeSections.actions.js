import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_OFFICE_SECTIONS_REQUEST,
  LOAD_OFFICE_SECTIONS_SUCCESS,
  LOAD_OFFICE_SECTIONS_FAILURE
} = constants;

const loadOfficeSections = (pageNumber, limit) => (dispatch) => {
  dispatch({ type: LOAD_OFFICE_SECTIONS_REQUEST });

  return axios
    .get(`/office-sections/?page=${pageNumber}&page_size=${limit}`)
    .then((response) => {
      dispatch({ type: LOAD_OFFICE_SECTIONS_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: LOAD_OFFICE_SECTIONS_FAILURE, payload: error.message });
    });
};

export default loadOfficeSections;
