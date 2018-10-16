// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';

// actions
import { loadAssetSpecs, createAssetSpec } from '../../_actions/assetSpecs.actions';

// mock data
import assetSpecs from '../../_mock/assetSpecs';

const {
  LOAD_ASSET_SPECS_START,
  LOAD_ASSET_SPECS_FAILURE,
  LOAD_ASSET_SPECS_SUCCESS,
  CREATE_ASSET_SPECS_REQUEST,
  CREATE_ASSET_SPECS_SUCCESS,
  CREATE_ASSET_SPECS_FAILURE
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
let mock;

describe('Asset Specs Actions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({});
  });

  const createUrl = 'asset-specs';

  const assetSpecToCreate = {
    year_of_manufacture: 2013,
    processor_speed: 1.8,
    screen_size: 13,
    processor_type: 'Intel core i3',
    storage: 128,
    memory: 4
  };

  it('should dispatch loadAssetSpecs actions', () => {
    mock.onGet().reply(200,
      {
        results: assetSpecs
      }
    );

    const expectedActions = [
      { type: LOAD_ASSET_SPECS_START },
      { type: LOAD_ASSET_SPECS_SUCCESS, assetSpecs: { results: assetSpecs } }
    ];

    return store.dispatch(loadAssetSpecs())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should dispatch LOAD_ASSET_CATEGORIES_FAILURE when an error occurs', () => {
    mock.onGet().reply(500);

    const expectedActions = [
      { type: LOAD_ASSET_SPECS_START },
      { type: LOAD_ASSET_SPECS_FAILURE }
    ];

    return store.dispatch(loadAssetSpecs())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should dispatch CREATE_ASSET_SPECS_REQUEST when createAssetSpec is called', () => {
    mock.onPost(createUrl, assetSpecToCreate).reply(200, assetSpecToCreate);
    return store.dispatch(createAssetSpec(assetSpecToCreate)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_ASSET_SPECS_REQUEST
      });
    });
  });

  it('should dispatch CREATE_ASSET_SPECS_SUCCESS when createAssetSpec is called successfully', () => {
    mock.onPost(createUrl, assetSpecToCreate).reply(201, assetSpecToCreate);
    return store.dispatch(createAssetSpec(assetSpecToCreate)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_ASSET_SPECS_SUCCESS,
        payload: assetSpecToCreate
      });
    });
  });

  it('should dispatch CREATE_ASSET_SPECS_FAILURE when createAssetSpec is called unsuccessfully', () => {
    mock.onPost(createUrl, assetSpecToCreate).reply(404, assetSpecToCreate);
    return store.dispatch(createAssetSpec(assetSpecToCreate)).then(() => {
      expect(store.getActions()).toContainEqual({
        type: CREATE_ASSET_SPECS_FAILURE,
        payload: new Error('Request failed with status code 404')
      });
    });
  });
});
