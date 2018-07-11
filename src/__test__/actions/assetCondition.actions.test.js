import expect from 'expect';
import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import constants from '../../_constants';

import {
  loadAssetConditions
} from '../../_actions/assetCondition.actions';

import assetConditions from '../../_mock/assetConditions';

const {
  LOADING_ASSET_CONDITION,
  LOAD_ASSET_CONDITION_SUCCESS,
  LOAD_ASSET_CONDITION_FAILURE
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
const url = 'asset-condition/?page=1';

afterEach(() => {
  store.clearActions();
});

describe('Asset Condition action tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  store = mockStore({});

  it('dispatches LOAD_ASSET_CONDITION_SUCCESS when loadAssetConditions is called successfully', () => {
    moxios.stubRequest(url, {
      status: 200,
      response: {
        results: assetConditions
      }
    });
    return store.dispatch(loadAssetConditions(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_CONDITION);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_CONDITION_SUCCESS);
    });
  });

  it('dispatches LOAD_ASSET_CONDITION_FAILURE when loadAssetConditions is called unsuccessfully', () => {
    moxios.stubRequest(url, {
      status: 404,
      response: {}
    });
    return store.dispatch(loadAssetConditions(1)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_CONDITION);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_CONDITION_FAILURE);
    });
  });
});
