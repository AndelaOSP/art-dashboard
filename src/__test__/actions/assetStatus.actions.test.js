import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  getAllocatedAssets,
  getAvailableAssets,
  getDamagedAssets,
  getLostAssets
} from '../../_actions/assetStatus.action';
import {
  allocatedAssets,
  availableAssets,
  damagedAssets,
  lostAssets
} from '../../_mock/assetStatus';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Asset Status action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOAD_ALLOCATED_ASSETS_REQUEST when getAllocatedAssets is called', () => {
    mock.onGet().reply(200);
    return store.dispatch(getAllocatedAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: 'LOAD_ALLOCATED_ASSETS_REQUEST'
      });
    });
  });

  it('should dispatch LOAD_ALLOCATED_ASSETS_SUCCESS when getAllocatedAssets is called successfully', () => {
    mock.onGet().reply(200, allocatedAssets);
    return store.dispatch(getAllocatedAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: allocatedAssets,
        type: 'LOAD_ALLOCATED_ASSETS_SUCCESS'
      });
    });
  });

  it('should dispatch LOAD_ALLOCATED_ASSETS_FAILURE when getAllocatedAssets is called unsuccessfully', () => {
    mock.onGet().reply(400, allocatedAssets);
    return store.dispatch(getAllocatedAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: 'LOAD_ALLOCATED_ASSETS_FAILURE'
      });
    });
  });

  it('should dispatch LOAD_AVAILABLE_ASSETS_REQUEST when getAvailableAssets is called', () => {
    mock.onGet().reply(200);
    return store.dispatch(getAvailableAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: 'LOAD_AVAILABLE_ASSETS_REQUEST'
      });
    });
  });

  it('should dispatch LOAD_AVAILABLE_ASSETS_SUCCESS when getAvailableAssets is called successfully', () => {
    mock.onGet().reply(200, availableAssets);
    return store.dispatch(getAvailableAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: availableAssets,
        type: 'LOAD_AVAILABLE_ASSETS_SUCCESS'
      });
    });
  });

  it('should dispatch LOAD_AVAILABLE_ASSETS_FAILURE when getAvailableAssets is called unsuccessfully', () => {
    mock.onGet().reply(400, availableAssets);
    return store.dispatch(getAvailableAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: 'LOAD_AVAILABLE_ASSETS_FAILURE'
      });
    });
  });

  it('should dispatch LOAD_DAMAGED_ASSETS_REQUEST when getDamagedAssets is called', () => {
    mock.onGet().reply(200);
    return store.dispatch(getDamagedAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: 'LOAD_DAMAGED_ASSETS_REQUEST'
      });
    });
  });

  it('should dispatch LOAD_DAMAGED_ASSETS_SUCCESS when getDamagedAssets is called successfully', () => {
    mock.onGet().reply(200, damagedAssets);
    return store.dispatch(getDamagedAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: damagedAssets,
        type: 'LOAD_DAMAGED_ASSETS_SUCCESS'
      });
    });
  });

  it('should dispatch LOAD_DAMAGED_ASSETS_FAILURE when getDamagedAssets is called unsuccessfully', () => {
    mock.onGet().reply(400, damagedAssets);
    return store.dispatch(getDamagedAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: 'LOAD_DAMAGED_ASSETS_FAILURE'
      });
    });
  });

  it('should dispatch LOAD_LOST_ASSETS_REQUEST when getLostAssets is called', () => {
    mock.onGet().reply(200);
    return store.dispatch(getLostAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        type: 'LOAD_LOST_ASSETS_REQUEST'
      });
    });
  });

  it('should dispatch LOAD_LOST_ASSETS_SUCCESS when getLostAssets is called successfully', () => {
    mock.onGet().reply(200, lostAssets);
    return store.dispatch(getLostAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: lostAssets,
        type: 'LOAD_LOST_ASSETS_SUCCESS'
      });
    });
  });

  it('should dispatch LOAD_LOST_ASSETS_FAILURE when getLostAssets is called unsuccessfully', () => {
    mock.onGet().reply(400, lostAssets);
    return store.dispatch(getLostAssets()).then(() => {
      expect(store.getActions()).toContainEqual({
        payload: 'Request failed with status code 400',
        type: 'LOAD_LOST_ASSETS_FAILURE'
      });
    });
  });
});
