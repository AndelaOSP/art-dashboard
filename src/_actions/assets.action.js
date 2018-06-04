import constants from '../_constants';
import axios from 'axios';

const { LOAD_ASSETS_SUCCESS, LOAD_ASSETS_FAILURE } = constants;

export const getAssetsAction = (page = 1, limit = 10) => {
  return (dispatch) => {
    axios.get(`assets?_page=${page}&_limit=${limit}`)
    .then((response) => {
      return dispatch({
        type: LOAD_ASSETS_SUCCESS,
        payload: response,
      });
    })
    .catch((error) => {
      return dispatch({
        type: LOAD_ASSETS_FAILURE,
        payload: error,
      });
    });
  }
};
