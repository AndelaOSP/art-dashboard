// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// actions
import {
  loadAssetMakes,
  addAssetMakes,
  loadAssetMakesDropdown
} from '../../_actions/assetMakes.actions';

// constants
import constants from '../../_constants';
import assetMakes from '../../_mock/assetMakes';

const {
  LOAD_ASSET_MAKES_SUCCESS,
  LOAD_ASSET_MAKES_FAILURE,
  LOADING_ASSET_MAKES,
  DROPDOWN_ASSET_MAKES_SUCCESS
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Makes action tests', () => {
  const mock = new MockAdapter(axios);
  const url = 'asset-makes';
  store = mockStore({});

  const mockAssetMakes = {
    results: assetMakes
  };

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_ASSET_MAKES_SUCCESS when loadAssetMakes called successfully', () => {
    mock.onGet().reply(200, mockAssetMakes);
    return store.dispatch(loadAssetMakes()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_MAKES);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_MAKES_SUCCESS);
    });
  });

  it('should dispatch DROPDOWN_ASSET_MAKES_SUCCESS when loadAssetMakesDropdown called successfully', () => {
    mock.onGet().reply(200, mockAssetMakes);
    return store.dispatch(loadAssetMakesDropdown()).then(() => {
      expect(store.getActions()[0].type).toEqual(DROPDOWN_ASSET_MAKES_SUCCESS);
    });
  });

  it('should dispatch LOAD_ASSET_MAKES_FAILURE when AssetMakes are not loaded', () => {
    mock.onGet().reply(401);
    return store.dispatch(loadAssetMakes()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ASSET_MAKES);
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_MAKES_FAILURE);
    });
  });

  it('should dispatch ADD_ASSET_MAKE_SUCCESS when addAssetMakes is called successfully', () => {
    store = mockStore({ assetMakes: [] });
    const newMake = {
      make_label: 'Test asset make',
      asset_type: 'Test asset type'
    };

    const expectedAction = [{
      type: 'ADD_ASSET_MAKE_SUCCESS',
      payload: { id: 5, make_label: 'Test asset make', asset_type: 'Test asset type' }
    }];

    mock
      .onPost(url, newMake)
      .reply(201,
        {
          id: 5,
          make_label: 'Test asset make',
          asset_type: 'Test asset type'
        }
      );
    return store.dispatch(addAssetMakes(newMake)).then(() => {
      expect(store.getActions()[0]).toEqual(expectedAction[0]);
    });
  });

  it('should dispatch ADD_ASSET_MAKE_FAILURE when addAssetMakes is called with make_label field empty', () => {
    store = mockStore({ assetMakes: [] });
    const newMake = {
      make_label: '',
      asset_type: 'Test asset type'
    };

    mock
      .onPost(url, newMake)
      .reply(401,
        {}
      );
    return store.dispatch(addAssetMakes(newMake)).then(() => {
      expect(store.getActions()[0].type).toEqual('ADD_ASSET_MAKE_FAILURE');
    });
  });
});
