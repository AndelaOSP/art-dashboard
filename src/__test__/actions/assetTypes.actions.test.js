// third-party libraries
import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';

// constants
import constants from '../../_constants';

// actions
import { loadAssetTypes, createAssetType, loadDropdownAssetTypes } from '../../_actions/assetTypes.actions';

// mock data
import assetTypes from '../../_mock/assetTypes';

const {
  LOAD_ASSET_TYPES_SUCCESS,
  LOAD_ASSET_TYPES_FAILURE,
  LOADING_ASSET_TYPES,
  CREATE_ASSET_TYPE_SUCCESS,
  CREATE_ASSET_TYPE_FAILURE,
  LOAD_DROPDOWN_ASSET_TYPES_SUCCESS,
  LOAD_DROPDOWN_ASSET_TYPES_FAILURE
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
const url = 'asset-types';
const url1 = 'asset-types/?paginate=false';
const url2 = `asset-types?page=${1}&page_size=${10}`;

afterEach(() => {
  store.clearActions();
});

describe('Asset Types action tests', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  store = mockStore({});
  it('dispatches LOAD_ASSET_TYPES_SUCCESS when loadAssetTypeAction is called successfully', () => {
    moxios.stubRequest(url2, {
      status: 200,
      response: {
        results: assetTypes
      }
    });
    return store.dispatch(loadAssetTypes(1, 10)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_TYPES);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_TYPES_SUCCESS);
    });
  });

  it('dispatches LOAD_ASSET_TYPES_FAILURE when loadAssetTypeAction is called unsuccessfully', () => {
    moxios.stubRequest(url2, {
      status: 404,
      response: {}
    });
    return store.dispatch(loadAssetTypes(1, 10)).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_TYPES);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_TYPES_FAILURE);
    });
  });

  it('dispatches CREATE_ASSET_TYPE_SUCCESS when createAssetType is called successfully', () => {
    moxios.stubRequest(url, {
      status: 201,
      response: assetTypes[0]
    });
    return store.dispatch(createAssetType(assetTypes[0])).then(() => {
      expect(store.getActions()[0].type).toEqual(CREATE_ASSET_TYPE_SUCCESS);
    });
  });

  it('dispatches CREATE_ASSET_TYPE_FAILURE when createAssetType fails', () => {
    moxios.stubRequest(url, {
      status: 401,
      response: {}
    });
    return store.dispatch(createAssetType(assetTypes[0])).then(() => {
      expect(store.getActions()[0].type).toEqual(CREATE_ASSET_TYPE_FAILURE);
    });
  });

  it('dispatches LOAD_DROPDOWN_ASSET_TYPES_SUCCESS when loadDropdownAssetTypes is called successfully', () => {
    moxios.stubRequest(url1, {
      status: 200,
      response: {
        results: assetTypes,
        count: assetTypes.length
      }
    });
    return store.dispatch(loadDropdownAssetTypes()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOAD_DROPDOWN_ASSET_TYPES_SUCCESS);
    });
  });

  it('dispatches LOAD_DROPDOWN_ASSET_TYPES_FAILURE when loadDropdownAssetTypes gets error', () => {
    moxios.stubRequest(url1, {
      status: 401,
      response: {}
    });
    return store.dispatch(loadDropdownAssetTypes()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOAD_DROPDOWN_ASSET_TYPES_FAILURE);
    });
  });
});
