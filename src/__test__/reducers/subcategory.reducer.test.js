// third-party library
import expect from 'expect';

// reducer
import subcategoryReducer from '../../_reducers/subcategory.reducer';

// initial mock State
import { mockStore } from '../../_mock/mockStore';

// mock data
import subcategories from '../../_mock/subcategories';

import {
  loadSubCategoriesSuccess,
  loadSubCategoriesFailure,
  createSubCategorySuccess,
  createSubCategoryFailure
} from '../../_actions/subcategory.actions';

describe('SubCategory reducer tests', () => {
  const subCategoryToCreate = {
    results: [
      {
        sub_category_name: 'Asus',
        asset_category: 1
      }
    ]
  };

  const error = 'Error';

  it('should handle LOAD_SUBCATEGORIES_SUCCESS', () => {
    const action = loadSubCategoriesSuccess({ results: subcategories });
    expect(mockStore.subcategories.length).toEqual(0);
    expect(subcategoryReducer(mockStore.subcategories, action)).toEqual(subcategories);
  });

  it('should handle LOAD_SUBCATEGORIES_FAILURE', () => {
    const action = loadSubCategoriesFailure(error);
    expect(subcategoryReducer(mockStore.subcategories, action)).toEqual({ errorMessage: error });
  });

  it('should handle CREATE_SUBCATEGORY_SUCCESS', () => {
    const action = createSubCategorySuccess(subCategoryToCreate);
    expect(subcategoryReducer(mockStore.subcategories, action)).toEqual([subCategoryToCreate]);
  });

  it('should handle CREATE_SUBCATEGORY_FAILURE', () => {
    const action = createSubCategoryFailure(error);
    expect(subcategoryReducer(mockStore.subcategories, action)).toEqual({ errorMessage: error });
  });
});
