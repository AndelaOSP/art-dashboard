import constants from '../_constants';

const { FILTER_SELECTED } = constants;

/**
  * filter selections
  *
  * @param {object} selection
  * @param {string} filterType
  * @return {object} type and payload
  */
const filterSelection = (selection, filterType) => ({
  type: FILTER_SELECTED,
  selection,
  filterType
});

export default filterSelection;
