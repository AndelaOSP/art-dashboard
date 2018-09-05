import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOADING_ASSET_MODELS,
  LOAD_ASSET_MODELS_SUCCESS,
  LOAD_ASSET_MODELS_FAILURE,
  LOADING_ALL_ASSET_MODELS,
  LOAD_ALL_ASSET_MODELS_SUCCESS,
  LOAD_ALL_ASSET_MODELS_FAILURE
} = constants;

export const loadAssetModels = (pageNumber, limit) => (dispatch) => {
  dispatch({ type: LOADING_ASSET_MODELS });

  return axios.get(`asset-models/?page=${pageNumber}&page_size=${limit}`).then((response) => {
    dispatch(loadAssetModelsSuccess(response.data));
  }).catch((error) => {
    dispatch(loadAssetModelsFailure(error));
    dispatch(updateToastMessageContent('Could Not Fetch The Asset Models',
      'error'));
  });
};

export const loadAssetModelsSuccess = response => ({
  type: LOAD_ASSET_MODELS_SUCCESS, payload: response
});

export const loadAssetModelsFailure = error => ({
  type: LOAD_ASSET_MODELS_FAILURE, payload: error
});

export const loadAllAssetModels = () => (dispatch) => {
  dispatch({ type: LOADING_ALL_ASSET_MODELS });

  return axios.get('asset-models/?paginate=false').then((response) => {
    dispatch(loadAllAssetModelsSuccess(response.data));
  }).catch((error) => {
    dispatch(loadAllAssetModelsFailure(error));
    dispatch(updateToastMessageContent('Could Not Fetch The Asset Models',
      'error'));
  });
};

export const loadAllAssetModelsSuccess = response => ({
  type: LOAD_ALL_ASSET_MODELS_SUCCESS, payload: response
});

export const loadAllAssetModelsFailure = error => ({
  type: LOAD_ALL_ASSET_MODELS_FAILURE, payload: error
});
