import constants from '../_constants';

const {
  ADD_PAGINATION_HISTORY,
  RESET_PAGINATION_HISTORY
} = constants;

export const addPaginationHistory = history => ({
  type: ADD_PAGINATION_HISTORY,
  payload: history
});

export const resetPaginationHistory = () => ({
  type: RESET_PAGINATION_HISTORY,
  payload: {}
});
