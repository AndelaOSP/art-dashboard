import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import constants from '../../_constants';
import allocations from '../../_mock/allocations';
import newAllocation from '../../_mock/newAllocation';
import { loadAllocationsAction, allocateAsset } from '../../_actions/allocations.actions';

const {
  LOAD_ALLOCATIONS_SUCCESS,
  LOAD_ALLOCATIONS_FAILURE,
  LOADING_ALLOCATIONS,
  NEW_ALLOCATION_SUCCESS,
  NEW_ALLOCATION_FAILURE
} = constants;

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe('Allocation action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});

  afterEach(() => {
    store.clearActions();
  });

  it('should dispatch LOADING_ALLOCATIONS and LOAD_ALLOCATIONS_SUCCESS when allocations are loaded successfully', () => {
    mock.onGet().reply(200, allocations);
    return store.dispatch(loadAllocationsAction()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ALLOCATIONS);
      expect(store.getActions()[1].type).toEqual(LOAD_ALLOCATIONS_SUCCESS);
    });
  });

  it('should dispatch LOADING_ALLOCATIONS and LOAD_ALLOCATIONS_FAILURE when allocations are not loaded', () => {
    mock.onGet().reply(401);
    return store.dispatch(loadAllocationsAction()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ALLOCATIONS);
      expect(store.getActions()[1].type).toEqual(LOAD_ALLOCATIONS_FAILURE);
    });
  });

  it('should dispatch NEW_ALLOCATION_SUCCESS when allocateAsset is successfully called', () => {
    mock.onPost().reply(201, newAllocation);
    return store.dispatch(allocateAsset()).then(() => {
      expect(store.getActions()[0].type).toEqual(NEW_ALLOCATION_SUCCESS);
    });
  });

  it('should dispatch NEW_ALLOCATION_FAILURE when allocateAsset gets an error', () => {
    mock.onPost().reply(401);
    return store.dispatch(allocateAsset()).then(() => {
      expect(store.getActions()[0].type).toEqual(NEW_ALLOCATION_FAILURE);
    });
  });
});
