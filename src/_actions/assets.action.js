import axios from 'axios';
import constants from '../_constants';

const { LOAD_ASSETS_SUCCESS, LOAD_ASSETS_FAILURE, LOAD_ASSETS_STARTS } = constants;

/* eslint-disable import/prefer-default-export */
export const getAssetsAction = () => (
  (dispatch) => {
    dispatch({ type: LOAD_ASSETS_STARTS });
    return axios.get('assets')
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
