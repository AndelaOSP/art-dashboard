import axios from 'axios';
import constants from '../_constants';

// constants
const { CREATE_ASSET_SUCCESS, CREATE_ASSET_FAIL } = constants;

/**
 * create new asset thunk
 *
 * @param {object} assetDetail details of new asset to be created
 *
 * @return {object} createAssetSuccess type and payload
 */
export const createAsset = (assetDetail) => {
  return ((dispatch) => {
    return axios.post('/assets', assetDetail).then((response) => {
      dispatch(createAssetSuccess(response.data));
    }).catch((error) => {
      console.log(error);
      dispatch(createAssetFail());
    });
  });
};

/**
 * createAssetSuccess - create new asset success action creator
 *
 * @param {object} asset details of new asset created
 *
 * @return {object} type and payload
 */
export const createAssetSuccess = (asset) => {
  return { type: CREATE_ASSET_SUCCESS, payload: asset };
};

/**
 * createAssetFail - create new asset fail action creator
 *
 * @return {type} type and payload
 */
export const createAssetFail = () => {
  return { type: CREATE_ASSET_FAIL };
};
