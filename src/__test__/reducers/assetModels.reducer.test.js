import expect from 'expect';
import constants from '../../_constants';
import assetModelsReducer from '../../_reducers/assetModels.reducer';
import assetModelsMock from '../../_mock/assetModels';

const {
  LOADING_ASSET_MODELS,
  LOAD_ASSET_MODELS_SUCCESS,
  LOAD_ASSET_MODELS_FAILURE
} = constants;

const initialState = {
  assetModels: [],
  isLoading: false
};

const action = { payload: {} };

describe('Asset Models Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(assetModelsReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle LOADING_ASSET_MODELS', () => {
    action.type = LOADING_ASSET_MODELS;
    expect(assetModelsReducer(initialState, action).assetModels).toEqual([]);
    expect(assetModelsReducer(initialState, action).isLoading).toEqual(true);
  });

  it('should handle LOAD_ASSET_TYPES_SUCCESS', () => {
    action.type = LOAD_ASSET_MODELS_SUCCESS;
    action.payload.results = assetModelsMock;
    expect(assetModelsReducer(initialState, action).assetModels).toEqual(action.payload.results);
    expect(assetModelsReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOAD_ASSET_TYPES_FAILURE', () => {
    action.type = LOAD_ASSET_MODELS_FAILURE;
    expect(assetModelsReducer(initialState, action).assetModels).toEqual([]);
    expect(assetModelsReducer(initialState, action).isLoading).toEqual(false);
  });
});
