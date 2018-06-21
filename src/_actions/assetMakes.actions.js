import axios from 'axios';
import constants from '../_constants';

// constants
const { LOAD_ASSET_MAKES_SUCCESS } = constants;

/**
 * load asset makes thunk
 *
 * @return dispatch loadAssetMakesSuccess type and payload
 */
export const loadAssetMakes = () => (dispatch =>
  axios.get('asset-makes/').then((response) => {
    dispatch(loadAssetMakesSuccess(response.data));
  }));

/**
 * loadAssetMakesSuccess action creator
 *
 * @param {array} assetMakes list of asset makes
 *
 * @return {object} type and payload
 */
export const loadAssetMakesSuccess = assetMakes => (
  { type: LOAD_ASSET_MAKES_SUCCESS, payload: assetMakes }
);
