import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_ALLOCATIONS_SUCCESS,
  LOAD_ALLOCATIONS_FAILURE,
  LOADING_ALLOCATIONS,
  RESET_ALLOCATIONS,
  SET_ACTIVE_PAGE
} = constants;

export default (state = initialState.allocations, action) => {
  switch (action.type) {
    case LOAD_ALLOCATIONS_SUCCESS:
      return {
        ...state,
        allAllocations: { ...state.allAllocations,
          [`page_${state.activePage}`]: action.payload.results },
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
        isLoading: action.isLoading
      };
    case RESET_ALLOCATIONS:
      return {
        allocations: initialState.allocations
      };
    case SET_ACTIVE_PAGE:
      return {
        ...state,
        activePage: action.payload
      };
    default:
      return state;
  }
};
