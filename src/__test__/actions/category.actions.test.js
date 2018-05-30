// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';
const { LOAD_CATEGORIES_SUCCESS } = constants;

// actions
import { loadCategories } from '../../_actions/category.actions';

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Category action tests', () => {
  const mock = new MockAdapter(axios);
  let url = 'https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/categories';
  store = mockStore({});
  let expectedActions = [
    {
      type: LOAD_CATEGORIES_SUCCESS
    }
  ];

  it('should dispatch LOAD_CATEGORIES_SUCCESS when loadCategories called successfully', () => {
    mock.onGet(url).reply(200,
      [
        {
          "id": 1,
          "category_name": "Accessories"
        },
        {
          "id": 2,
          "category_name": "Electronics"
        }
      ]
    );
    return store.dispatch(loadCategories()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
});
