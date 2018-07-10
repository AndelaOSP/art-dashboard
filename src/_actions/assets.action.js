import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOAD_ASSETS_SUCCESS,
  LOAD_ASSETS_FAILURE,
  LOAD_ASSETS_STARTS,
  CREATE_ASSET_SUCCESS,
  CREATE_ASSET_FAIL
} = constants;

/* eslint-disable import/prefer-default-export */
export const getAssetsAction = pageNumber => (
  (dispatch) => {
    dispatch({ type: LOAD_ASSETS_STARTS });
    return axios.get(`manage-assets?page=${pageNumber}`)
      .then((response) => {
        dispatch({
          type: LOAD_ASSETS_SUCCESS,
          payload: response.data
        });
      })
      .catch((error) => {
        dispatch({
          type: LOAD_ASSETS_FAILURE,
          payload: error.message
        });
      });
  }
);

export const createAsset = assetDetail => (dispatch => axios.post('manage-assets', assetDetail).then((response) => {
  dispatch(createAssetSuccess(response.data));
  dispatch(updateToastMessageContent('Asset Saved Successfully',
    'success'));
}).catch((error) => {
  dispatch(createAssetFail(error));
  dispatch(updateToastMessageContent('Could Not Save The Asset', 'error'));
}));

export const createAssetSuccess = asset => ({ type: CREATE_ASSET_SUCCESS, payload: asset });

export const createAssetFail = error => ({ type: CREATE_ASSET_FAIL, payload: error });
