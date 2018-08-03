
import expect from 'expect';
import subcategoryReducer from '../../_reducers/subcategory.reducer';
import subcategories from '../../_mock/subcategories';
import constants from '../../_constants';

const {
  LOAD_SUBCATEGORIES_SUCCESS,
  LOAD_SUBCATEGORIES_FAILURE,
  LOADING_SUBCATEGORIES,
  CREATE_SUBCATEGORY_SUCCESS,
  CREATE_SUBCATEGORY_FAILURE
} = constants;

const initialState = {
  subcategories: [],
  assetSubCategories: [],
  isLoading: false
};

const subCategoryToCreate = {
  sub_category_name: 'Asus',
  asset_category: 1
};

const action = { payload: {} };

describe('Sub Category Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(subcategoryReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle LOAD_SUBCATEGORIES_SUCCESS', () => {
    action.type = LOAD_SUBCATEGORIES_SUCCESS;
    action.payload.results = subcategories;
    expect(subcategoryReducer(initialState, action).assetSubCategories)
      .toEqual(action.payload.results);
    expect(subcategoryReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOAD_SUBCATEGORIES_FAILURE', () => {
    action.type = LOAD_SUBCATEGORIES_FAILURE;
    expect(subcategoryReducer(initialState, action).assetSubCategories).toEqual([]);
    expect(subcategoryReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOADING_SUBCATEGORIES', () => {
    action.type = LOADING_SUBCATEGORIES;
    expect(subcategoryReducer(initialState, action).assetSubCategories).toEqual([]);
    expect(subcategoryReducer(initialState, action).isLoading).toEqual(true);
  });

  it('should handle CREATE_SUBCATEGORY_SUCCESS', () => {
    action.type = CREATE_SUBCATEGORY_SUCCESS;
    action.payload = subCategoryToCreate;
    expect(subcategoryReducer(initialState, action).message).toEqual(subCategoryToCreate);
  });

  it('should handle CREATE_SUBCATEGORY_FAILURE', () => {
    action.type = CREATE_SUBCATEGORY_FAILURE;
    action.payload = 'Unable to Create Subcategory';
    expect(subcategoryReducer(initialState, action).errorMessage).toEqual(action.payload);
  });
});
