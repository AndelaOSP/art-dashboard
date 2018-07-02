// third-party libraries
import expect from 'expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

// constants
import constants from '../../_constants';

// actions
import { loadAssetTypes } from '../../_actions/assetTypes.actions';

const { LOAD_ASSET_TYPES_SUCCESS, LOAD_ASSET_TYPES_FAILURE, LOADING_ASSET_TYPES } = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

afterEach(() => {
  store.clearActions();
});

describe('Asset Types action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});
  it('should dispatch LOAD_ASSET_TYPES_SUCCESS when loadAssetTypeAction is called successfully', () => {
    mock.onGet('asset-types').reply(200);
    return store.dispatch(loadAssetTypes()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_TYPES);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_TYPES_SUCCESS);
    });
  });

  it('should dispatch LOAD_ASSET_TYPES_FAILURE when loadAssetTypeAction is called unsuccessfully', () => {
    mock.onGet('asset-types').reply(401);
    return store.dispatch(loadAssetTypes()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_TYPES);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_TYPES_FAILURE);
    });
  });
});
