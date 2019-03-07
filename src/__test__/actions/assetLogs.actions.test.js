import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import constants from '../../_constants';

import loadAssetLogs from '../../_actions/assetLogs.actions';

import assetLogs from '../../_mock/assetLogs';

const {
  LOAD_ASSET_LOGS_SUCCESS,
  LOAD_ASSET_LOGS_FAILURE,
  LOADING_ASSETS_LOGS
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
let mock;

describe('Asset Logs Actions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({});
  });

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOADING_ASSET_LOGS with isLoading false when done fetching asset logs', () => {
    mock.onGet().reply(200, assetLogs);
    return store.dispatch(loadAssetLogs())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          isLoading: false,
          type: LOADING_ASSETS_LOGS
        });
      });
  });

  it('should dispatch LOADING_ASSET_LOGS with isLoading true when fetching asset logs', () => {
    mock.onGet().reply(200, assetLogs);
    return store.dispatch(loadAssetLogs())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          isLoading: true,
          type: LOADING_ASSETS_LOGS
        });
      });
  });

  it('should dispatch LOAD_ASSET_LOGS_SUCCESS when loadAssetLogs called successfully', () => {
    mock.onGet().reply(200, assetLogs);
    return store.dispatch(loadAssetLogs())
      .then(() => {
        expect(store.getActions()).toContainEqual({
          payload: assetLogs,
          type: LOAD_ASSET_LOGS_SUCCESS
        });
      });
  });

  it('should dispatch LOAD_ASSET_LOGS_FAILURE when AssetLogs are not loaded', () => {
    mock.onGet().reply(401);
    return store.dispatch(loadAssetLogs()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 401',
        type: LOAD_ASSET_LOGS_FAILURE
      });
    });
  });
});
