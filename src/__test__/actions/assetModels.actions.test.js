import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
  loadAssetModels,
  loadAllAssetModels
} from '../../_actions/assetModels.action';

import assetModels from '../../_mock/assetModels';
import { modelNumbers } from '../../_mock/modelNumbers';

import constants from '../../_constants';

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

describe('Asset Models action tests', () => {
  const mock = new MockAdapter(axios);

  const pageNumber = 1;
  const limit = 5;
  const url = `asset-models/?page=${pageNumber}&page_size=${limit}`;
  const urlAll = 'asset-models/?paginate=false';
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('dispatches LOADING_ASSET_MODELS when loadAssetModels is called', () => {
    mock.onGet(url).reply(200, assetModels);
    return store.dispatch(loadAssetModels(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOADING_ASSET_MODELS
      });
    });
  });

  it('dispatches LOAD_ASSET_MODELS_SUCCESS when loadAssetModels is called successfully', () => {
    mock.onGet(url).reply(200, assetModels);
    return store.dispatch(loadAssetModels(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_ASSET_MODELS_SUCCESS,
        payload: assetModels
      });
    });
  });

  it('dispatches LOAD_ASSET_MODELS_FAILURE when loadAssetModels is called unsuccessfully', () => {
    mock.onGet(url).reply(404, {});
    return store.dispatch(loadAssetModels(pageNumber, limit)).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: new Error('Request failed with status code 404'),
        type: LOAD_ASSET_MODELS_FAILURE
      });
    });
  });

  it('dispatches LOADING_ALL_ASSET_MODELS when loadAllAssetModels is called', () => {
    mock.onGet(urlAll).reply(200, modelNumbers);
    return store.dispatch(loadAllAssetModels()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOADING_ALL_ASSET_MODELS
      });
    });
  });

  it('dispatches LOAD_ALL_ASSET_MODELS_SUCCESS when loadAllAssetModels is called successfully', () => {
    mock.onGet(urlAll).reply(200, modelNumbers);
    return store.dispatch(loadAllAssetModels()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: LOAD_ALL_ASSET_MODELS_SUCCESS,
        payload: modelNumbers
      });
    });
  });

  it('dispatches LOAD_ALL_ASSET_MODELS_FAILURE when loadAllAssetModels is called unsuccessfully', () => {
    mock.onGet(urlAll).reply(404, {});
    return store.dispatch(loadAllAssetModels()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: new Error('Request failed with status code 404'),
        type: LOAD_ALL_ASSET_MODELS_FAILURE
      });
    });
  });
});
