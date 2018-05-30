// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';
const { LOAD_SUBCATEGORIES_SUCCESS } = constants;

// actions
import { loadSubCategories } from '../../_actions/subcategory.actions';

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Subcategory action tests', () => {
  const mock = new MockAdapter(axios);
  let url = 'https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/subcategories';
  store = mockStore({});
  let expectedActions = [
    {
      type: LOAD_SUBCATEGORIES_SUCCESS
    }
  ];

  it('should dispatch LOAD_SUBCATEGORIES_SUCCESS when loadSubCategories called successfully', () => {
    mock.onGet(url).reply(200,
      [
        {
          "id": 1,
          "sub_category_name": "Computer Accessories",
          "asset_category": 1
        }
      ]
    );
    return store.dispatch(loadSubCategories()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
})
