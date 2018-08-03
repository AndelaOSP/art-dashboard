import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

import constants from '../../_constants';

import { loadAssetModels } from '../../_actions/assetModels.action';

import assetModels from '../../_mock/assetModels';

const {
  LOADING_ASSET_MODELS,
  LOAD_ASSET_MODELS_SUCCESS,
  LOAD_ASSET_MODELS_FAILURE
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
const pageNumber = 1;
const limit = 5;
const url = `asset-models/?page=${pageNumber}&page_size=${limit}`;

afterEach(() => {
  store.clearActions();
});

describe('Asset Models action tests', () => {
  beforeEach(() => moxios.install());

  afterEach(() => {
    moxios.uninstall();
  });

  store = mockStore({});

  it('dispatches LOAD_ASSET_MODELS_SUCCESS when loadAssetModels is called successfully', () => {
    moxios.stubRequest(url, {
      status: 200,
      response: {
        results: assetModels
      }
    });

    return store.dispatch(loadAssetModels(pageNumber, limit)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_MODELS);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_MODELS_SUCCESS);
    });
  });

  it('dispatches LOAD_ASSET_MODELS_FAILURE when loadAssetModels is called unsuccessfully', () => {
    moxios.stubRequest(url, {
      status: 404,
      response: {}
    });

    return store.dispatch(loadAssetModels(pageNumber, limit)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_MODELS);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_MODELS_FAILURE);
    });
  });
});
