// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';
const { LOAD_ASSET_TYPES_SUCCESS } = constants;

// actions
import { loadAssetTypes } from '../../_actions/assetTypes.actions';

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Types action tests', () => {
  const mock = new MockAdapter(axios);
  let url = 'https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/types';
  store = mockStore({});
  let expectedActions = [
    {
      type: LOAD_ASSET_TYPES_SUCCESS
    }
  ];

  it('should dispatch LOAD_ASSET_TYPES_SUCCESS when loadAssetTypes called successfully', () => {
    mock.onGet(url).reply(200,
      [
        {
          "id": 1,
          "asset_type": "Headsets",
          "asset_sub_category": 1,
        }
      ]
    );
    return store.dispatch(loadAssetTypes()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
})
