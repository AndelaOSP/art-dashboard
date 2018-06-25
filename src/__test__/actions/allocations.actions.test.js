import expect from 'expect';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

// constants
import constants from '../../_constants';
const { LOAD_ALLOCATIONS_SUCCESS,
  LOAD_ALLOCATIONS_FAILURE,
  LOADING_ALLOCATIONS
} = constants;

// actions
import { loadAllocationsAction } from '../../_actions/allocations.actions';

// mock data
import allocations from '../../_mock/allocations';

// mock store
const middleware = [thunk];
const mockStore = configureMockStore(middleware);
let store;

describe.only('Allocation action tests', () => {
  const mock = new MockAdapter(axios);
  store = mockStore({});

  let expectedActions = [
    {
      type: LOADING_ALLOCATIONS,
    },
    {
      type: LOAD_ALLOCATIONS_SUCCESS,
      payload: allocations,
    },
    {
      type: LOAD_ALLOCATIONS_FAILURE,
      payload: 'An error occured',
    }
  ]

  afterEach(() => {
    store.clearActions();
  })

  it('should dispatch LOADING_ALLOCATIONS and LOAD_ALLOCATIONS_SUCCESS when allocations are loaded successfully', () => {
    mock.onGet('allocations/').reply(200, allocations);
    return store.dispatch(loadAllocationsAction()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ALLOCATIONS);
      expect(store.getActions()[1].type).toEqual(LOAD_ALLOCATIONS_SUCCESS);
    });
  });

  it('should dispatch LOADING_ALLOCATIONS and LOAD_ALLOCATIONS_FAILURE when allocations are not loaded', () => {
    mock.onGet('allocations/').reply(401);
    return store.dispatch(loadAllocationsAction()).then(() => {
      expect(store.getActions()[0].type).toEqual(LOADING_ALLOCATIONS);
      expect(store.getActions()[1].type).toEqual(LOAD_ALLOCATIONS_FAILURE);
    });
  });
});