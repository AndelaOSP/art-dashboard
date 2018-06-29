// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

const { LOAD_ASSET_TYPE_SUCCESS, LOAD_ASSET_TYPE_FAILURE, LOADING_ASSET_TYPE } = constants;

/**
 * load Asset Types thunk
 *
 * @return dispatch type and payload
 */
export const loadAssetTypeAction = () => (dispatch) => {
  dispatch({ type: LOADING_ASSET_TYPE });
  return axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/types')
    .then(response => dispatch({
      type: LOAD_ASSET_TYPE_SUCCESS,
      payload: response.data
    }))
    .catch(error => dispatch({
      type: LOAD_ASSET_TYPE_FAILURE,
      payload: error
    }));
};

// /**
//  * load AssetTypes Success action creator
//  *
//  * @param {array} assetTypes list of asset types
//  *
//  * @return {object} type and payload
//  */
// export const loadAssetTypesSuccess = (assetTypes) =>
// (type: LOAD_ASSET_TYPE_SUCCESS, payload: assetTypes );
export default loadAssetTypeAction;
