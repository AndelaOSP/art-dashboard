import axios from 'axios';
import constants from '../_constants';

// constants
const { LOAD_ASSET_MAKES_SUCCESS } = constants;

/**
 * load asset makes thunk
 *
 * @return dispatch loadAssetMakesSuccess type and payload
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
 * @param {array} assetMakes list of asset makes
 *
 * @return {object} type and payload
 */
export const loadAssetMakesSuccess = (assetMakes) => {
  return { type: LOAD_ASSET_MAKES_SUCCESS, payload: assetMakes };
}
