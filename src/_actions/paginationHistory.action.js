import constants from '../_constants';

const {
  LOAD_PAGINATION_HISTORY,
  ADD_PAGINATION_HISTORY,
  RESET_PAGINATION_HISTORY
} = constants;


export const loadPaginationHistory = history => ({
  type: LOAD_PAGINATION_HISTORY,
  payload: history
});

export const addPaginationHistory = history => ({
  type: ADD_PAGINATION_HISTORY,
  payload: history
});

export const resetPaginationHistory = () => ({
  type: RESET_PAGINATION_HISTORY,
  payload: {}
});
