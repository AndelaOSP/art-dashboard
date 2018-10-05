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
  CREATE_SUBCATEGORY_FAILURE,
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

  it('should dispatch LOADING_SUBCATEGORIES with isLoading true when fetching SubCategories', () => {
    mock.onGet().reply(200, mockSubcategories);
    return store.dispatch(loadSubCategories())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          isLoading: true,
          type: LOADING_SUBCATEGORIES
        });
      });
  });

  it('should dispatch LOADING_SUBCATEGORIES with isLoading false when done fetching SubCategories', () => {
    mock.onGet().reply(200, mockSubcategories);
    return store.dispatch(loadSubCategories())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          isLoading: false,
          type: LOADING_SUBCATEGORIES
        });
      });
  });

  it('should dispatch LOAD_SUBCATEGORIES_SUCCESS when loadSubCategories is called successfully', () => {
    mock.onGet().reply(200, mockSubcategories);
    return store.dispatch(loadSubCategories())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          payload: mockSubcategories,
          type: LOAD_SUBCATEGORIES_SUCCESS
        });
      });
  });

  it('should dispatch CREATE_SUBCATEGORY_SUCCESS when createSubCategory is called successfully', () => {
    mock.onPost(url, subCategoryToCreate).reply(201,
      subCategoryToCreate
    );
    return store.dispatch(createSubCategory(subCategoryToCreate))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          payload: subCategoryToCreate,
          type: CREATE_SUBCATEGORY_SUCCESS
        });
      });
  });

  it('should dispatch CREATE_SUBCATEGORY_FAILURE when createSubCategory is called unsuccessfully', () => {
    mock.onPost(url, subCategoryToCreate).reply(401,
      subCategoryToCreate
    );
    return store.dispatch(createSubCategory(subCategoryToCreate))
      .then(() => {
        expect(store.getActions()).toContainEqual({
          payload: new Error('Request failed with status code 401'),
          type: CREATE_SUBCATEGORY_FAILURE
        });
      });
  });

  it('should dispatch LOAD_SUBCATEGORIES_FAILURE when subcategories are not loaded', () => {
    mock.onGet().reply(401);
    return store.dispatch(loadSubCategories())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          payload: 'Request failed with status code 401',
          type: LOAD_SUBCATEGORIES_FAILURE
        });
      });
  });

  it('should dispatch LOADING_SUBCATEGORIES when loadSubCategoriesDropdown is called', () => {
    mock.onGet().reply(200, mockSubcategories);
    return store.dispatch(loadSubCategoriesDropdown())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          type: LOADING_SUBCATEGORIES,
          isLoading: true
        });
      });
  });

  it('should dispatch DROPDOWN_SUBCATEGORIES_SUCCESS when loadSubCategoriesDropdown is called successfully', () => {
    mock.onGet().reply(200, mockSubcategories);
    return store.dispatch(loadSubCategoriesDropdown())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          payload: mockSubcategories,
          type: DROPDOWN_SUBCATEGORIES_SUCCESS
        });
      });
  });

  it('should dispatch LOAD_SUBCATEGORIES_FAILURE when loadSubCategoriesDropdown is called unsuccessfully', () => {
    mock.onGet().reply(401, mockSubcategories);
    return store.dispatch(loadSubCategoriesDropdown())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          payload: 'Request failed with status code 401',
          type: LOAD_SUBCATEGORIES_FAILURE
        });
      });
  });
});
