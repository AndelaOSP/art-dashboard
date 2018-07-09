// third-party library
import expect from 'expect';
import constants from '../../_constants';
import assetTypesReducer from '../../_reducers/assetTypes.reducer';
import assetTypesMock from '../../_mock/assetTypes';

const {
  LOAD_ASSET_TYPES_SUCCESS,
  LOAD_ASSET_TYPES_FAILURE,
  LOADING_ASSET_TYPES,
  CREATE_ASSET_TYPE_SUCCESS,
  CREATE_ASSET_TYPE_FAILURE,
  LOAD_DROPDOWN_ASSET_TYPES_SUCCESS,
  LOAD_DROPDOWN_ASSET_TYPES_FAILURE
} = constants;

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

  it('should handle CREATE_ASSET_TYPE_SUCCESS', () => {
    const newAction = {};
    const newAssetType = {
      asset_sub_category: 3,
      asset_type: 'Adapters',
      id: 3
    };
    const newState = {
      assetTypes: assetTypesMock,
      isLoading: false
    };
    action.type = LOAD_ASSET_TYPES_SUCCESS;
    action.payload = { results: assetTypesMock };
    expect(assetTypesReducer(initialState, action)).toEqual(newState);

    assetTypesMock.push(newAssetType);
    newAction.type = CREATE_ASSET_TYPE_SUCCESS;
    newAction.payload = { results: assetTypesMock };
    expect(assetTypesReducer(newState, newAction).assetTypes)
      .toEqual(newAction.payload.results);
  });

  it('should handle CREATE_ASSET_TYPE_FAILURE', () => {
    const newAction = {};
    const newState = {
      assetTypes: assetTypesMock,
      isLoading: false
    };
    action.type = LOAD_ASSET_TYPES_SUCCESS;
    action.payload = { results: assetTypesMock };
    expect(assetTypesReducer(initialState, action)).toEqual(newState);

    newAction.type = CREATE_ASSET_TYPE_FAILURE;
    newAction.payload = assetTypesMock;
    expect(assetTypesReducer(newState, newAction).assetTypes).toEqual(newAction.payload);
  });

  it('should handle LOAD_DROPDOWN_ASSET_TYPES_SUCCESS', () => {
    action.type = LOAD_DROPDOWN_ASSET_TYPES_SUCCESS;
    action.payload = assetTypesMock;
    expect(assetTypesReducer(initialState, action).assetTypes).toEqual(action.payload);
  });

  it('should handle LOAD_DROPDOWN_ASSET_TYPES_FAILURE', () => {
    action.type = LOAD_DROPDOWN_ASSET_TYPES_FAILURE;
    action.payload = assetTypesMock;
    expect(assetTypesReducer(initialState, action).assetTypes).toEqual([]);
  });
});
