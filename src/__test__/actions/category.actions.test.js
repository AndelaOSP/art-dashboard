// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';

// actions
import { loadCategories, createCategory } from '../../_actions/category.actions';

const { LOAD_CATEGORIES_SUCCESS } = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Category action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'categories';
  store = mockStore({});
  const expectedActions = [
    {
      type: LOAD_CATEGORIES_SUCCESS
    }
  ];

  it('should dispatch LOAD_CATEGORIES_SUCCESS when loadCategories called successfully', () => {
    mock.onGet(url).reply(200,
      [
        {
          id: 1,
          category_name: 'Accessories'
        },
        {
          id: 2,
          category_name: 'Electronics'
        }
      ]
    );
    return store.dispatch(loadCategories()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });


  it('should dispatch CREATE_CATEGORY_SUCCESS when createCategory is called successfully', () => {
    store = mockStore({ categories: [] });
    const newCategory = {
      category_name: 'Tesy Category',
    };

    const expectedAction = [{
      type: 'CREATE_CATEGORY_SUCCESS',
      payload: { id: 4, category_name: 'Tesy Category' }
    }];

    mock
      .onPost(url, newCategory)
      .reply(201,
        {
          id: 4,
          category_name: 'Tesy Category'
        }
      );
    return store.dispatch(createCategory(newCategory)).then(() => {
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});

