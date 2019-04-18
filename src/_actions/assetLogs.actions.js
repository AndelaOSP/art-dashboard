import axios from 'axios';
import constants from '../_constants';
import { updateToastMessageContent } from './toastMessage.actions';
// constants
const {
  LOAD_ASSET_LOGS_SUCCESS,
  LOAD_ASSET_LOGS_FAILURE,
  LOADING_ASSET_LOGS
} = constants;

/**
 * load asset logs thunk
 * @return dispatch loadAssetLogs type and payload
 */
const loadAssetLogs = () => (dispatch) => {
  dispatch(loading(true));
  return axios.get('asset-logs')
    .then((response) => {
      dispatch(loading(false));
      dispatch(loadAssetLogsSuccess(response.data));
    })
    .catch((error) => {
      dispatch(loading(false));
      dispatch(loadAssetLogsFailure(error));
      dispatch(updateToastMessageContent(error.message, 'error'));
    });
};

export default loadAssetLogs;


const loading = isLoading => ({
  type: LOADING_ASSET_LOGS,
  isLoading
});

const loadAssetLogsSuccess = makes => ({
  type: LOAD_ASSET_LOGS_SUCCESS,
  payload: makes
});

const loadAssetLogsFailure = error => ({
  type: LOAD_ASSET_LOGS_FAILURE,
  payload: error.message
});
