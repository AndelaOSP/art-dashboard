// third-party libraries
import expect from 'expect';

// reducer
import loadAssetCategoriesReducer from '../../_reducers/assetCategories.reducer';

// constants
import constants from '../../_constants';

// mock data
import assetCategories from '../../_mock/assetCategories';

const {
  LOAD_ASSET_CATEGORIES_START,
  LOAD_ASSET_CATEGORIES_SUCCESS,
  LOAD_ASSET_CATEGORIES_FAILURE
} = constants;

const oldState = {
  categories: [],
  assetCategoriesCount: 0,
  isLoading: false,
  hasError: false,
  previousUrl: '',
  nextUrl: ''
};

const action = { assetCategories: {} };

describe('Asset Categories Reducer', () => {
  it('should return the default state when an action is not provided', () => {
    expect(loadAssetCategoriesReducer(oldState, {})).toEqual(oldState);
  });

  it('should handle LOAD_ASSET_CATEGORIES_START', () => {
    action.type = LOAD_ASSET_CATEGORIES_START;
    action.assetCategories.results = assetCategories;
    expect(loadAssetCategoriesReducer(oldState, action).isLoading).toEqual(true);
    expect(loadAssetCategoriesReducer(oldState, action).hasError).toEqual(false);
    expect(loadAssetCategoriesReducer(oldState, action).categories).toEqual([]);
  });

  it('should handle LOAD_ASSET_CATEGORIES_SUCCESS', () => {
    action.type = LOAD_ASSET_CATEGORIES_SUCCESS;
    action.assetCategories.results = assetCategories;
    expect(loadAssetCategoriesReducer(oldState, action).isLoading).toEqual(false);
    expect(loadAssetCategoriesReducer(oldState, action).hasError).toEqual(false);
    expect(loadAssetCategoriesReducer(oldState, action).categories)
      .toEqual(action.assetCategories.results);
  });

  it('should handle LOAD_ASSET_CATEGORIES_FAILURE', () => {
    action.type = LOAD_ASSET_CATEGORIES_FAILURE;
    action.assetCategories.results = assetCategories;
    expect(loadAssetCategoriesReducer(oldState, action).isLoading).toEqual(false);
    expect(loadAssetCategoriesReducer(oldState, action).hasError).toEqual(true);
    expect(loadAssetCategoriesReducer(oldState, action).categories).toEqual([]);
  });
});
