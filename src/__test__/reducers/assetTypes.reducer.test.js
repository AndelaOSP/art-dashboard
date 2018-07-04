// third-party library
import expect from 'expect';
import constants from '../../_constants';
import assetTypesReducer from '../../_reducers/assetTypes.reducer';
import assetTypesMock from '../../_mock/assetTypes';

const { LOAD_ASSET_TYPES_SUCCESS, LOAD_ASSET_TYPES_FAILURE, LOADING_ASSET_TYPES } = constants;

const initialState = {
  assetTypes: [],
  isLoading: false
};

const action = { payload: {} };

describe('Asset Type Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(assetTypesReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle LOAD_ASSET_TYPES_SUCCESS', () => {
    action.type = LOAD_ASSET_TYPES_SUCCESS;
    action.payload.results = assetTypesMock;
    expect(assetTypesReducer(initialState, action).assetTypes).toEqual(action.payload.results);
    expect(assetTypesReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOAD_ASSET_TYPES_FAILURE', () => {
    action.type = LOAD_ASSET_TYPES_FAILURE;
    expect(assetTypesReducer(initialState, action).assetTypes).toEqual([]);
    expect(assetTypesReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOADING_ASSET_TYPES', () => {
    action.type = LOADING_ASSET_TYPES;
    expect(assetTypesReducer(initialState, action).assetTypes).toEqual([]);
    expect(assetTypesReducer(initialState, action).isLoading).toEqual(true);
  });
});
