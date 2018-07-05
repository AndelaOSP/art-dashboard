import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';
// constants
const {
  LOAD_ASSET_MAKES_SUCCESS,
  ADD_ASSET_MAKE_SUCCESS,
  ADD_ASSET_MAKE_FAILURE
} = constants;

/**
 * load asset makes thunk
 *
 * @return dispatch loadAssetMakesSuccess type and payload
 */
export const loadAssetMakes = () => (dispatch =>
  axios.get('asset-makes').then((response) => {
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

export const addAssetMakes = newMake => (dispatch =>
  axios
    .post('asset-makes', newMake)
    .then((response) => {
      dispatch(addAssetMakesSuccess(response.data));
      dispatch(updateToastMessageContent('New Asset Make Saved Successfully',
        'success'));
    })
    .catch((error) => {
      dispatch(addAssetMakesFailure(error));
      dispatch(updateToastMessageContent('Could Not Save The Asset Make',
        'error'));
    })
);

export const addAssetMakesSuccess = assetMakes => (
  { type: ADD_ASSET_MAKE_SUCCESS, payload: assetMakes }
);

const addAssetMakesFailure = error => (
  { type: ADD_ASSET_MAKE_FAILURE, payload: error }
);
