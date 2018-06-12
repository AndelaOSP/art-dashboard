// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

// mock data
import mockAsset from '../_mock/asset';

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
    return axios.post('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/categories', assetDetail).then((response) => {
      dispatch(createAssetSuccess(mockAsset));
    }).catch((error) => {
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
