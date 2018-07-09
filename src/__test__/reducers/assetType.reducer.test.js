// third-party library
import expect from 'expect';
import constants from '../../_constants';
import assetTypeReducer from '../../_reducers/assetType.reducer';
import assetTypeMock from '../../_mock/assetType';

const {
  LOAD_ASSET_TYPE_SUCCESS,
  LOAD_ASSET_TYPE_FAILURE,
  LOADING_ASSET_TYPE
} = constants;

const initialState = {
  assetTypes: [],
  isLoading: false
};

const action = { payload: {} };

describe('Asset Type Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(assetTypeReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle LOAD_ASSET_TYPE_SUCCESS', () => {
    action.type = LOAD_ASSET_TYPE_SUCCESS;
    action.payload.results = assetTypeMock;
    expect(assetTypeReducer(initialState, action)
      .assetType.results).toEqual(action.payload.results);
    expect(assetTypeReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOAD_ASSET_TYPE_FAILURE', () => {
    action.type = LOAD_ASSET_TYPE_FAILURE;
    expect(assetTypeReducer(initialState, action).assetType).toEqual([]);
    expect(assetTypeReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOADING_ASSET_TYPE', () => {
    action.type = LOADING_ASSET_TYPE;
    expect(assetTypeReducer(initialState, action).assetType).toEqual([]);
    expect(assetTypeReducer(initialState, action).isLoading).toEqual(true);
  });
});
