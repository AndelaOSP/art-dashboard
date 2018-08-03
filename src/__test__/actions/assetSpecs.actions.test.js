// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';

// actions
import { loadAssetSpecs } from '../../_actions/assetSpecs.actions';

// mock data
import assetSpecs from '../../_mock/assetSpecs';

const {
  LOAD_ASSET_SPECS_START,
  LOAD_ASSET_SPECS_FAILURE,
  LOAD_ASSET_SPECS_SUCCESS
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
});
