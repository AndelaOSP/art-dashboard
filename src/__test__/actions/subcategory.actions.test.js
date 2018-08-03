// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';

// actions
import {
  loadSubCategories,
  loadSubCategoriesDropdown,
  createSubCategory
} from '../../_actions/subcategory.actions';

// mock data
import subcategories from '../../_mock/subcategories';

const {
  LOAD_SUBCATEGORIES_SUCCESS,
  LOAD_SUBCATEGORIES_FAILURE,
  LOADING_SUBCATEGORIES,
  CREATE_SUBCATEGORY_SUCCESS,
  DROPDOWN_SUBCATEGORIES_SUCCESS
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Subcategory action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'asset-sub-categories';
  store = mockStore({});

  const subCategoryToCreate = {
    sub_category_name: 'Asus',
    asset_category: 1
  };
  afterEach(() => {
    store.clearActions();
  });

  const mockSubcategories = {
    results: subcategories
  };

  it('should dispatch LOAD_SUBCATEGORIES_SUCCESS when loadSubCategories called successfully', () => {
    mock.onGet().reply(200, mockSubcategories);
    return store.dispatch(loadSubCategories()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_SUBCATEGORIES);
      expect(store.getActions()[1].type).toEqual(LOAD_SUBCATEGORIES_SUCCESS);
    });
  });

  it('should dispatch CREATE_SUBCATEGORY_SUCCESS when createSubCategory called successfully', () => {
    mock.onPost(url, subCategoryToCreate).reply(201,
      subCategoryToCreate
    );
    return store.dispatch(createSubCategory(subCategoryToCreate)).then(() => {
      expect(store.getActions()[0].type).toEqual(CREATE_SUBCATEGORY_SUCCESS);
    });
  });

  it('should dispatch LOAD_SUBCATEGORIES_FEEDBACK_FAILURE when categories are not loaded', () => {
    mock.onGet().reply(401);
    return store.dispatch(loadSubCategories()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_SUBCATEGORIES);
      expect(store.getActions()[1].type).toEqual(LOAD_SUBCATEGORIES_FAILURE);
    });
  });

  it('should dispatch LOAD_SUBCATEGORIES_SUCCESS when loadSubCategoriesDropdown called successfully', () => {
    mock.onGet().reply(200, mockSubcategories);
    return store.dispatch(loadSubCategoriesDropdown(2)).then(() => {
      expect(store.getActions()[0].type).toEqual(DROPDOWN_SUBCATEGORIES_SUCCESS);
    });
  });
});
