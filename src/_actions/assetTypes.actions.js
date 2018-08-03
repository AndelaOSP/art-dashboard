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
  dispatch({ type: LOADING_ASSET_TYPES });
  return axios.get(`asset-types?page=${pageNumber}&page_size=${limit}`)
    .then(response => dispatch({
      type: LOAD_ASSET_TYPES_SUCCESS,
      payload: response.data
    })).catch(error => dispatch({
      type: LOAD_ASSET_TYPES_FAILURE,
      payload: error
    }));
};

export const createAssetType = newAssetType =>
  dispatch => axios.post('asset-types', newAssetType).then((response) => {
    dispatch(createAssetTypeSuccess(response.data));
    dispatch(updateToastMessageContent('Asset Type Saved Successfully',
      'success'));
  }).catch((error) => {
    dispatch(createAssetTypeFailure(error));
    dispatch(updateToastMessageContent('Could Not Save The Asset Type',
      'error'));
  });

export const createAssetTypeSuccess = assetType => (
  { type: CREATE_ASSET_TYPE_SUCCESS, payload: assetType }
);

export const createAssetTypeFailure = error => (
  { type: CREATE_ASSET_TYPE_FAILURE, payload: error }
);

export const loadDropdownAssetTypes = () => dispatch =>
  axios
    .get('asset-types/?paginate=false')
    .then((response) => {
      dispatch(dropdownAssetTypeSuccess(response.data));
    }).catch((error) => {
      dispatch(dropdownAssetTypeFailure(error));
      dispatch(updateToastMessageContent(error.message, 'error'));
    });

export const dropdownAssetTypeSuccess = allAssetTypes => ({
  type: LOAD_DROPDOWN_ASSET_TYPES_SUCCESS, payload: allAssetTypes
});

export const dropdownAssetTypeFailure = error => ({
  type: LOAD_DROPDOWN_ASSET_TYPES_FAILURE, payload: error
});
