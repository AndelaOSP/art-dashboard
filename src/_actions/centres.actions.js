import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_CENTRES,
  LOAD_CENTRES_SUCCESS,
  LOAD_CENTRES_FAILURE
} = constants;

export const loadCentres = () => (dispatch) => {
  dispatch({ type: LOAD_CENTRES });

  return axios.get('andela-centres/')
    .then((response) => {
      dispatch(loadCentresSuccess(response.data));
    }).catch((error) => {
      dispatch(loadCentresFailure(error));
    });
};

export const loadCentresSuccess = centres => ({
  type: LOAD_CENTRES_SUCCESS,
  payload: centres
});

export const loadCentresFailure = error => ({
  type: LOAD_CENTRES_FAILURE,
  payload: error
});
