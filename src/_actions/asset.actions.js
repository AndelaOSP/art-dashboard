// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

// mock data
import mockAsset from '../_mock/asset';

const {
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_FAIL,
  LOADING_ASSET,
  LOAD_ASSET_FAILURE,
  LOAD_ASSET_SUCCESS } = constants;

/**
 * create new asset thunk
 *
 * @param {object} assetDetail details of new asset to be created
 *
 * @return {object} createAssetSuccess type and payload
 */
export const createAsset = assetDetail => (
  dispatch => (
    axios.post('https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/categories', assetDetail).then(() => {
      dispatch(createAssetSuccess(mockAsset));
    }).catch((error) => {
      dispatch(createAssetFail(error));
    })
  ));

/**
 * createAssetSuccess - create new asset success action creator
 *
 * @param {object} asset details of new asset created
 *
 * @return {object} type and payload
 */
export const createAssetSuccess = asset => (
  { type: CREATE_ASSET_SUCCESS, payload: asset }
);

/**
 * createAssetFail - create new asset fail action creator
 *
 * @return {type} type and payload
 */
export const createAssetFail = () => ({ type: CREATE_ASSET_FAIL });

/**
 * load asset detail thunk
 *
 * @param {string} assetSerialNumber serial number of the asset
 *
 * @return {object} dispatch object
 */
export const getAssetDetail = assetSerialNumber => (
  (dispatch) => {
    dispatch({ type: LOADING_ASSET });
    return axios.get(`manage-assets/${assetSerialNumber}`)
      .then((response) => {
        dispatch({
          type: LOAD_ASSET_SUCCESS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ASSET_FAILURE,
          payload: error.message
        });
      });
  }
);
