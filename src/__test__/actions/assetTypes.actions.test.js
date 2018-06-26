// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';

// actions
import { loadAssetTypeAction } from '../../_actions/assetType.action';

const { LOAD_ASSET_TYPE_SUCCESS, LOAD_ASSET_TYPE_FAILURE } = constants;

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Types action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});
  it('should dispatch LOAD_ASSET_TYPES_SUCCESS when loadAssetTypeAction is called successfully', () => {
    mock.onGet('asset-types').reply(200,
      [
        {
          id: 1,
          asset_type: 'Headsets',
          asset_sub_category: 1,
        }
      ]
    );
    return store.dispatch(loadAssetTypeAction()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOAD_ASSET_TYPE_SUCCESS);
    });
  });

  it('should dispatch LOAD_ASSET_TYPES_FAILURE when loadAssetTypeAction is called successfully', () => {
    mock.onGet('asset-types').reply(401);
    return store.dispatch(loadAssetTypeAction()).then(() => {
      expect(store.getActions()[1].type).toEqual(LOAD_ASSET_TYPE_FAILURE);
    });
  });
});
