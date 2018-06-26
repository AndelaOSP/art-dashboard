import axios from 'axios';
import constants from '../_constants';

const { LOAD_ASSET_TYPE_SUCCESS, LOAD_ASSET_TYPE_FAILURE } = constants;

export const loadAssetTypeAction = () =>
  (dispatch => axios.get('asset-types')
    .then(response => dispatch({
      type: LOAD_ASSET_TYPE_SUCCESS,
      payload: response,
    }))
    .catch(error => dispatch({
      type: LOAD_ASSET_TYPE_FAILURE,
      payload: error,
    })));

export default loadAssetTypeAction;
