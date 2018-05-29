// third-party library
import expect from 'expect';

// reducer
import subcategoryReducer from '../../_reducers/subcategory.reducer';

// initial mock State
import { mockStore } from '../../_mock/mockStore';

// mock data
import subcategories from '../../_mock/subcategories';

import { loadSubCategoriesSuccess } from '../../_actions/subcategory.actions';

describe('SubCategory reducer tests', () => {
  it('should handle LOAD_SUBCATEGORIES_SUCCESS', () => {
    let action = loadSubCategoriesSuccess(subcategories);
    expect(mockStore.subcategories.length).toEqual(0);
    expect(subcategoryReducer(mockStore.subcategories, action)).toEqual(subcategories);
  });
});
