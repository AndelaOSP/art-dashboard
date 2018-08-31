import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

import constants from '../../_constants';

import { loadAssetModels, loadAllAssetModels } from '../../_actions/assetModels.action';

import assetModels from '../../_mock/assetModels';

const {
  LOADING_ASSET_MODELS,
  LOAD_ASSET_MODELS_SUCCESS,
  LOAD_ASSET_MODELS_FAILURE,
  LOADING_ALL_ASSET_MODELS,
  LOAD_ALL_ASSET_MODELS_SUCCESS,
  LOAD_ALL_ASSET_MODELS_FAILURE
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
const pageNumber = 1;
const limit = 5;
const url = `asset-models/?page=${pageNumber}&page_size=${limit}`;
const urlAll = 'asset-models/?paginate=false';

afterEach(() => store.clearActions());

describe('Asset Models action tests', () => {
  beforeEach(() => moxios.install());

  afterEach(() => moxios.uninstall());

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

describe('All Asset Models tests', () => {
  beforeEach(() => moxios.install());

  afterEach(() => moxios.uninstall());

  store = mockStore({});

  it('dispatches LOAD_ALL_ASSET_MODELS_SUCCESS when loadAllAssetModels is called successfully', () => {
    moxios.stubRequest(urlAll, {
      status: 200,
      response: {
        results: assetModels
      }
    });

    return store.dispatch(loadAllAssetModels()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ALL_ASSET_MODELS);
      expect(store.getActions()[1].type).toEqual(LOAD_ALL_ASSET_MODELS_SUCCESS);
    });
  });

  it('dispatches LOAD_ALL_ASSET_MODELS_FAILURE when loadAllAssetModels is called unsuccessfully', () => {
    moxios.stubRequest(urlAll, {
      status: 404,
      response: {}
    });

    return store.dispatch(loadAllAssetModels()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ALL_ASSET_MODELS);
      expect(store.getActions()[1].type).toEqual(LOAD_ALL_ASSET_MODELS_FAILURE);
    });
  });
});
