import axios from 'axios';
import constants from '../_constants';

// constants
const { LOAD_ASSET_MAKES_SUCCESS } = constants;

/**
 * load asset makes thunk
 *
 * @return {type} loadAssetMakesSuccess type and payload
 */
export const loadAssetMakes = () => {
  return ((dispatch) => {
    return axios.get('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/makes').then((response) => {
      dispatch(loadAssetMakesSuccess(response.data));
    }).catch((error) => {
      console.log(error);
    });
  });
}

/**
 * loadAssetMakesSuccess action creator
 *
 * @param {type} assetMakes list of asset makes
 *
 * @return {type} type and payload
 */
export const loadAssetMakesSuccess = (assetMakes) => {
  return { type: LOAD_ASSET_MAKES_SUCCESS, payload: assetMakes };
}
