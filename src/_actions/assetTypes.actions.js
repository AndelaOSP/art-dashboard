import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOAD_ASSET_TYPES_SUCCESS,
  LOAD_ASSET_TYPES_FAILURE,
  LOADING_ASSET_TYPES,
  CREATE_ASSET_TYPE_SUCCESS,
  CREATE_ASSET_TYPE_FAILURE,
  LOAD_DROPDOWN_ASSET_TYPES_FAILURE,
  LOAD_DROPDOWN_ASSET_TYPES_SUCCESS
} = constants;

export const loadAssetTypes = (pageNumber, limit) => (dispatch) => {
  dispatch(loading(true));
  return axios.get(`asset-types?page=${pageNumber}&page_size=${limit}`)
    .then((response) => {
      dispatch(loading(false));
      dispatch(loadAssetTypeSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loading(false));
      dispatch(loadAssetTypeFailure(error.message));
    });
};

export const createAssetType = newAssetType => dispatch =>
  axios.post('asset-types', newAssetType)
    .then((response) => {
      dispatch(createAssetTypeSuccess(response.data));
      dispatch(updateToastMessageContent('Asset Type Saved Successfully', 'success'));
    })
    .catch((error) => {
      dispatch(createAssetTypeFailure(error.message));
      dispatch(updateToastMessageContent('Could Not Save The Asset Type', 'error'));
    });

export const createAssetTypeSuccess = assetType => ({
  type: CREATE_ASSET_TYPE_SUCCESS,
  payload: assetType
});

export const createAssetTypeFailure = error => ({
  type: CREATE_ASSET_TYPE_FAILURE,
  payload: error
});

export const loadDropdownAssetTypes = () => (dispatch) => {
  dispatch(loading(true));
  return axios
    .get('asset-types/?paginate=false')
    .then((response) => {
      dispatch(loading(false));
      dispatch(dropdownAssetTypeSuccess(response.data));
    }).catch((error) => {
      dispatch(loading(false));
      dispatch(dropdownAssetTypeFailure(error.message));
      dispatch(updateToastMessageContent(error.message, 'error'));
    });
};

const dropdownAssetTypeSuccess = allAssetTypes => ({
  type: LOAD_DROPDOWN_ASSET_TYPES_SUCCESS,
  payload: allAssetTypes
});

const dropdownAssetTypeFailure = error => ({
  type: LOAD_DROPDOWN_ASSET_TYPES_FAILURE,
  payload: error
});

const loadAssetTypeSuccess = allAssetTypes => ({
  type: LOAD_ASSET_TYPES_SUCCESS,
  payload: allAssetTypes
});

const loadAssetTypeFailure = error => ({
  type: LOAD_ASSET_TYPES_FAILURE,
  payload: error
});

const loading = isLoading => ({
  type: LOADING_ASSET_TYPES,
  isLoading
});
