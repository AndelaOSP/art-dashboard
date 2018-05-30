// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';
const { LOAD_ASSET_MAKES_SUCCESS } = constants;

// actions
import { loadAssetMakes } from '../../_actions/assetMakes.actions';

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Makes action tests', () => {
  const mock = new MockAdapter(axios);
  let url = 'https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/makes';
  store = mockStore({});
  let expectedActions = [
    {
      type: LOAD_ASSET_MAKES_SUCCESS
    }
  ];

  it('should dispatch LOAD_ASSET_MAKES_SUCCESS when loadAssetMakes called successfully', () => {
    mock.onGet(url).reply(200,
      [
        {
          "id": 1,
          "make_label": "Mircosoft",
          "asset_type": "Headsets"
        }
      ]
    );
    return store.dispatch(loadAssetMakes()).then(() => {
      expect(store.getActions()[0].type).toEqual(expectedActions[0].type);
    });
  });
});
