import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';

const {
  LOADING_ASSET_CONDITION,
  LOAD_ASSET_CONDITION_SUCCESS,
  LOAD_ASSET_CONDITION_FAILURE
} = constants;

export const loadAssetConditions = pageNumber => (dispatch) => {
  dispatch({ type: LOADING_ASSET_CONDITION });
  return axios.get(`asset-condition/?page=${pageNumber}`).then((response) => {
    dispatch(loadAssetConditionsSuccess(response.data));
  }).catch((error) => {
    dispatch(loadAssetConditionsFailure(error));
    dispatch(updateToastMessageContent('Could Not Fetch The Asset Conditions',
      'error'));
  });
};

export const loadAssetConditionsSuccess = assetConditions => ({
  type: LOAD_ASSET_CONDITION_SUCCESS, payload: assetConditions
});

export const loadAssetConditionsFailure = error => ({
  type: LOAD_ASSET_CONDITION_FAILURE, payload: error
});
