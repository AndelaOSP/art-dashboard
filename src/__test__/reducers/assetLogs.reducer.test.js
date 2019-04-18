
import expect from 'expect';
import assetLogReducer from '../../_reducers/assetLogs.reducer';
import mockStore from '../../_mock/mockStore';
import assetlogs from '../../_mock/assetLogs';
import constants from '../../_constants';

const {
  LOAD_ASSET_LOGS_SUCCESS,
  LOAD_ASSET_LOGS_FAILURE,
  LOADING_ASSET_LOGS
} = constants;

const action = { payload: {} };

describe('Asset Logs Reducer tests', () => {
  it('should handle LOAD_ASSET_LOGS_SUCCESS', () => {
    action.type = LOAD_ASSET_LOGS_SUCCESS;
    action.payload.results = assetlogs;
    expect(assetLogReducer(mockStore.logs, action)
      .assetLogs).toEqual(action.payload.results);
  });

  it('should handle LOAD_ASSET_LOGS_FAILURE', () => {
    action.type = LOAD_ASSET_LOGS_FAILURE;
    expect(assetLogReducer(mockStore.logs, action).assetLogs).toEqual([]);
    expect(assetLogReducer(mockStore.logs, action).isLoading).toEqual(false);
  });

  it('should handle LOADING_ASSET_LOGS', () => {
    action.type = LOADING_ASSET_LOGS;
    action.isLoading = true;
    expect(assetLogReducer(mockStore.logs, action).assetLogs).toEqual([]);
    expect(assetLogReducer(mockStore.logs, action).isLoading).toEqual(true);
  });
});
