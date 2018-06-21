import constants from '../_constants';

const { LOAD_ALLOCATIONS_SUCCESS, LOAD_ALLOCATIONS_FAILURE } = constants;

const initialState = {
  allAllocations: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALLOCATIONS_SUCCESS:
      return {
        ...state,
        allAllocations: [...action.payload.data],
      }
    case LOAD_ALLOCATIONS_FAILURE:
      return {
        ...state,
        allAllocations: [],
      }
    default:
      return state;
  }
}
