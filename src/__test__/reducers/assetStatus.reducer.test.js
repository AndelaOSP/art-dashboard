import expect from 'expect';

import constants from '../../_constants';
import assetStatusReducer from '../../_reducers/assetStatus.reducer';

const {
  ASSET_STATUS_LOADING,
  ASSET_STATUS_FETCH_SUCCESS,
  ASSET_STATUS_FETCH_FAILURE
} = constants;

const state = {
  assetStatus: {
    available: {
      assets: [],
      count: 0,
      loading: false,
      errorMessage: ''
    }
  }
};

const action = {
  payload: {
    results: []
  }
};

describe('Asset Status Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(assetStatusReducer(state, {}))
      .toEqual(state);
  });

  it('should handle ASSET_STATUS_LOADING', () => {
    action.type = ASSET_STATUS_LOADING;
    expect(assetStatusReducer(state, action).assetStatus.available.loading)
      .toBe(false);
  });

  it('should handle ASSET_STATUS_FETCH_SUCCESS', () => {
    action.type = ASSET_STATUS_FETCH_SUCCESS;
    expect(assetStatusReducer(state, action).assetStatus.available.assets)
      .toEqual(action.payload.results);
    expect(assetStatusReducer(state, action).assetStatus.available.loading)
      .toBe(false);
  });

  it('should handle ASSET_STATUS_FETCH_FAILURE', () => {
    action.type = ASSET_STATUS_FETCH_FAILURE;
    expect(assetStatusReducer(state, action).assetStatus.available.loading)
      .toBe(false);
  });
});
