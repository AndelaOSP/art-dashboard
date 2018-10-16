// third-party libraries
import expect from 'expect';

// reducer
import assetSpecsReducer from '../../_reducers/assetSpecs.reducer';

// constants
import constants from '../../_constants';

// mock data
import assetSpecs from '../../_mock/assetSpecs';

const {
  LOAD_ASSET_SPECS_START,
  LOAD_ASSET_SPECS_FAILURE,
  LOAD_ASSET_SPECS_SUCCESS,
  CREATE_ASSET_SPECS_REQUEST,
  CREATE_ASSET_SPECS_SUCCESS,
  CREATE_ASSET_SPECS_FAILURE
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

const assetSpecToCreate = {
  year_of_manufacture: 2013,
  processor_speed: 1.8,
  screen_size: 13,
  processor_type: 'Intel core i3',
  storage: 128,
  memory: 4
};

describe('Asset Specs Reducer', () => {
  it('should return default state if an action is not provided', () => {
    expect(assetSpecsReducer(oldState, {})).toEqual(oldState);
  });

  it('should handle LOAD_ASSET_SPECS_START', () => {
    action.type = LOAD_ASSET_SPECS_START;
    action.assetSpecs.results = assetSpecs;
    expect(assetSpecsReducer(oldState, action).isLoading).toEqual(true);
    expect(assetSpecsReducer(oldState, action).hasError).toEqual(false);
    expect(assetSpecsReducer(oldState, action).specs).toEqual([]);
  });

  it('should handle LOAD_ASSET_SPECS_SUCCESS', () => {
    action.type = LOAD_ASSET_SPECS_SUCCESS;
    action.assetSpecs.results = assetSpecs;
    expect(assetSpecsReducer(oldState, action).isLoading).toEqual(false);
    expect(assetSpecsReducer(oldState, action).hasError).toEqual(false);
    expect(assetSpecsReducer(oldState, action).specs)
      .toEqual(action.assetSpecs.results);
  });

  it('should handle LOAD_ASSET_SPECS_FAILURE', () => {
    action.type = LOAD_ASSET_SPECS_FAILURE;
    action.assetSpecs.results = assetSpecs;
    expect(assetSpecsReducer(oldState, action).isLoading).toEqual(false);
    expect(assetSpecsReducer(oldState, action).hasError).toEqual(true);
    expect(assetSpecsReducer(oldState, action).specs).toEqual([]);
  });

  it('should handle CREATE_ASSET_SPECS_REQUEST', () => {
    action.type = CREATE_ASSET_SPECS_REQUEST;
    expect(assetSpecsReducer(oldState, action).isLoading).toEqual(true);
    expect(assetSpecsReducer(oldState, action).hasError).toEqual(false);
    expect(assetSpecsReducer(oldState, action).specs).toEqual([]);
  });

  it('should handle CREATE_ASSET_SPECS_SUCCESS', () => {
    action.type = CREATE_ASSET_SPECS_SUCCESS;
    action.assetSpecs.specs = assetSpecToCreate;
    expect(assetSpecsReducer(oldState, action).isLoading).toEqual(false);
    expect(assetSpecsReducer(oldState, action).hasError).toEqual(false);
    expect(assetSpecsReducer(oldState, action).specs).toEqual(assetSpecToCreate);
  });

  it('should handle CREATE_ASSET_SPECS_FAILURE', () => {
    action.type = CREATE_ASSET_SPECS_FAILURE;
    expect(assetSpecsReducer(oldState, action).isLoading).toEqual(false);
    expect(assetSpecsReducer(oldState, action).hasError).toEqual(true);
    expect(assetSpecsReducer(oldState, action).specs).toEqual([]);
  });
});
