import axios from 'axios';
import constants from '../_constants';

const {
  ASSET_STATUS_LOADING,
  ASSET_STATUS_FETCH_SUCCESS,
  ASSET_STATUS_FETCH_FAILURE
} = constants;

export const getAssetStatus = (statusType = 'available') => {
  const url = `manage-assets?current_status=${statusType}`;

  return (dispatch) => {
    dispatch(loadingAssetStatus(true, statusType));

    return axios.get(url)
      .then((response) => {
        dispatch(loadingAssetStatus(false, statusType));
        dispatch(getAssetStatusSuccess(response.data, statusType));
      })
      .catch((error) => {
        dispatch(loadingAssetStatus(false, statusType));
        dispatch(getAssetStatusFailure(error.message, statusType));
      });
  };
};

export const loadingAssetStatus = (loading, statusType) => ({
  type: ASSET_STATUS_LOADING,
  loading,
  statusType
});

export const getAssetStatusSuccess = (payload, statusType) => ({
  type: ASSET_STATUS_FETCH_SUCCESS,
  payload,
  statusType
});

export const getAssetStatusFailure = (payload, statusType) => ({
  type: ASSET_STATUS_FETCH_FAILURE,
  payload,
  statusType
});
