// third-party library
import expect from 'expect';

// reducer
import assetReducer from '../../_reducers/assets.reducer';

// mock data
import asset from '../../_mock/asset';
import assets from '../../_mock/assets';

import {
  createAssetSuccess,
  createAssetFail
} from '../../_actions/asset.actions';

// constants
import constants from '../../_constants';

const { LOAD_ASSETS_SUCCESS, LOAD_ASSETS_FAILURE, LOAD_ASSETS_STARTS } = constants;

const state = {
  assetsList: [],
  assetsCount: 0,
  hasError: false,
  isLoading: false
};
let action = {
  payload: {
    results: assets
  }
};

describe('Asset Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(assetReducer(state, {})).toEqual(state);
  });

  it('should handle LOAD_ASSETS_SUCCESS', () => {
    action.type = LOAD_ASSETS_SUCCESS;
    expect(assetReducer(state, action).assetsList).toEqual(action.payload.results);
    expect(assetReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOAD_ASSETS_FAILURE', () => {
    action.type = LOAD_ASSETS_FAILURE;
    expect(assetReducer(state, action).hasError).toBe(true);
    expect(assetReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOAD_ASSETS_STARTS', () => {
    action.type = LOAD_ASSETS_STARTS;
    expect(assetReducer(state, action).isLoading).toBe(true);
  });

  it('should handle CREATE_ASSET_SUCCESS', () => {
    const expected = asset;
    action = createAssetSuccess(asset);
    expect(assetReducer(state, {})).toEqual(state);
    expect(assetReducer(state, action).assetsList[0]).toEqual(expected);
    expect(assetReducer(state, action).assetsCount).toEqual(1);
  });

  it('should handle CREATE_ASSET_FAIL', () => {
    action = createAssetFail('400 error');
    expect(assetReducer(state, action)).toEqual({ ...state, hasError: true });
  });
});
