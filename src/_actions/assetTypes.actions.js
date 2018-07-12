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

export const loadDropdownAssetTypes = () => (dispatch) => {
  const pageNumber = 1;
  return axios
    .get(`asset-types?page=${pageNumber}`)
    .then((response) => {
      const pages = Array.from(
        { length: Math.ceil(response.data.count / 10) },
        (page, key) => key + 1
      );
      let allAssetTypes = response.data.results;

      pages.forEach((page) => {
        if (page === 1) {
          return dispatch(dropdownAssetTypeSuccess(allAssetTypes));
        }
        return axios
          .get(`asset-types?page=${page}`)
          .then((res) => {
            allAssetTypes = [...allAssetTypes, ...res.data.results];
            return dispatch(dropdownAssetTypeSuccess(allAssetTypes));
          })
          .catch((error) => {
            dispatch(dropdownAssetTypeFailure(error));
            dispatch(updateToastMessageContent(error, 'error'));
          });
      });
    })
    .catch((error) => {
      dispatch(dropdownAssetTypeFailure(error));
      dispatch(updateToastMessageContent(`Could not load the asset types. ${error}`, 'error'));
    });
};

export const dropdownAssetTypeSuccess = allAssetTypes => (
  { type: LOAD_DROPDOWN_ASSET_TYPES_SUCCESS, payload: allAssetTypes }
);

export const dropdownAssetTypeFailure = error => (
  { type: LOAD_DROPDOWN_ASSET_TYPES_FAILURE, payload: error }
);
