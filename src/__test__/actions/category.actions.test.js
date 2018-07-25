// third-party libraries
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

// constants
import constants from '../../_constants';

// actions
import { loadCategoriesDropdown, createCategory } from '../../_actions/category.actions';

// mock data
import { categories } from '../../_mock/categories';

const {
  LOADING_CATEGORIES,
  LOAD_CATEGORIES_SUCCESS,
  LOAD_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
const url = 'asset-categories';
const url2 = 'asset-categories/?paginate=false';

afterEach(() => {
  store.clearActions();
});

describe('Category action tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  store = mockStore({});

  it('should dispatch LOAD_CATEGORIES_SUCCESS when loadCategoriesDropdown called successfully', () => {
    moxios.stubRequest(url2, {
      status: 200,
      response: {
        results: categories
      }
    });

    return store.dispatch(loadCategoriesDropdown(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_CATEGORIES);
      expect(store.getActions()[1].type).toEqual(LOAD_CATEGORIES_SUCCESS);
    });
  });

  it('dispatches LOAD_CATEGORY_FAILURE when loadCategoriesDropdown is called unsuccessfully', () => {
    moxios.stubRequest(url2, {
      status: 404,
      response: {}
    });

    return store.dispatch(loadCategoriesDropdown(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_CATEGORIES);
      expect(store.getActions()[1].type).toEqual(LOAD_CATEGORY_FAILURE);
    });
  });

  it('dispatches CREATE_CATEGORY_SUCCESS when createCategory is called successfully', () => {
    moxios.stubRequest(url, {
      status: 201,
      response: categories[0]
    });

    return store.dispatch(createCategory(categories[0])).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_CATEGORIES);
      expect(store.getActions()[1].type).toEqual(CREATE_CATEGORY_SUCCESS);
    });
  });

  it('dispatches CREATE_CATEGORY_FAILURE when createCategory fails', () => {
    moxios.stubRequest(url, {
      status: 401,
      response: {}
    });

    return store.dispatch(createCategory(categories[0])).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_CATEGORIES);
      expect(store.getActions()[1].type).toEqual(CREATE_CATEGORY_FAILURE);
    });
  });
});
