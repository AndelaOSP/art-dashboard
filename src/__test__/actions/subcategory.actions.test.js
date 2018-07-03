// third-party libraries
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

// constants
import constants from '../../_constants';

// actions
import { loadSubCategories, createSubCategory } from '../../_actions/subcategory.actions';

const { LOAD_SUBCATEGORIES_SUCCESS } = constants;

const { LOAD_SUBCATEGORIES_SUCCESS } = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Subcategory action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'asset-sub-categories';
  store = mockStore({});
  const expectedActions = [
    {
      type: LOAD_SUBCATEGORIES_SUCCESS
    }
  ];

  const subCategoryToCreate = {
    sub_category_name: 'Asus',
    asset_category: 1
  };

  it('should dispatch LOAD_SUBCATEGORIES_SUCCESS when loadSubCategories called successfully', () => {
    mock.onGet(url).reply(200,
      [
        {
          id: 2,
          sub_category_name: 'Computer Accessories',
          asset_category: 1
        }
      ]
    );
    return store.dispatch(loadSubCategories()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });

  it('should dispatch CREATE_SUBCATEGORY_SUCCESS when createSubCategory called successfully', () => {
    mock.onPost(url, subCategoryToCreate).reply(201,
      subCategoryToCreate
    );
    return store.dispatch(createSubCategory()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
});
