import constants from '../_constants';
import axios from 'axios';

const { LOAD_ASSET_TYPE_SUCCESS, LOAD_ASSET_TYPE_FAILURE } = constants;

export const loadAssetTypeAction = (page, limit = 10) => (dispatch) => {
  axios.get('asset-types/')
    .then(response => dispatch({
      type: LOAD_ASSET_TYPE_SUCCESS,
      payload: response,
    }))
    .catch(error => dispatch({
      type: LOAD_ASSET_TYPE_FAILURE,
      payload: error,
    }));
};
