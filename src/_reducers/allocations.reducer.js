import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_ALLOCATIONS_SUCCESS,
  LOAD_ALLOCATIONS_FAILURE,
  LOADING_ALLOCATIONS,
  NEW_ALLOCATION_SUCCESS,
  NEW_ALLOCATION_FAILURE
} = constants;

export default (state = initialState.allocations, action) => {
  switch (action.type) {
    case LOAD_ALLOCATIONS_SUCCESS:
      return {
        ...state,
        allAllocations: [...action.payload.results],
        allocationsCount: action.payload.count,
        isLoading: false
      };
    case LOAD_ALLOCATIONS_FAILURE:
      return {
        ...state,
        allAllocations: [],
        isLoading: false
      };
    case LOADING_ALLOCATIONS:
      return {
        ...state,
        isLoading: true
      };
    case NEW_ALLOCATION_SUCCESS:
      return {
        ...state,
        newAllocation: [...state.newAllocation, action.payload.data]
      };
    case NEW_ALLOCATION_FAILURE:
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload,
        newAllocation: []
      };
    default:
      return state;
  }
};
