import constants from '../_constants';

const {
  LOAD_ALLOCATIONS_SUCCESS,
  LOAD_ALLOCATIONS_FAILURE,
  LOADING_ALLOCATIONS
} = constants;

const initialState = {
  allAllocations: [],
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALLOCATIONS_SUCCESS:
      return {
        ...state,
        allAllocations: [...action.payload.data],
        isLoading: false,
      };
    case LOAD_ALLOCATIONS_FAILURE:
      return {
        ...state,
        allAllocations: [],
        isLoading: false,
      };
    case LOADING_ALLOCATIONS:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
