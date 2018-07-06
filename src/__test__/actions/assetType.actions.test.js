// third-party libraries
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

// constants
import constants from '../../_constants';

// actions
import { loadAssetType } from '../../_actions/assetType.action';

// mock data
import assetType from '../../_mock/assetType';

const {
  LOAD_ASSET_TYPE_SUCCESS,
  LOAD_ASSET_TYPE_FAILURE,
  LOADING_ASSET_TYPE
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const id = 1;
let store;
const url2 = `/asset-types/${id}`;

afterEach(() => {
  store.clearActions();
});

describe('Asset Types action tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());
  store = mockStore({});
  it('dispatches LOAD_ASSET_TYPE_SUCCESS when loadAssetType Action is called successfully', () => {
    moxios.stubRequest(url2, {
      status: 200,
      response: {
        results: assetType
      }
    });
    return store.dispatch(loadAssetType(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_TYPE);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_TYPE_SUCCESS);
    });
  });

  it('dispatches LOAD_ASSET_TYPE_FAILURE when loadAssetType Action is called unsuccessfully', () => {
    moxios.stubRequest(url2, {
      status: 404,
      response: {}
    });
    return store.dispatch(loadAssetType(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_TYPE);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_TYPE_FAILURE);
    });
  });
});
