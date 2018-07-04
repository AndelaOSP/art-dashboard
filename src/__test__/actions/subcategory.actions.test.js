// third-party libraries
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

// constants
import constants from '../../_constants';

// actions
import { loadSubCategories, createSubCategory } from '../../_actions/subcategory.actions';

const {
  LOAD_SUBCATEGORIES_SUCCESS,
  LOAD_SUBCATEGORIES_FAILURE,
  LOADING_SUBCATEGORIES,
  CREATE_SUBCATEGORY_SUCCESS
} = constants;

const { LOAD_SUBCATEGORIES_SUCCESS, LOAD_SUBCATEGORIES_FAILURE } = constants;

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

  it('should dispatch LOAD_SUBCATEGORIES_SUCCESS when loadSubCategories called successfully', () => {
    mock.onGet().reply(200,
      [
        {
          id: 2,
          sub_category_name: 'Computer Accessories',
          asset_category: 1
        }
      ]
    );
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
});
