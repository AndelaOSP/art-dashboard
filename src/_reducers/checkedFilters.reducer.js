import constants from '../_constants';
import initialState from './initialState';

const { ADD_CHECKED_FILTER } = constants;

const addCheckedFilterReducer = (state = initialState.checkedFilters, action) => {
  switch (action.type) {
    case ADD_CHECKED_FILTER:
      return action.checkedFilter;

    default:
      return state;
  }
};

export default addCheckedFilterReducer;
