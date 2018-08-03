// third-party library
import expect from 'expect';
import constants from '../../_constants';

import categoryReducer from '../../_reducers/category.reducer';

import categories from '../../_mock/categories';

const {
  LOADING_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  DROPDOWN_CATEGORIES_SUCCESS
} = constants;

const initialState = {
  assetCategoriesCount: 0,
  categoriesDropdown: [],
  categories: [],
  isLoading: false
};

const action = { payload: {} };

describe('Category Reducer tests', () => {
  it('should return initial state when there is no action', () => {
    expect(categoryReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle LOAD_CATEGORIES_SUCCESS', () => {
    action.type = LOAD_CATEGORIES_SUCCESS;
    action.payload.results = categories;
    expect(categoryReducer(initialState, action).categories).toEqual(action.payload.results);
    expect(categoryReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOAD_CATEGORY_FAILURE', () => {
    action.type = LOAD_CATEGORY_FAILURE;
    expect(categoryReducer(initialState, action).categories).toEqual([]);
    expect(categoryReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOADING_CATEGORIES', () => {
    action.type = LOADING_CATEGORIES;
    expect(categoryReducer(initialState, action).categories).toEqual([]);
    expect(categoryReducer(initialState, action).isLoading).toEqual(true);
  });

  it('should handle CREATE_CATEGORY_SUCCESS', () => {
    const newAction = {};
    const newCategory = {
      category_name: 'Category 1',
      id: 4
    };
    const newState = {
      assetCategoriesCount: 3,
      categoriesDropdown: [],
      categories,
      isLoading: false
    };
    action.type = LOAD_CATEGORIES_SUCCESS;
    action.payload = {
      count: 3,
      results: categories
    };

    expect(categoryReducer(initialState, action)).toEqual(newState);

    categories.push(newCategory);
    newAction.type = CREATE_CATEGORY_SUCCESS;
    newAction.payload = newCategory;
    expect(categoryReducer(newState, newAction).categories).toEqual(categories);
  });

  it('should handle CREATE_ASSET_TYPE_FAILURE', () => {
    const newAction = {};
    const newState = {
      assetCategoriesCount: 3,
      categories,
      isLoading: false
    };
    action.type = LOAD_CATEGORIES_SUCCESS;
    action.payload = {
      count: 3,
      results: categories
    };
    expect(categoryReducer(initialState, action).categories).toEqual(newState.categories);

    newAction.type = CREATE_CATEGORY_FAILURE;
    newAction.payload = {
      count: 3,
      results: categories
    };
    expect(categoryReducer(newState, newAction).categories).toEqual(newAction.payload.results);
    expect(categoryReducer(newState, newAction).assetCategoriesCount)
      .toEqual(newAction.payload.count);
  });

  it('should handle DROPDOWN_CATEGORIES_SUCCESS', () => {
    action.type = DROPDOWN_CATEGORIES_SUCCESS;
    action.payload = categories;
    expect(categoryReducer(initialState, action).categoriesDropdown).toEqual(categories);
  });

  afterEach(() => {
    const action2 = { payload: {} };
    categoryReducer(initialState, action2);
  });
});
