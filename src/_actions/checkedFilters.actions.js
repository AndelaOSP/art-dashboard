import constants from '../_constants';

// constants
const { ADD_CHECKED_FILTER } = constants;

/**
  * Add a checked filter
  *
  * @param {string} checkedFilter
  * @return {object} type and payload
  */

const addCheckedFilter = checkedFilter =>
  (dispatch) => {
    dispatch(addCheckedFilterSuccess(checkedFilter));
  };

const addCheckedFilterSuccess = checkedFilter => (
  { type: ADD_CHECKED_FILTER, checkedFilter }
);

export default addCheckedFilter;
