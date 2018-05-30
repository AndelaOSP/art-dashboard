// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

const { LOAD_ASSET_TYPES_SUCCESS } = constants;

/**
 * load Asset Types thunk
 *
 * @return dispatch type and payload
 */
export const loadAssetTypes = () => {
  return ((dispatch) => {
    return axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/types').then((response) => {
      dispatch(loadAssetTypesSuccess(response.data));
    }).catch((error) => {
      console.log(error);
    });
  });
}

/**
 * load AssetTypes Success action creator
 *
 * @param {array} assetTypes list of asset types
 *
 * @return {object} type and payload
 */
export const loadAssetTypesSuccess = (assetTypes) => {
  return { type: LOAD_ASSET_TYPES_SUCCESS, payload: assetTypes };
}
