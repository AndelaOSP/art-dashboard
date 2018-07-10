import expect from 'expect';
import assetConditionReducer from '../../_reducers/assetCondition.reducer';
import subcategories from '../../_mock/subcategories';
import constants from '../../_constants';

const {
  LOADING_ASSET_CONDITION,
  LOAD_ASSET_CONDITION_SUCCESS,
  LOAD_ASSET_CONDITION_FAILURE
} = constants;

const initialState = {
  assetConditionsList: [],
  assetConditionsCount: [],
  isLoading: false
};

const action = { payload: {} };

describe('Asset Condition Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(assetConditionReducer(initialState, action))
      .toEqual(initialState);
  });

  it('should handle LOADING_ASSET_CONDITION', () => {
    action.type = LOADING_ASSET_CONDITION;
    expect(assetConditionReducer(initialState, action).assetConditionsList)
      .toEqual([]);
    expect(assetConditionReducer(initialState, action).isLoading)
      .toEqual(true);
  });

  it('should handle LOAD_ASSET_CONDITION_SUCCESS', () => {
    action.type = LOAD_ASSET_CONDITION_SUCCESS;
    action.payload.results = subcategories;
    expect(assetConditionReducer(initialState, action).assetConditionsList)
      .toEqual(action.payload.results);
    expect(assetConditionReducer(initialState, action).isLoading)
      .toEqual(false);
  });

  it('should handle LOAD_ASSET_CONDITION_FAILURE', () => {
    action.type = LOAD_ASSET_CONDITION_FAILURE;
    expect(assetConditionReducer(initialState, action).assetConditionsList)
      .toEqual([]);
    expect(assetConditionReducer(initialState, action).isLoading)
      .toEqual(false);
  });
});
