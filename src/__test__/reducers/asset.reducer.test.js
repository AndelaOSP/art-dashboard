// third-party library
import expect from 'expect';

// reducer
import assetReducer from '../../_reducers/asset.reducer';

// mock data
import asset from '../../_mock/asset';

// constants
import constants from '../../_constants';

const { LOAD_ASSET_SUCCESS, LOAD_ASSET_FAILURE, LOADING_ASSET } = constants;

const state = {
  assetDetail: {},
  errorMessage: '',
  hasError: false,
  isLoading: false
};
const action = {
  payload: { asset }
};

describe('Asset Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(assetReducer(state, {})).toEqual(state);
  });

  it('should handle LOAD_ASSET_SUCCESS', () => {
    action.type = LOAD_ASSET_SUCCESS;
    expect(assetReducer(state, action).assetDetail).toEqual(action.payload);
    expect(assetReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOAD_ASSET_FAILURE', () => {
    action.type = LOAD_ASSET_FAILURE;
    expect(assetReducer(state, action).hasError).toBe(true);
    expect(assetReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOADING_ASSET', () => {
    action.type = LOADING_ASSET;
    expect(assetReducer(state, action).isLoading).toBe(true);
  });
});
