import constants from '../_constants';
import initialState from './initialState';

const {
  LOAD_PAGINATION_HISTORY,
  ADD_PAGINATION_HISTORY,
  RESET_PAGINATION_HISTORY
} = constants;

export default (state = initialState.paginationHistory, action) => {
  switch (action.type) {
    case LOAD_PAGINATION_HISTORY:
      return {
        ...state
      };
    case ADD_PAGINATION_HISTORY:
      return {
        ...state,
        [`page-${Object.keys(state).length + 1}`]: action.payload
      };
    case RESET_PAGINATION_HISTORY:
      return action.payload;
    default:
      return state;
  }
};
