// third-party library
import expect from 'expect';

// reducer
import categoryReducer from '../../_reducers/category.reducer';

// initial mock State
import { mockStore } from '../../_mock/mockStore';

// mock data
import categories from '../../_mock/categories';

import { loadCategoriesSuccess } from '../../_actions/category.actions';

describe('Category Reducer tests', () => {
  it('should handle CREATE_ASSET_SUCCESS', () => {
    let action = loadCategoriesSuccess(categories);
    expect(mockStore.categories.length).toEqual(0);
    expect(categoryReducer(mockStore.categories, action)).toEqual(categories);
  });
});
