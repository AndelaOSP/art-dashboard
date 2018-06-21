// third-party library
import expect from 'expect';
// reducer
import categoryReducer from '../../_reducers/category.reducer';

// initial mock State
import { mockStore } from '../../_mock/mockStore';

// mock data
import categories from '../../_mock/categories';

import { loadCategoriesSuccess, createCategorySuccess } from '../../_actions/category.actions';


describe('Category Reducer tests', () => {
  it('should handle LOAD_CATEGORIES_SUCCESS', () => {
    const action = loadCategoriesSuccess(categories);
    expect(mockStore.categories.length).toEqual(0);
    expect(categoryReducer(mockStore.categories, action)).toEqual(categories);
  });

  it('should handle CREATE_CATEGORY_SUCCESS', () => {
    const newCategory = { id: 4, category_name: 'Tesy Category' };
    const expected = [newCategory];
    const action = createCategorySuccess(newCategory);
    expect(mockStore.categories.length).toEqual(0);
    expect(categoryReducer(mockStore.categories, action)).toEqual(expected);
  });
});
