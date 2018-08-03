import expect from 'expect';
import allocationReducer from '../../_reducers/allocations.reducer';
import allocations from '../../_mock/allocations';
import constants from '../../_constants';

const {
  LOAD_ALLOCATIONS_SUCCESS,
  LOAD_ALLOCATIONS_FAILURE,
  LOADING_ALLOCATIONS
} = constants;

const initialState = {
  allAllocations: [],
  isLoading: false
};

const action = { payload: {} };

describe.only('Allocations Reducer test', () => {
  it('should return initial state when there is no action', () => {
    expect(allocationReducer(initialState, action)).toEqual(initialState);
  });

  it('should handle LOAD_ALLOCATIONS_SUCCESS', () => {
    action.type = LOAD_ALLOCATIONS_SUCCESS;
    action.payload.results = allocations;
    expect(allocationReducer(initialState, action).allAllocations).toEqual(action.payload.results);
    expect(allocationReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOAD_ALLOCATIONS_FAILURE', () => {
    action.type = LOAD_ALLOCATIONS_FAILURE;
    expect(allocationReducer(initialState, action).allAllocations).toEqual([]);
    expect(allocationReducer(initialState, action).isLoading).toEqual(false);
  });

  it('should handle LOADING_ALLOCATIONS', () => {
    action.type = LOADING_ALLOCATIONS;
    expect(allocationReducer(initialState, action).allAllocations).toEqual([]);
    expect(allocationReducer(initialState, action).isLoading).toEqual(true);
  });
});
