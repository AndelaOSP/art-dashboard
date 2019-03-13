import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_ASSET_LOGS_SUCCESS,
  LOAD_ASSET_LOGS_FAILURE,
  LOADING_ASSET_LOGS
} = constants;

export default (state = initialState.logs, action) => {
  switch (action.type) {
    case LOAD_ASSET_LOGS_SUCCESS:
      return {
        ...state,
        assetLogs: action.payload.results,
        assetLogsCount: action.payload.count
      };
    case LOAD_ASSET_LOGS_FAILURE:
      return state;
    case LOADING_ASSET_LOGS:
      return {
        ...state,
        isLoading: action.isLoading
      };
    default:
      return state;
  }
};
