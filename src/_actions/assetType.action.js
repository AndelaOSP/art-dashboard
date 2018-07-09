// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

const { LOAD_ASSET_TYPE_SUCCESS, LOAD_ASSET_TYPE_FAILURE, LOADING_ASSET_TYPE } = constants;

/**
 * load Asset Type thunk
 *
 * @return dispatch type and payload
 */
export const loadAssetType = id => (dispatch) => {
  dispatch({ type: LOADING_ASSET_TYPE });
  return axios.get(`/asset-types/${id}`)
    .then(response => dispatch({
      type: LOAD_ASSET_TYPE_SUCCESS,
      payload: response.data
    }))
    .catch(error => dispatch({
      type: LOAD_ASSET_TYPE_FAILURE,
      payload: error
    }));
};

export default loadAssetType;
