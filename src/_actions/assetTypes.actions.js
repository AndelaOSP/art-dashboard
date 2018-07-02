import axios from 'axios';
import constants from '../_constants';

const { LOAD_ASSET_TYPES_SUCCESS, LOAD_ASSET_TYPES_FAILURE, LOADING_ASSET_TYPES } = constants;

export const loadAssetTypes = () => (dispatch) => {
  dispatch({ type: LOADING_ASSET_TYPES });
  return axios.get('asset-types')
    .then(response => dispatch({
      type: LOAD_ASSET_TYPES_SUCCESS,
      payload: response.data
    })).catch(error => dispatch({
      type: LOAD_ASSET_TYPES_FAILURE,
      payload: error
    }));
};

export default loadAssetTypes;
