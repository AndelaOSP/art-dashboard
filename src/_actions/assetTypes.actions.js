import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOAD_ASSET_TYPES_SUCCESS,
  LOAD_ASSET_TYPES_FAILURE,
  LOADING_ASSET_TYPES,
  CREATE_ASSET_TYPE_SUCCESS,
  CREATE_ASSET_TYPE_FAILURE,
  UPDATE_TOAST_MESSAGE_CONTENT
} = constants;

export const loadAssetTypes = pageNumber => (dispatch) => {
  dispatch({ type: LOADING_ASSET_TYPES });
  return axios.get(`asset-types?page=${pageNumber}`)
    .then(response => dispatch({
      type: LOAD_ASSET_TYPES_SUCCESS,
      payload: response.data
    })).catch(error => dispatch({
      type: LOAD_ASSET_TYPES_FAILURE,
      payload: error
    }));
};

export const createAssetType = newAssetType =>
  (dispatch) => {
    axios.post('asset-types/', newAssetType).then((response) => {
      dispatch(createAssetTypeSuccess(response.data));
      dispatch(updateToastMessageContent('Asset Type Saved Successfully',
        'success'));
    }).catch((error) => {
      dispatch(createAssetTypeFailure(error));
      dispatch(updateToastMessageContent('Could Not Save The Asset Type',
        'error'));
    });
  };

export const createAssetTypeSuccess = assetType => (
  { type: CREATE_ASSET_TYPE_SUCCESS, payload: assetType }
);

export const createAssetTypeFailure = error => (
  { type: CREATE_ASSET_TYPE_FAILURE, payload: error }
);
