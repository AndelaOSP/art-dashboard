// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// constants
import constants from '../../_constants';

// actions
import {
  loadCategoriesDropdown,
  createCategory,
  loadCategories
} from '../../_actions/category.actions';

// mock data
import categories from '../../_mock/categories';

const {
  LOADING_CATEGORIES,
  LOAD_CATEGORY_FAILURE,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAILURE,
  DROPDOWN_CATEGORIES_SUCCESS,
  LOAD_CATEGORIES_SUCCESS
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
const url = 'asset-categories';
const url2 = 'asset-categories/?paginate=false';
const url3 = 'asset-categories/?page=1&page_size=10';

describe('Category action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch DROPDOWN_CATEGORIES_SUCCESS when loadCategoriesDropdown is called', () => {
    mock.onGet(url2).reply(200, {
      response: {
        results: categories
      }
    });

    return store.dispatch(loadCategoriesDropdown()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOADING_CATEGORIES
      });
    });
  });

  it('should dispatch DROPDOWN_CATEGORIES_SUCCESS when loadCategoriesDropdown is called successfully', () => {
    mock.onGet(url2).reply(200, {
      response: {
        results: categories
      }
    });

    return store.dispatch(loadCategoriesDropdown()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: DROPDOWN_CATEGORIES_SUCCESS,
        payload: { response: { results: categories } }
      });
    });
  });

  it('dispatches LOAD_CATEGORY_FAILURE when loadCategoriesDropdown is called unsuccessfully', () => {
    mock.onGet(url2).reply(404, {
      response: {}
    });

    return store.dispatch(loadCategoriesDropdown(1)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_CATEGORY_FAILURE,
        payload: new Error('Request failed with status code 404')
      });
    });
  });

  it('dispatches CREATE_CATEGORY_SUCCESS when createCategory is called successfully', () => {
    mock.onPost(url).reply(201, { response: categories[0] });

    return store.dispatch(createCategory(categories[0])).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_CATEGORY_SUCCESS,
        payload: { response: categories[0] }
      });
    });
  });

  it('dispatches CREATE_CATEGORY_FAILURE when createCategory fails', () => {
    mock.onPost(url).reply(401, { response: {} });

    return store.dispatch(createCategory(categories[0])).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_CATEGORY_FAILURE,
        payload: new Error('Request failed with status code 401')
      });
    });
  });

  it('should dispatch LOADING_CATEGORIES when loadCategories is called', () => {
    mock.onGet(url3).reply(200, {
      response: {
        results: categories
      }
    });

    return store.dispatch(loadCategories(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOADING_CATEGORIES
      });
    });
  });

  it('should dispatch LOAD_CATEGORIES_SUCCESS when loadCategories is called successfully', () => {
    mock.onGet(url3).reply(200, {
      response: {
        results: categories
      }
    });

    return store.dispatch(loadCategories(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_CATEGORIES_SUCCESS,
        payload: { response: { results: categories } }
      });
    });
  });

  it('should dispatch LOAD_CATEGORY_FAILURE when loadCategories is called unsuccessfully', () => {
    mock.onGet(url3).reply(404, {
      response: {}
    });

    return store.dispatch(loadCategories(1, 10)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_CATEGORY_FAILURE,
        payload: new Error('Request failed with status code 404')
      });
    });
  });
});
