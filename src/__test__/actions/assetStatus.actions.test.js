import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAssetStatus } from '../../_actions/assetStatus.action';
import { availableAssets } from '../../_mock/assetStatus';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Status action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch ASSET_STATUS_LOADING when getAssetStatus is called', () => {
    mock.onGet().reply(200);
    return store.dispatch(getAssetStatus()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: 'ASSET_STATUS_LOADING',
        statusType: 'available',
        loading: true
      });
    });
  });

  it('should dispatch ASSET_STATUS_FETCH_SUCCESS when getAssetStatus is called successfully', () => {
    mock.onGet().reply(200, availableAssets);
    return store.dispatch(getAssetStatus()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: availableAssets,
        type: 'ASSET_STATUS_FETCH_SUCCESS',
        statusType: 'available'
      });
    });
  });

  it('should dispatch ASSET_STATUS_FETCH_FAILURE when getAssetStatus is called unsuccessfully', () => {
    mock.onGet().reply(400, availableAssets);
    return store.dispatch(getAssetStatus()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: 'ASSET_STATUS_FETCH_FAILURE',
        statusType: 'available'
      });
    });
  });
});
