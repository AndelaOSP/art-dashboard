// third-party libraries
import expect from 'expect';

// reducer
import loadAssetSpecsReducer from '../../_reducers/assetSpecs.reducer';

// constants
import constants from '../../_constants';

// mock data
import assetSpecs from '../../_mock/assetSpecs';

const {
  LOAD_ASSET_SPECS_START,
  LOAD_ASSET_SPECS_FAILURE,
  LOAD_ASSET_SPECS_SUCCESS
} = constants;

const oldState = {
  specs: [],
  assetSpecsCount: 0,
  isLoading: false,
  hasError: false,
  previousUrl: '',
  nextUrl: ''
};

const action = { assetSpecs: {} };

describe('Asset Specs Reducer', () => {
  it('should return default state if an action is not provided', () => {
    expect(loadAssetSpecsReducer(oldState, {})).toEqual(oldState);
  });

  it('should handle LOAD_ASSET_SPECS_START', () => {
    action.type = LOAD_ASSET_SPECS_START;
    action.assetSpecs.results = assetSpecs;
    expect(loadAssetSpecsReducer(oldState, action).isLoading).toEqual(true);
    expect(loadAssetSpecsReducer(oldState, action).hasError).toEqual(false);
    expect(loadAssetSpecsReducer(oldState, action).specs).toEqual([]);
  });

  it('should handle LOAD_ASSET_SPECS_SUCCESS', () => {
    action.type = LOAD_ASSET_SPECS_SUCCESS;
    action.assetSpecs.results = assetSpecs;
    expect(loadAssetSpecsReducer(oldState, action).isLoading).toEqual(false);
    expect(loadAssetSpecsReducer(oldState, action).hasError).toEqual(false);
    expect(loadAssetSpecsReducer(oldState, action).specs)
      .toEqual(action.assetSpecs.results);
  });

  it('should handle LOAD_ASSET_SPECS_FAILURE', () => {
    action.type = LOAD_ASSET_SPECS_FAILURE;
    action.assetSpecs.results = assetSpecs;
    expect(loadAssetSpecsReducer(oldState, action).isLoading).toEqual(false);
    expect(loadAssetSpecsReducer(oldState, action).hasError).toEqual(true);
    expect(loadAssetSpecsReducer(oldState, action).specs).toEqual([]);
  });
});
