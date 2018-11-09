// third-party library
import axios from 'axios';

// constants
import constants from '../_constants';

import { updateToastMessageContent } from './toastMessage.actions';

const {
  CREATE_ASSET_REQUEST,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_FAIL,
  LOADING_ASSET,
  LOAD_ASSET_FAILURE,
  LOAD_ASSET_SUCCESS,
  NEW_ALLOCATION_SUCCESS,
  NEW_ALLOCATION_FAILURE,
  UNASSIGN_SUCCESS,
  UNASSIGN_FAILURE,
  BUTTON_LOADING
} = constants;

export const createAsset = assetDetail => (dispatch) => {
  dispatch(createAssetRequest());

  return axios.post('manage-assets', assetDetail).then((response) => {
    dispatch(createAssetSuccess(response.data));
    dispatch(updateToastMessageContent('Asset Saved Successfully',
      'success'));
  }).catch((error) => {
    dispatch(createAssetFail(error));
    dispatch(updateToastMessageContent('Could Not Save The Asset', 'error'));
  });
};

export const createAssetRequest = asset => ({ type: CREATE_ASSET_REQUEST, payload: asset });

export const createAssetSuccess = asset => ({ type: CREATE_ASSET_SUCCESS, payload: asset });

export const createAssetFail = error => ({ type: CREATE_ASSET_FAIL, payload: error });

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
        dispatch(getAssetDetailSuccess(response.data));
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ASSET_FAILURE,
          payload: error.message
        });
      });
  }
);

export const getAssetDetailSuccess = payload => ({
  type: LOAD_ASSET_SUCCESS,
  payload
});

export const reloadAssetDetail = assetSerialNumber => dispatch =>
  axios.get(`manage-assets/${assetSerialNumber}`)
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

export const allocateAsset = (newAllocation, serialNumber) =>
  (dispatch) => {
    dispatch({ type: BUTTON_LOADING });
    return axios
      .post('allocations', newAllocation)
      .then((response) => {
        dispatch({
          type: NEW_ALLOCATION_SUCCESS,
          payload: response
        });
        dispatch(reloadAssetDetail(serialNumber));
      })
      .catch(error => dispatch({
        type: NEW_ALLOCATION_FAILURE,
        payload: error.message
      }));
  };

export const unassignAsset = (asset, serialNumber) =>
  (dispatch) => {
    dispatch({ type: BUTTON_LOADING });
    return axios
      .post('asset-status', asset)
      .then((response) => {
        dispatch({
          type: UNASSIGN_SUCCESS,
          payload: response
        });
        dispatch(reloadAssetDetail(serialNumber));
      })
      .catch(error => dispatch({
        type: UNASSIGN_FAILURE,
        payload: error.message
      }));
  };
