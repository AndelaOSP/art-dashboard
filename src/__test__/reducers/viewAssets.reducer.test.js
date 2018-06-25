// third-party library
import expect from 'expect';

// reducer
import viewAssetsReducer from '../../_reducers/viewAssets.reducer';

// mock data
import assets from '../../_mock/assets';

// constants
import constants from '../../_constants';

const { LOAD_ASSETS_SUCCESS, LOAD_ASSETS_FAILURE, LOAD_ASSETS_STARTS } = constants;

const state = {
  assets: [],
  assetsCount: 0,
  hasError: false,
  isLoading: false,
};
const action = {
  payload: assets
};

describe('Asset Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(viewAssetsReducer(state, {})).toEqual(state);
  });

  it('should handle LOAD_ASSETS_SUCCESS', () => {
    action.type = LOAD_ASSETS_SUCCESS;
    expect(viewAssetsReducer(state, action).assets).toEqual(action.payload);
    expect(viewAssetsReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOAD_ASSETS_FAILURE', () => {
    action.type = LOAD_ASSETS_FAILURE;
    expect(viewAssetsReducer(state, action).hasError).toBe(true);
    expect(viewAssetsReducer(state, action).isLoading).toBe(false);
  });

  it('should handle LOAD_ASSETS_STARTS', () => {
    action.type = LOAD_ASSETS_STARTS;
    expect(viewAssetsReducer(state, action).isLoading).toBe(true);
  });
});
