import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_ASSETS_SUCCESS,
  LOAD_ASSETS_FAILURE,
  LOAD_ASSETS_STARTS
} = constants;

/* eslint-disable import/prefer-default-export */
export const getAssetsAction = (pageNumber, limit) => (
  (dispatch) => {
    dispatch({ type: LOAD_ASSETS_STARTS });
    return axios.get(`manage-assets?page=${pageNumber}&page_size=${limit}`)
      .then((response) => {
        dispatch({
          type: LOAD_ASSETS_SUCCESS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ASSETS_FAILURE,
          payload: error.message
        });
      });
  }
);
