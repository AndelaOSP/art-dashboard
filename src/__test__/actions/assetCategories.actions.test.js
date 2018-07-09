// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';

// actions
import { loadAssetCategories } from '../../_actions/assetCategories.actions';

// mock data
import assetCategories from '../../_mock/assetCategories';

const {
  LOAD_ASSET_CATEGORIES_START,
  LOAD_ASSET_CATEGORIES_SUCCESS,
  LOAD_ASSET_CATEGORIES_FAILURE
} = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;
let mock;

describe('Asset Categories Actions', () => {
  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore({});
  });

  it('should dispatch loadAssetCategories actions', () => {
    mock.onGet().reply(200,
      {
        results: assetCategories
      }
    );

    const expectedActions = [
      { type: LOAD_ASSET_CATEGORIES_START },
      { type: LOAD_ASSET_CATEGORIES_SUCCESS, assetCategories: { results: assetCategories } }
    ];

    return store.dispatch(loadAssetCategories())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });

  it('should dispatch LOAD_ASSET_CATEGORIES_FAILURE when an error occurs', () => {
    mock.onGet().reply(500);

    const expectedActions = [
      { type: LOAD_ASSET_CATEGORIES_START },
      { type: LOAD_ASSET_CATEGORIES_FAILURE }
    ];

    return store.dispatch(loadAssetCategories())
      .then(() => expect(store.getActions()).toEqual(expectedActions));
  });
});
