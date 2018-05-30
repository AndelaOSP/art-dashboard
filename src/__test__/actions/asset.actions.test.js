// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';
const { CREATE_ASSET_SUCCESS, CREATE_ASSET_FAIL } = constants;

// actions
import { createAsset } from '../../_actions/asset.actions';

// mock data
import asset from '../../_mock/asset';

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Action tests', () => {
  const mock = new MockAdapter(axios);
  let url = 'https://my-json-server.typicode.com/HawiCaesar/jsonplaceholders-demo/categories';
  store = mockStore({});

  let assetToBeCreated = {
    "asset_code": "AND/HS/0909",
    "serial_number": "897832SWWS",
    "model_number": 6
  }

  let expectedActions = [
    {
      type: CREATE_ASSET_SUCCESS,
      payload: asset
    },
    {
      type: CREATE_ASSET_FAIL
    }
  ]

  it('should dispatch CREATE_ASSET_SUCCESS when createAsset is called successfully', () => {
    mock.onPost(url, assetToBeCreated).reply(201,
      asset
    );
    return store.dispatch(createAsset(assetToBeCreated)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedActions[0]);
    });
  });
});
