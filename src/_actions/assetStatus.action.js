import axios from 'axios';
import constants from '../_constants';

const {
  LOAD_AVAILABLE_ASSETS_REQUEST,
  LOAD_AVAILABLE_ASSETS_SUCCESS,
  LOAD_AVAILABLE_ASSETS_FAILURE,
  LOAD_LOST_ASSETS_REQUEST,
  LOAD_LOST_ASSETS_SUCCESS,
  LOAD_LOST_ASSETS_FAILURE,
  LOAD_DAMAGED_ASSETS_REQUEST,
  LOAD_DAMAGED_ASSETS_SUCCESS,
  LOAD_DAMAGED_ASSETS_FAILURE,
  LOAD_ALLOCATED_ASSETS_REQUEST,
  LOAD_ALLOCATED_ASSETS_SUCCESS,
  LOAD_ALLOCATED_ASSETS_FAILURE
} = constants;

export const getAvailableAssets = () => {
  const url = 'manage-assets?paginate=false&current_status=available';

  return (dispatch) => {
    dispatch(getAvailableAssetsRequest());

    return axios.get(url)
      .then((response) => {
        dispatch(getAvailableAssetsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAvailableAssetsFailure(error.message));
      });
  };
};

const getAvailableAssetsRequest = () => ({
  type: LOAD_AVAILABLE_ASSETS_REQUEST
});

const getAvailableAssetsSuccess = data => ({
  type: LOAD_AVAILABLE_ASSETS_SUCCESS,
  payload: data
});

const getAvailableAssetsFailure = message => ({
  type: LOAD_AVAILABLE_ASSETS_FAILURE,
  payload: message
});

export const getLostAssets = () => {
  const url = 'manage-assets?paginate=false&current_status=lost';

  return (dispatch) => {
    dispatch(getLostAssetsRequest());

    return axios.get(url)
      .then((response) => {
        dispatch(getLostAssetsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getLostAssetsFailure(error.message));
      });
  };
};

const getLostAssetsRequest = () => ({
  type: LOAD_LOST_ASSETS_REQUEST
});

const getLostAssetsSuccess = data => ({
  type: LOAD_LOST_ASSETS_SUCCESS,
  payload: data
});

const getLostAssetsFailure = message => ({
  type: LOAD_LOST_ASSETS_FAILURE,
  payload: message
});

export const getDamagedAssets = () => {
  const url = 'manage-assets?paginate=false&current_status=damaged';

  return (dispatch) => {
    dispatch(getDamagedAssetsRequest());

    return axios.get(url)
      .then((response) => {
        dispatch(getDamagedAssetsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getDamagedAssetsFailure(error.message));
      });
  };
};

const getDamagedAssetsRequest = () => ({
  type: LOAD_DAMAGED_ASSETS_REQUEST
});

const getDamagedAssetsSuccess = data => ({
  type: LOAD_DAMAGED_ASSETS_SUCCESS,
  payload: data
});

const getDamagedAssetsFailure = message => ({
  type: LOAD_DAMAGED_ASSETS_FAILURE,
  payload: message
});

export const getAllocatedAssets = () => {
  const url = 'manage-assets?paginate=false&current_status=allocated';

  return (dispatch) => {
    dispatch(getAllocatedAssetsRequest(true));

    return axios.get(url)
      .then((response) => {
        dispatch(getAllocatedAssetsSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getAllocatedAssetsFailure(error.message));
      });
  };
};

const getAllocatedAssetsRequest = () => ({
  type: LOAD_ALLOCATED_ASSETS_REQUEST
});

const getAllocatedAssetsSuccess = data => ({
  type: LOAD_ALLOCATED_ASSETS_SUCCESS,
  payload: data
});

const getAllocatedAssetsFailure = message => ({
  type: LOAD_ALLOCATED_ASSETS_FAILURE,
  payload: message
});
