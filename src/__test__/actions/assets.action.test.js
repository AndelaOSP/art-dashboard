// third-party libraries
import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { getAssetsAction } from '../../_actions/assets.action';
import assets from '../../_mock/assets';

// store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Types action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_ASSETS_STARTS when getAssetsActions starts being executed', () => {
    mock.onGet().reply(200, assets);
    return store.dispatch(getAssetsAction()).then(() => {
      expect(store.getActions()).toContainEqual({
        isLoading: true,
        type: 'LOAD_ASSETS_STARTS'
      });
    });
  });

  it('should dispatch LOAD_ASSETS_SUCCESS when getAssetsActions is called successfully', () => {
    mock.onGet().reply(200, assets);
    return store.dispatch(getAssetsAction()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: assets,
        type: 'LOAD_ASSETS_SUCCESS'
      });
    });
  });

  it('should dispatch LOAD_ASSETS_FAILURE when getAssetsAction returns an error', () => {
    mock.onGet().reply(400,
      { message: 'error not found' }
    );
    return store.dispatch(getAssetsAction()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: 'LOAD_ASSETS_FAILURE'
      });
    });
  });
});
