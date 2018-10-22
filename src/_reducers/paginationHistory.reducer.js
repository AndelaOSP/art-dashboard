import constants from '../_constants';
import initialState from './initialState';

const {
  ADD_PAGINATION_HISTORY,
  RESET_PAGINATION_HISTORY
} = constants;

export default (state = initialState.paginationHistory, action) => {
  switch (action.type) {
    case ADD_PAGINATION_HISTORY:
      return {
        ...state,
        [action.payload.activePage]: action.payload.currentPage
      };
    case RESET_PAGINATION_HISTORY:
      return action.payload;
    default:
      return state;
  }
};
